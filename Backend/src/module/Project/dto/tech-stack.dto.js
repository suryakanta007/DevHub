import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class TechStackDto extends BaseDto {
  static schema = Joi.object({
    techStack: Joi.array().items(Joi.string().trim()).required(),
  });
}

export default TechStackDto;
