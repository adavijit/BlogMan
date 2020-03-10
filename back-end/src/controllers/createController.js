/**
 * This will export a helper function which will abstract
 * some functionalities of the controller.
 */

const { validationResult } = require('express-validator');
const createError = require('http-errors');

/**
 * Convert errors array to object.
 * @param {Array} errors
 */
const convertErrorToObject = (errors) => {
  const fieldErrors = {};
  for (const error of errors) {
    if (error.param && !fieldErrors[error.param])
      fieldErrors[error.param] = error.msg;
  }
  return fieldErrors;
};

/**
 * Extract inputs from the request object.
 *
 * It will return all the fields if `fields` parameter is not specified
 * or is empty.
 *
 * And if `fields` parameter is specified it will return the fields mentioned
 * in it.
 *
 * @param {Object} req The request object from express
 * @param {Array} fields The fields which needs to be extracted
 */
const getInputs = (req, fields) => {
  const inputsObj = {};
  if (fields && fields.length > 0) {
    for (const field of fields) {
      if (Array.isArray(field)) {
        if (field.length < 2)
          throw new Error(`Invalid option in 'inputs' ` + field.join(' '));
        inputsObj[field[1]] = req.body[field[0]];
      } else {
        inputsObj[field] = req.body[field];
      }
    }
  } else
    for (const key of Object.keys(req.body)) inputsObj[key] = req.body[key];
  return inputsObj;
};

/**
 * It returns the validation errors.
 *
 * @param {Object} req The request object from express
 * @param {Boolean} asObject If it's value is true an Object type error
 * is returned otherwise an array type error is returned
 */
const getValidationError = (req, asObject) => {
  const errors = validationResult(req).array();
  if (asObject) {
    return convertErrorToObject(errors);
  }
  return errors;
};

/**
 * Create a middleware for validation check with the options specified
 * @param {Object} options Options to be specified
 * @param {String} options.errorMsg The error message that should be returned.
 * @param {Boolean} options.throwError Specifies if the middleware should throw
 * error or not. If set to false it will store the errors in req.validationError.
 * @param {Boolean} options.asObject If the error returned should be an object
 */
const createValidationMiddleware = ({
  errorMsg,
  throwError,
  asObject,
  renderPage,
  renderData,
}) => {
  return async function(req, res, next) {
    try {
      const errors = getValidationError(req, asObject);
      if (
        (!asObject && errors.length > 0) ||
        (asObject && Object.keys(errors).length > 0)
      ) {
        if (throwError) {
          next(
            createError(400, { errors, code: 400, isCustom: true }, errorMsg),
          );
          return;
        } else res.locals.errors = errors;

        if (renderPage) {
          let dataObj = {};
          if (renderData) {
            if (typeof renderData == 'function') dataObj = await renderData();
            else if (typeof renderData == 'object') dataObj = renderData;
          }
          res.render(renderPage, dataObj);
          return;
        }
      }
    } catch (error) {
      next(error);
    }

    next();
  };
};

/**
 * This will create a series of middleware functions to execute common tasks
 * based on the options provided.
 *
 * @param {*} cb A middleware which is to be executed
 * @param {Object} options Options
 * @param {Object} options.validation Validation Object
 * @param {Array} options.validation.validators Validators array
 * @param {String} options.validation.errorMsg Error message if validation failed
 * @param {Boolean} options.validation.throwError If true throws error if validation fails
 * @param {Boolean} options.validation.asObject Create error as object
 * @param {Boolean|Array} options.inputs If true returns inputs in `res.locals.inputBody`. One can also provide an array with required fields
 */
const createController = (
  controller,
  options = {
    validation: {
      validators: [],
      errorMsg: 'Validation error.',
      throwError: false,
      asObject: false,
    },
    inputs: false,
  },
) => {
  const middlewareArray = [];

  const customController = async function(req, res, next) {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  if (options.inputs) {
    let fields = [];
    if (Array.isArray(options.inputs)) fields = options.inputs;

    middlewareArray.push((req, res, next) => {
      const inputs = getInputs(req, fields);
      if (res.locals.inputBody) {
        res.locals.inputBody = { ...res.locals.inputBody, ...inputs };
      } else {
        res.locals.inputBody = inputs;
      }
      next();
    });
  }

  if (options.validation) {
    middlewareArray.push(options.validation.validators);
    middlewareArray.push(
      createValidationMiddleware({
        throwError: options.validation.throwError,
        errorMsg: options.validation.errorMsg || 'Validation error.',
        asObject: options.validation.asObject,
        renderData: options.validation.renderData,
        renderPage: options.validation.renderPage,
      }),
    );
  }

  middlewareArray.push(customController);
  return middlewareArray;
};

module.exports = createController;
