import { Document, Schema } from 'mongoose';
import * as connections from '../../config/connection';

export interface IAdminModel extends Document {
    nickName: string;
    email: string;
}

const AdminSchema: Schema = new Schema(
    {
        nickName: {
            type: String,
            trim: true,
            index: true,
            unique: true,
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
        collection: 'admins',
        versionKey: false,
    },
);

export default connections.db.model<IAdminModel>('Admin', AdminSchema);
