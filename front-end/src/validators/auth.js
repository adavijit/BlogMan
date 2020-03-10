import { Validator, Rule } from './index';

export const loginValidator = new Validator({
  username: Rule.create('Username').isString(),
  password: Rule.create('Password')
    .isString()
    .isLength({ min: 8 }),
});

export const registerValidator = new Validator({
  name: Rule.create('Name').isString(),
  email: Rule.create('Email')
    .isString()
    .isEmail(),
  birth: Rule.create('Birthday').isString(),
  username: Rule.create('Username').isString(),
  password: Rule.create('Password')
    .isString()
    .isLength({ min: 8 }),
});
