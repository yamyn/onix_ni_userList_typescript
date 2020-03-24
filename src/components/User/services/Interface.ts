// import { IUserModel, IStatModel } from '../model';
import { Aggregate } from 'mongoose';
import { MongoRepository } from 'typeorm';
import { User } from '../model';

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
    /**
     * @returns {Promise<IUserModel[]>}
     * @memberof IUserService
     */
    findAll(): Promise<User[]>;

    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    findOne(code: string): Promise<User>;

    // /**
    //  * @param {IUserModel} IUserModel
    //  * @returns {Promise<IUserModel>}
    //  * @memberof IUserService
    //  */
    // create(IUserModel: User): Promise<User>;

    // /**
    //  * @param {IUserModel} IUserModel
    //  * @returns {Promise<IUserModel>}
    //  * @memberof IUserService
    //  */
    // updateById(id: string, User: User): Promise<User>;

    // /**
    //  * @param {string} id
    //  * @returns {Promise<IUserModel>}
    //  * @memberof IUserService
    //  */
    // deleteById(id: string): Promise<User>;

    // /**
    //  * @param {number} lastMonthDay
    //  * @returns {Aggregate<AggregationCursor[]}
    //  * @memberof IUserService
    //  */
    // getStatistic(lastMonthDay: number): Aggregate<IStatModel[]>;
}
