import { IUserModel, IStatModel } from '../model';
import { Aggregate, Types } from 'mongoose';
// import { Types } from '@hapi/joi';
import { AggregationCursor } from 'mongodb';

/**
 * @export
 * @interface IUserService
 */
export interface IUserService {
    /**
     * @returns {Promise<IUserModel[]>}
     * @memberof IUserService
     */
    findAll(): Promise<IUserModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    findOne(code: string): Promise<IUserModel>;

    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    create(IUserModel: IUserModel): Promise<IUserModel>;

    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    updateById(id: string, IUserModel: IUserModel): Promise<IUserModel>;

    /**
     * @param {string} id
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    deleteById(id: string): Promise<IUserModel>;

    /**
     * @param {number} lastMonthDay
     * @returns {Aggregate<AggregationCursor[]}
     * @memberof IUserService
     */
    getStatistic(lastMonthDay: number): Promise<IStatModel[]>;
}
