import { Document, Schema } from 'mongoose';
import * as connections from '../../config/connection';
import { AggregationCursor } from 'mongodb';

export interface IUserModel extends Document {
    fullName: string;
    email: string;
}

export interface IStatModel extends AggregationCursor {
    _id: number;
    number: number;
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
        collection: 'usermodels',
        versionKey: false,
    },
);

export default connections.db.model<IUserModel>('UserModel', UserSchema);
