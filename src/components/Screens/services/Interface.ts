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
     * @param {IScreensModel} IScreensModel
     * @returns {Promise<IScreensModel>}
     * @memberof IScreensService
     */
    create(IScreensModel: IScreensModel): Promise<IScreensModel>;
}
