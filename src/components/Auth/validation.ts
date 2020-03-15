import Validation from '../validation';
import * as Joi from '@hapi/joi';
import { IAdminModel } from './model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class AdminValidation extends Validation {
    /**
     * Creates an instance of AdminValidation.
     * @memberof AdminValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {{ email: string }} body
     * @returns {Joi.ValidationResult}
     * @memberof AdminValidation
     */
    findOne(body: { email: string }): Joi.ValidationResult {
        return this.Joi.object({
            email: this.Joi.string().email(),
        }).validate(body);
    }

    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult}
     * @memberof AdminValidation
     */
    create(profile: IAdminModel): Joi.ValidationResult {
        return this.Joi.object({
            email: this.Joi.string().email(),
            nickName: this.Joi.string().required(),
            fullName: this.Joi.string()
                .min(3)
                .max(30),
            password: Joi.string().required(),
        }).validate(profile, {
            allowUnknown: true,
        });
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult}
     * @memberof AdminValidation
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
     * @memberof AdminValidation
     */
    deleteById(body: { id: string }): Joi.ValidationResult {
        return this.Joi.object({
            id: this.Joi.objectId(),
        }).validate(body, { allowUnknown: true });
    }
}

export default new AdminValidation();
