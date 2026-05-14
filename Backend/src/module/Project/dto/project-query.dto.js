import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class ProjectQueryDto extends BaseDto {
  static schema = Joi.object({
    q: Joi.string().trim().optional(),
    techStack: Joi.string().optional(),
    sort: Joi.string().valid("latest", "trending").default("latest"),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
  });
}

export default ProjectQueryDto;
