import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class UpdateProjectDto extends BaseDto {
  static schema = Joi.object({
    title: Joi.string().trim().min(3).max(100),
    description: Joi.string().trim().min(10).max(2000),
    techStack: Joi.array().items(Joi.string().trim()).max(20),
    githubLink: Joi.string().uri().allow(""),
    liveLink: Joi.string().uri().allow(""),
    isFeatured: Joi.boolean(),
  });
}

export default UpdateProjectDto;
