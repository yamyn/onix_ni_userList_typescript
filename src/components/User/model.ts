import { Document, Schema } from 'mongoose';
import * as connections from '../../config/connection';

export interface IUserModel extends Document {
    fullname: string;
    email: string;
}

const UserSchema: Schema = new Schema(
    {
        fullName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
    },

    {
        timestamps: true,
        collection: 'usermodel',
        versionKey: false,
    },
);

export default connections.db.model<IUserModel>('UserModel', UserSchema);
