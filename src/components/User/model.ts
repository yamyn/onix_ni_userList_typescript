// import { Document, Schema } from 'mongoose';
// import * as connections from '../../config/connection';
// import { AggregationCursor } from 'mongodb';

// export interface IUserModel extends Document {
//     fullname: string;
//     email: string;
// }

// export interface IStatModel extends AggregationCursor {
//     _id: number;
//     number: number;
// }

// const UserSchema: Schema = new Schema(
//     {
//         fullName: {
//             type: String,
//             trim: true,
//         },
//         email: {
//             type: String,
//             required: true,
//             index: true,
//             unique: true,
//         },
//     },

//     {
//         timestamps: true,
//         collection: 'usermodels',
//         versionKey: false,
//     },
// );

// export default connections.db.model<IUserModel>('UserModel', UserSchema);
import { connections } from '../../config/connection';
import { AggregationCursor } from 'mongodb';
import {
    createConnection,
    Connection,
    Entity,
    ObjectID,
    ObjectIdColumn,
    Column,
    getMongoRepository,
    MongoRepository,
} from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    fullName: string;

    @Column({
        unique: true,
    })
    email: string;
}
// const UserModel: MongoRepository =

export default async (): Promise<MongoRepository<User>> => {
    const connection: Connection = await connections();
    const UserModel: MongoRepository<User> = connection.getMongoRepository(
        User,
    );

    return UserModel;
};

// MongoRepository<User>
// export default connections.getMongoRepository(User);
