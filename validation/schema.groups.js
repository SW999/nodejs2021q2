import Joi from 'joi';
import { GROUP_PERMISSIONS } from '../constants';

export const groupSchema = Joi.object(
  {
    name: Joi.string().required(),
    permissions: [
      Joi
        .array()
        .items(Joi.string().valid(...Object.values(GROUP_PERMISSIONS)))
        .required(),
      Joi
        .string()
        .valid(...Object.values(GROUP_PERMISSIONS))
        .required()
    ]
  }
);

export const groupSchemaEdit = groupSchema.append({
  id: Joi.string().required()
});
