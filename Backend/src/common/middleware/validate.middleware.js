import ApiError from "../utils/api-error.js";

const validate = (DtoClass) => {
  return (req, res, next) => {
    const { errors, value } = DtoClass.validate(req.body);
    if (errors) {
      return next(ApiError.badRequest("Validation failed", errors));
    }
    req.body = value;
    next();
  };
};

export default validate;