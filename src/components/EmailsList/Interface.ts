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
     * @param {IEmailListModel} IEmailListModel
     * @returns {Promise<IEmailListModel>}
     * @memberof IEmailListService
     */
    create(IEmailListModel: IEmailListModel): Promise<IEmailListModel>;
}
