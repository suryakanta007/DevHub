import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class CreateCommentDto extends BaseDto {
  static schema = Joi.object({
    text: Joi.string().trim().min(1).max(1000).required(),
  });
}

export default CreateCommentDto;
