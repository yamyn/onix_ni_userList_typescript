import Validation from '../validation';
import * as Joi from '@hapi/joi';
import { IUserModel } from './model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {
    /**
     * Creates an instance of UserValidation.
     * @memberof UserValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult}
     * @memberof UserValidation
     */
    findOne(body: { id: string }): Joi.ValidationResult {
        return this.Joi.object({
            id: this.Joi.objectId(),
        }).validate(body);
    }

    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult}
     * @memberof UserValidation
     */
    create(profile: IUserModel): Joi.ValidationResult {
        return this.Joi.object({
            email: this.Joi.string().email(),
            fullName: this.Joi.string()
                .min(3)
                .max(30)
                .required(),
        }).validate(profile, {
            allowUnknown: true,
        });
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult}
     * @memberof UserValidation
     */
    updateById(body: { id: string }): Joi.ValidationResult {
        return this.Joi.object({
            id: this.Joi.objectId(),
            fullName: this.Joi.string()
                .min(3)
                .max(30)
                .required(),
        }).validate(body, { allowUnknown: true });
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult}
     * @memberof UserValidation
     */
    deleteById(body: { id: string }): Joi.ValidationResult {
        return this.Joi.object({
            id: this.Joi.objectId(),
        }).validate(body, { allowUnknown: true });
    }
}

export default new UserValidation();
