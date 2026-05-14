import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class UpdateProfileDto extends BaseDto {
  static schema = Joi.object({
    fullName: Joi.string().trim().min(2).max(50),
    bio: Joi.string().trim().max(500).allow(""),
    location: Joi.string().trim().max(100).allow(""),
  });
}

export default UpdateProfileDto;
