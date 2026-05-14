import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class UpdateSkillsDto extends BaseDto {
  static schema = Joi.object({
    skills: Joi.array().items(Joi.string().trim()).max(30).required(),
  });
}

export default UpdateSkillsDto;
