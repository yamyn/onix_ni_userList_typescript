import ScreensModel, { IScreensModel } from '../model';
import { IScreensService } from './Interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IScreensModelService}
 */

const ScreensService: IScreensService = {
    /**
     * @method findAll
     * @returns {Promise < IScreensModel[] >}
     * @memberof ScreensService
     */
    findAll(): Promise<IScreensModel[]> {
        return ScreensModel.find({}).exec();
    },

    /**
     * @method create
     * @param { IScreensModel } screenLink
     * @returns {Promise < IScreensModel >}
     * @memberof ScreensService
     */
    create(screenLink: IScreensModel): Promise<IScreensModel> {
        return ScreensModel.create(screenLink);
    },

    /**
     * @method deleteById
     * @param {string} id
     * @returns {Promise< IScreensModel >}
     * @memberof ScreensService
     */
    deleteById(id: string): Promise<IScreensModel> {
        return ScreensModel.findByIdAndDelete({
            _id: Types.ObjectId(id),
        }).exec();
    },
};

export default ScreensService;
