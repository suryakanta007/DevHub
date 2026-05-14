import Joi from "joi";

class BaseDto {
  /**
   * Joi schema — to be overridden by subclass.
   * @type {Joi.ObjectSchema}
   */
  static schema = Joi.object();

  /**
   * Validates data against the DTO schema.
   * @param {object} data
   * @returns {{ value: object, errors: string[] | null }}
   */
  static validate(data) {
    const { error, value } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((d) => d.message);
      return { value: null, errors };
    }

    return { value, errors: null };
  }
}

export default BaseDto;