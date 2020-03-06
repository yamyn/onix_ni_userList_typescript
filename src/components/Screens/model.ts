import { Document, Schema } from 'mongoose';
import * as connections from '../../config/connection';

export interface IScreensModel extends Document {
    screenLink: string;
}

const ScreensSchema: Schema = new Schema(
    {
        screenLink: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'screens',
        versionKey: false,
    },
);

export default connections.db.model<IScreensModel>(
    'ScreensModel',
    ScreensSchema,
);
