import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class CategoryDto extends BaseDto {
  static schema = Joi.object({
    category: Joi.string().trim().max(50).required(),
  });
}

export default CategoryDto;
