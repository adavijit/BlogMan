/**
 * This contains all the validator functions
 */
const validators = {
  email(value) {
    const regex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$');
    return regex.test(value);
  },
  length(value, { min, max, eq }) {
    value = value + '';
    if (
      ((min || min === 0) && value.length < min) ||
      ((max || max === 0) && value.length > max) ||
      ((eq || eq === 0) && value.length !== eq)
    ) {
      return false;
    }
    return true;
  },
  string(value) {
    return typeof value === 'string';
  },
  regex(value, { expression }) {
    return expression.test(value);
  },
  isInt(value, options) {
    if (isNaN(value)) return false;
    const int = parseInt(value);
    if (
      ((options.min || options.min === 0) && int < options.min) ||
      ((options.max || options.max === 0) && int > options.max)
    )
      return false;

    return true;
  }
};

/**
 * This contains all the validator name and functions
 */
const rulesArray = [
  {
    name: '_isString',
    validator: validators.string,
    message: (name, message) => {
      if (typeof message === 'string') return message;
      else return `${name} should be a string.`;
    }
  },
  {
    name: '_isLength',
    validator: validators.length,
    message: (name, { min, max, eq, message }) => {
      if (typeof message === 'string') return message;

      if (eq || eq === 0) return `${name} should be of ${eq} charecters.`;
      else if ((min || min === 0) && (max || max === 0))
        return `${name} should be between ${min} - ${max} charecters.`;
      else if (min || min === 0)
        return `${name} should be min of ${min} charecters.`;
      else return `${name} should be max of ${min} charecters.`;
    }
  },
  {
    name: '_isInt',
    validator: validators.isInt,
    message: (name, options) => {
      if (typeof options.message === 'string') return options.message;

      if (
        (options.min || options.min === 0) &&
        (options.max || options.max === 0)
      )
        return `${name} should be between ${options.min} - ${options.max}.`;
      else if (options.min || options.min === 0)
        return `${name} should be min ${options.min}.`;
      else if (options.max || options.max === 0)
        return `${name} should be max ${options.min}.`;

      return `${name} should be an integer.`;
    }
  },
  {
    name: '_isEmail',
    validator: validators.email,
    message: (name, message) => {
      if (typeof message === 'string') return message;
      return `${name} should be a valid email.`;
    }
  },
  {
    name: '_regex',
    validator: validators.regex,
    message: (name, { message, expression }) => {
      if (typeof message === 'string') return message;
      return `${name} should math the regex '${expression}'.`;
    }
  }
];

/**
 * Rule should be set for individual form elements
 */
export class Rule {
  constructor(label) {
    this._rules = {
      _isRequired: true,
      _label: label ? label : null
    };
  }

  optional() {
    this._rules._isRequired = false;
    return this;
  }

  isEmail(message) {
    this._rules._isEmail = true || message;
    return this;
  }

  isLength({ min, max, eq, message }) {
    if (!(min || min === 0 || max || max === 0 || eq || eq === 0)) {
      throw new Error('`min`, `max` or `eq`  option should be provided.');
    }
    if (
      ((min || min === 0) && !Number.isInteger(min)) ||
      ((max || max === 0) && !Number.isInteger(max)) ||
      ((eq || eq === 0) && !Number.isInteger(eq))
    ) {
      throw new Error('`min`, `max` or `eq` should be an integer.');
    }
    this._rules._isLength = {
      min: min,
      max: max,
      eq: eq,
      message: message
    };

    return this;
  }

  isString(message) {
    this._rules._isString = true || message;
    return this;
  }

  isInt(options = { min: null, max: null, message: null }) {
    this._rules._isInt = {};

    if (options) {
      for (const key of ['min', 'max']) {
        if (options[key] || options[key] === 0) {
          if (!Number.isInteger(options[key]))
            throw new Error(`\`${options.key}\` should be an integer.`);

          this._rules._isInt[key] = options[key];
        }
      }
    }

    if (options.message) {
      this._rules._isInt.message = options.message;
    }

    return this;
  }

  toString() {
    this._rules._toString = true;
    return this;
  }

  regex(regex, message) {
    if (typeof regex !== 'object' || !(regex instanceof RegExp)) {
      throw new Error(
        'Parameter should be instance of Javascript RegExp class.'
      );
    }
    this._rules._regex = {
      expression: regex,
      message: message
    };

    return this;
  }

  label(value) {
    this._rules._label = value;
    return this;
  }

  withMessage(value) {
    this.message = value;
    return this;
  }

  validate(key, value) {
    const displayName = this._rules._label ? this._rules._label : key;
    let error;
    if (this._rules._isRequired) {
      if (!value) {
        error = this.message ? this.message : `${displayName} cannot be empty.`;
      }
    }

    if (error) {
      return { value, error };
    }

    if (
      this._rules._isRequired ||
      (!this._rules._isRequired && (value || value === 0))
    )
      for (const rule of rulesArray) {
        if (this._rules[rule.name]) {
          if (
            rule.validator &&
            !rule.validator(value, this._rules[rule.name])
          ) {
            error = this.message
              ? this.message
              : rule.message(displayName, this._rules[rule.name]);
          } else if (rule.sanatizer) {
            value = rule.sanatizer(value);
          }
        }

        if (error) return { value, error };
      }

    return { value, error };
  }

  static create(label) {
    return new Rule(label);
  }
}

/**
 * Validator should contains all the form elements with their rules
 */
export class Validator {
  constructor(rules) {
    if (!rules) return;

    if (typeof rules !== 'object') {
      throw new Error('Invalid parameter.');
    }
    for (const key in rules) {
      if (!(rules[key] instanceof Rule))
        throw new Error('Invalid rule in ' + key + '.');
    }
    this.rules = rules;
  }

  validate(values) {
    if (typeof values !== 'object')
      throw new Error(`Values should be an object.`);

    const allErrors = {};
    for (const key in this.rules) {
      const { error, value } = this.rules[key].validate(key, values[key]);
      if (error) {
        allErrors[key] = error;
      }
      values[key] = value;
    }

    return { errors: allErrors, values };
  }
}

export default { Rule, Validator };