import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class UpdateSocialDto extends BaseDto {
  static schema = Joi.object({
    socialLinks: Joi.object({
      github: Joi.string().uri().allow("").optional(),
      linkedin: Joi.string().uri().allow("").optional(),
      twitter: Joi.string().uri().allow("").optional(),
      portfolio: Joi.string().uri().allow("").optional(),
    }),
  });
}

export default UpdateSocialDto;
