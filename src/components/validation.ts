import * as Joi from '@hapi/joi';
// tslint:disable-next-line: no-var-requires
// const Joi: any = require('@hapi/joi');

import { Types } from 'mongoose';

/**
 * @exports
 * @class Validation
 */
abstract class Validation {
    // can`t assign to customJoi any type of Joi Schemas - because of custom field objectId. Need to discuss this
    customJoi: any;
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
        this.customJoi = Joi.extend({
            type: 'objectId',
            messages: {
                'objectId.base': this.messageObjectId,
            },
            validate(value: string, helpers: Joi.CustomHelpers<any>): object {
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
