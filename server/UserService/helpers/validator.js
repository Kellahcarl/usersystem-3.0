const Joi = require("joi");

module.exports = {
  validateLoginUser: (user) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
        )
      ),
    });

    return schema.validate(user);
  },
  validateUserId: (user) => {
    const schema = Joi.object().keys({
      userId: Joi.string().min(8).required(),
      password: Joi.string().min(8).required(),
    });

    return schema.validate(user);
  },
  validateRegisterUser: (user) => {
    const schema = Joi.object().keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      // phone: Joi.number().required().min(10).max(12),
      password: Joi.string().pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
        )
      ),
      isAdmin: Joi.bool().required(),
    });

    return schema.validate(user);
  },
  validateEmail: (user) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().min(8).required(),
    });
    return schema.validate(user);
  },
  validateUpdate: (user) => {
    const schema = Joi.object().keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      id: Joi.string().min(8).required(),
    });
    return schema.validate(user);
  },
};
