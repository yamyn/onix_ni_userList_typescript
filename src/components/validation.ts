import * as Joi from '@hapi/joi';
import { Types } from 'mongoose';

/**
 * @exports
 * @class Validation
 */
abstract class Validation {
    Joi: any;

    /**
     * @static
     * @type {string}
     * @memberof JoiSchema
     */
    readonly messageObjectId: string =
        'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters';
    /**
     * Creates an instance of Schema.
     * @constructor
     * @memberof JoiSchema
     */
    constructor() {
        this.Joi = Joi.extend({
            type: 'objectId',
            messages: {
                'objectId.base': this.messageObjectId,
            },
            validate(
                value: string,
                helpers: Joi.CustomHelpers,
                // options: Joi.ValidationOptions,
            ): object | string {
                if (!Types.ObjectId.isValid(value)) {
                    return {
                        value,
                        errors: helpers.error('objectId.base'),
                    };
                }

                return {
                    value,
                }; // Keep the value as it was
            },
        });
    }
}

export default Validation;
