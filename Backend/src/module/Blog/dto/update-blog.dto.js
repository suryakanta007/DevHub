import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class UpdateBlogDto extends BaseDto {
  static schema = Joi.object({
    title: Joi.string().trim().min(3).max(150),
    content: Joi.string().min(50),
    tags: Joi.array().items(Joi.string().trim()).max(10),
    category: Joi.string().trim().max(50),
  });
}

export default UpdateBlogDto;
