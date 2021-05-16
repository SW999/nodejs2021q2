import { HTTP_STATUS_CODE } from '../constants';

const errorResponse = (schemaErrors) => {
  const errors = schemaErrors.map((error) => {
    const { path, message } = error;
    return { path, message };
  });

  return {
    status: 'failed',
    errors
  };
};

export const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error?.isJoi) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(errorResponse(error.details));
    } else {
      // eslint-disable-next-line callback-return
      next();
    }
  };
};
