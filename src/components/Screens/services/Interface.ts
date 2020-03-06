import { IScreensModel } from '../model';

/**
 * @export
 * @interface IScreensService
 */
export interface IScreensService {
    /**
     * @returns {Promise<IScreensModel[]>}
     * @memberof IScreensService
     */
    findAll(): Promise<IScreensModel[]>;

    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    create(IScreensModel: IScreensModel): Promise<IScreensModel>;
}
