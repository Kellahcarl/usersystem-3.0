const Joi = require("joi");

module.exports = {
  validateTask: (task) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      project_id: Joi.string().required(),
      duration: Joi.string().required(),
      description: Joi.string().min(5).required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
    });

    return schema.validate(task);
  },
  validateProject: (project) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().min(5).required(),
      client_name: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
    });

    return schema.validate(project);
  },
  validateAssignProject: (body) => {
    const schema = Joi.object().keys({
      project_id: Joi.string().required(),
      user_id: Joi.string().required(),
    });
    return schema.validate(body);
  },
  validateAssignTask: (body) => {
    const schema = Joi.object().keys({
      task_id: Joi.string().required(),
      user_id: Joi.string().required(),
    });
    return schema.validate(body);
  },
};
