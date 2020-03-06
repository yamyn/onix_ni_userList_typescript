import { Document, Schema } from 'mongoose';
import * as connections from '../../config/connection';

export interface IEmailListModel extends Document {
    email: string[];
}

const EmailsListSchema: Schema = new Schema(
    {
        emails: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'emaillists',
        versionKey: false,
    },
);

export default connections.db.model<IEmailListModel>(
    'EmailListModel',
    EmailsListSchema,
);
