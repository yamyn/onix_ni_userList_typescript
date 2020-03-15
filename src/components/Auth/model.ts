import { Document, Schema } from 'mongoose';
import * as connections from '../../config/connection';
import { NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

export interface IAdminModel extends Document {
    nickName: string;
    email: string;
    password: string;
    fullName: string;
    refreshToken: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const AdminSchema: Schema = new Schema(
    {
        nickName: {
            type: String,
            trim: true,
            index: true,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            index: true,
            unique: true,
        },
        password: String,
        fullName: {
            type: String,
            trim: true,
        },
        refreshToken: String,
    },

    {
        timestamps: true,
        collection: 'admins',
        versionKey: false,
    },
).pre('save', async function(next: NextFunction): Promise<void> {
    const admin: any = this; // tslint:disable-line

    if (!admin.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bcrypt.genSalt(10);

        const hash: string = await bcrypt.hash(admin.password, salt);

        admin.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
AdminSchema.methods.comparePassword = async function(
    candidatePassword: string,
): Promise<boolean> {
    try {
        const match: boolean = await bcrypt.compare(
            candidatePassword,
            this.password,
        );

        return match;
    } catch (error) {
        return error;
    }
};

export default connections.db.model<IAdminModel>('Admin', AdminSchema);
