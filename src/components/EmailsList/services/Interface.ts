import { IEmailListModel } from '../model';

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

    /**
     * @param {string} code
     * @returns {Promise<IEmailListModel>}
     * @memberof IEmailListService
     */
    findById(id: string): Promise<IEmailListModel>;

    /**
     * @param {string} id
     * @returns {Promise<IEmailListModel>}
     * @memberof IEmailListService
     */
    deleteById(id: string): Promise<IEmailListModel>;
}
