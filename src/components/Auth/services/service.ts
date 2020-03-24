import AdminModel, { IAdminModel } from '../model';
import { IAdminService } from './Interface';
import { Types, QueryUpdateOptions } from 'mongoose';

/**
 * @export
 * @implements {IUserModelService}
 */

const AdminService: IAdminService = {
    /**
     * @returns {Promise < IAdminModel[] >}
     * @memberof AdminService
     */
    findAll(): Promise<IAdminModel[]> {
        return AdminModel.find({}).exec();
    },

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
     * @method updateById
     * @param {string} id
     * @param {IAdminModel} newProfile
     * @summary update an admin's profile
     * @returns {Promise<IAdminModel>}
     * @memberof AdminService
     */
    updateById(id: string, newProfile: IAdminModel): Promise<IAdminModel> {
        const updateOptions: QueryUpdateOptions = {
            new: true,
            useFindAndModify: false,
        };

        return AdminModel.findByIdAndUpdate(
            { _id: Types.ObjectId(id) },
            newProfile,
            updateOptions,
        ).exec();
    },

    /**
     * @method deleteById
     * @param {string} id
     * @summary delete an admin from database
     * @returns {Promise<IAdminModel>}
     * @memberof AdminService
     */
    deleteById(id: string): Promise<IAdminModel> {
        return AdminModel.findByIdAndDelete({ _id: Types.ObjectId(id) }).exec();
    },
};

export default AdminService;
