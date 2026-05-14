import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class RefreshTokenDto extends BaseDto {
  static schema = Joi.object({
    refreshToken: Joi.string().optional(),
  });
}

export default RefreshTokenDto;
