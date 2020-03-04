import Validation from '../validation';

/**
 * @exports
 * @class
 * @extends Validation
 */
class UserValidation extends Validation {
    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
    findById(data) {
        return this.customJoi
            .object({
                id: this.customJoi.objectId(),
            })
            .validate(data);
    }

    /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @returns
     * @memberof UserValidation
     */
    create(profile) {
        return this.customJoi
            .object({
                email: this.customJoi.string().email(),
                fullName: this.customJoi
                    .string()
                    .min(3)
                    .max(30)
                    .required(),
            })
            .validate(profile, {
                allowUnknown: true,
            });
    }

    /**
     * @param {String} data.id - objectId
     * @param {String} data.fullName
     * @returns
     * @memberof UserValidation
     */
    updateById(data) {
        return this.customJoi
            .object({
                id: this.customJoi.objectId(),
                fullName: this.customJoi
                    .string()
                    .min(3)
                    .max(30)
                    .required(),
            })
            .validate(data, { allowUnknown: true });
    }

    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
    deleteById(data) {
        return this.Joi.object({
            id: this.Joi.objectId(),
        }).validate(data, { allowUnknown: true });
    }
}

export default new UserValidation();
