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

import { connection } from '../../config/connection';
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
    Index,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('usermodels')
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    fullName: string;

    @Index({
        unique: true,
    })
    @Column()
    email: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}

// export default getMongoRepository(User);
export default async (): Promise<MongoRepository<User>> => {
    const connect: Connection = await connection();
    const UserRepository: MongoRepository<User> = connect.getMongoRepository(
        User,
    );

    return UserRepository;
};

// MongoRepository<User>
// export default connections.getMongoRepository(User);
