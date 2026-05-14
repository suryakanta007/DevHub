import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class CreateBlogDto extends BaseDto {
  static schema = Joi.object({
    title: Joi.string().trim().min(3).max(150).required(),
    content: Joi.string().min(50).required(),
    tags: Joi.array().items(Joi.string().trim()).max(10).default([]),
    category: Joi.string().trim().max(50).default("General"),
  });
}

export default CreateBlogDto;
