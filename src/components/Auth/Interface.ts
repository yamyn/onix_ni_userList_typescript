import { IAdminModel } from './model';

/**
 * @export
 * @interface IAdminService
 */
export interface IAdminService {
    /**
     * @returns {Promise<IAdminModel[]>}
     * @memberof IAdminService
     */
    findAll(): Promise<IAdminModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IAdminModel>}
     * @memberof IAdminService
     */
    findOne(code: string): Promise<IAdminModel>;

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

    /**
     * @param {IAdminModel} IAdminModel
     * @returns {Promise<IAdminModel>}
     * @memberof IUserService
     */
    updateById(id: string, IAdminModel: IAdminModel): Promise<IAdminModel>;

    /**
     * @param {string} id
     * @returns {Promise<IAdminModel>}
     * @memberof IUserService
     */
    deleteById(id: string): Promise<IAdminModel>;
}
