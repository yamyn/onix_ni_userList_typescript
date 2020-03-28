import Validation from '../validation';
import * as Joi from '@hapi/joi';
import { IAdminModel } from './model';

/**
 * @export
 * @class AdminValidation
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
     * @param {{ nickName: string }} body
     * @returns {Joi.ValidationResult}
     * @memberof AdminValidation
     */
    login(body: { email: string }): Joi.ValidationResult {
        return this.Joi.object({
            email: this.Joi.string().email(),
        }).validate(body);
    }

    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult}
     * @memberof AdminValidation
     */
    signup(profile: IAdminModel): Joi.ValidationResult {
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
}

export default new AdminValidation();
