import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class LoginDto extends BaseDto {
  static schema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().required(),
  });
}

export default LoginDto;
