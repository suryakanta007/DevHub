import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class SearchUserDto extends BaseDto {
  static schema = Joi.object({
    q: Joi.string().trim().min(1).required(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
  });
}

export default SearchUserDto;
