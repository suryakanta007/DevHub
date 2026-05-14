import BaseDto from "../../../common/dto/base.dto.js";
import Joi from "joi";

class FollowUserDto extends BaseDto {
  static schema = Joi.object({
    // No body needed — target userId comes from URL param
  });
}

export default FollowUserDto;
