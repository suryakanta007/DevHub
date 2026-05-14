import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class RegisterDto extends BaseDto {
  static schema = Joi.object({
    username: Joi.string().trim().lowercase().min(3).max(30).required(),
    fullName: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().min(6).max(100).required(),
  });
}

export default RegisterDto;
