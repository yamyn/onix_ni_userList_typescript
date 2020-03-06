import ScreensModel, { IScreensModel } from '../model';
import { IScreensService } from './Interface';

/**
 * @export
 * @implements {IScreensModelService}
 */

const ScreensService: IScreensService = {
    /**
     * @returns {Promise < IScreensModel[] >}
     * @memberof ScreensService
     */
    findAll(): Promise<IScreensModel[]> {
        return ScreensModel.find({}).exec();
    },

    /**
     * @returns {Promise < IScreensModel >}
     * @memberof ScreensService
     */
    create(screenLink: IScreensModel): Promise<IScreensModel> {
        return ScreensModel.create(screenLink);
    },
};

export default ScreensService;
