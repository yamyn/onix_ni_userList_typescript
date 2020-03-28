import { IAdminModel } from '../model';

/**
 * @export
 * @interface IAdminService
 */
export interface IAdminService {
    /**
     * @param {string} email
     * @returns {Promise<IAdminModel>}
     * @memberof IAdminService
     */
    findOne(email: string): Promise<IAdminModel>;

    /**
     * @param {IAdminModel} IAdminModel
     * @returns {Promise<IAdminModel>}
     * @memberof IAdminService
     */
    create(IAdminModel: IAdminModel): Promise<IAdminModel>;

    /**
     * @param {IAdminModel} IAdminModel
     * @returns {Promise<IAdminModel>}
     * @memberof IUserService
     */
    updateRefresh(id: string, refreshToken: string): Promise<IAdminModel>;
}
