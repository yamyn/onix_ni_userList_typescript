import { IEmailListModel } from './model';

/**
 * @export
 * @interface IEmailListService
 */
export interface IEmailListService {
    /**
     * @returns {Promise<IEmailListModel[]>}
     * @memberof IEmailListService
     */
    findAll(): Promise<IEmailListModel[]>;

    /**
     * @param {IUserModel} IUserModel
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    create(IEmailListModel: IEmailListModel): Promise<IEmailListModel>;
}
