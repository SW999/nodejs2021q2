import Joi from 'joi';

export const userSchema = Joi.object(
  {
    id: Joi.string(),
    login: Joi.string().min(3).max(30).required(),
    password: Joi
      .string()
      .trim()
      .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
      .required()
      .messages({
        'string.pattern.base': '"password" must contain letters and numbers',
        'any.required': '"password" is a required field'
      }),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
  }
);

export const userSchemaEdit = userSchema.append({
  id: Joi.string().required()
});
