import AdminModel, { IAdminModel } from '../model';
import { IAdminService } from './Interface';
import { Types, QueryUpdateOptions } from 'mongoose';

/**
 * @export
 * @implements {IUserModelService}
 */

const AdminService: IAdminService = {
    /**
     * @param {string} email
     * @summary get an admin
     * @returns {Promise<IAdminModel>}
     * @memberof AdminService
     */
    findOne(email: string): Promise<IAdminModel> {
        return AdminModel.findOne({ email }).exec();
    },

    /**
     * @method create
     * @param {IAdminModel} profile
     * @summary create a new admin
     * @returns {Promise<IAdminModel>}
     * @memberof AdminService
     */
    create(profile: IAdminModel): Promise<IAdminModel> {
        return AdminModel.create(profile);
    },
    /**
     * Find an admin by id and update his profile
     * @method updateRefresh
     * @param {string} id
     * @param {string} refreshToken
     * @summary update an admin's profile
     * @returns {Promise<IAdminModel>}
     * @memberof AdminService
     */
    updateRefresh(id: string, refreshToken: string): Promise<IAdminModel> {
        const updateOptions: QueryUpdateOptions = {
            useFindAndModify: false,
        };

        return AdminModel.findByIdAndUpdate(
            { _id: Types.ObjectId(id) },
            { refreshToken },
            updateOptions,
        ).exec();
    },
};

export default AdminService;
