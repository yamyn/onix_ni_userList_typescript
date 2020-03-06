import UserModel, { IUserModel, IStatModel } from '../model';
import { IUserService } from './Interface';
import { Types, QueryUpdateOptions, Aggregate } from 'mongoose';

/**
 * @export
 * @implements {IUserModelService}
 */

const UserService: IUserService = {
    /**
     * @returns {Promise < IUserModel[] >}
     * @memberof UserService
     */
    findAll(): Promise<IUserModel[]> {
        return UserModel.find({}).exec();
    },

    /**
     * @param {string} id
     * @summary get a user
     * @returns {Promise<UserModel>}
     * @memberof UserService
     */
    findOne(code: string): Promise<IUserModel> {
        return UserModel.findOne(code).exec();
    },

    /**
     * @method create
     * @param {IUserModel} profile
     * @summary create a new user
     * @returns {Promise<UserModel>}
     * @memberof UserService
     */
    create(profile: IUserModel): Promise<IUserModel> {
        return UserModel.create(profile);
    },

    /**
     * Find a user by id and update his profile
     * @method updateById
     * @param {string} id
     * @param {IUserModel} newProfile
     * @summary update a user's profile
     * @returns {Promise<UserModel>}
     * @memberof UserService
     */
    updateById(id: string, newProfile: IUserModel): Promise<IUserModel> {
        const updateOptions: QueryUpdateOptions = {
            new: true,
            useFindAndModify: false,
        };

        return UserModel.findByIdAndUpdate(
            { _id: Types.ObjectId(id) },
            newProfile,
            updateOptions,
        ).exec();
    },

    /**
     * @method deleteById
     * @param {string} id
     * @summary delete a user from database
     * @returns {Promise<UserModel>}
     * @memberof UserService
     */
    deleteById(id: string): Promise<IUserModel> {
        return UserModel.findByIdAndDelete({ _id: Types.ObjectId(id) }).exec();
    },

    /**
     * @method getStatisti
     * @param {number} lastMonthDay
     * @summary get filtered array for current time
     * @returns {Aggregate<AggregationCursor[]>}
     * @memberof UserService
     */
    getStatistic(lastMonthDay: number): Aggregate<IStatModel[]> {
        return UserModel.aggregate([
            {
                $project: {
                    createdAt: 1,
                    dayOfYear: {
                        $dayOfYear: '$createdAt',
                    },
                },
            },
            {
                $project: {
                    dayOfYear: 1,
                    isThisMonth: { $gte: ['$dayOfYear', lastMonthDay] },
                    count: { $add: [1] },
                },
            },
            { $match: { isThisMonth: true } },

            {
                $group: {
                    _id: '$dayOfYear',
                    number: { $sum: '$count' },
                },
            },
            { $sort: { _id: 1 } },
        ]);
    },
};

export default UserService;
