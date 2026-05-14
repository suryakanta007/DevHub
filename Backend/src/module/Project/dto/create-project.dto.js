import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class CreateProjectDto extends BaseDto {
  static schema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),
    description: Joi.string().trim().min(10).max(2000).required(),
    techStack: Joi.array().items(Joi.string().trim()).max(20).default([]),
    githubLink: Joi.string().uri().allow("").optional(),
    liveLink: Joi.string().uri().allow("").optional(),
  });
}

export default CreateProjectDto;
