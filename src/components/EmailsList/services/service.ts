import EmailsListModel, { IEmailListModel } from '../model';
import { IEmailListService } from './Interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IEmailListModelService}
 */

const EmailListService: IEmailListService = {
    /**
     * @method findAll
     * @returns {Promise < IEmailListModel[] >}
     * @memberof EmailListService
     */
    findAll(): Promise<IEmailListModel[]> {
        return EmailsListModel.find({}).exec();
    },

    /**
     * @method create
     * @param {IEmailListModel} emailList
     * @returns {Promise < IEmailListModel >}
     * @memberof EmailListService
     */
    create(emailList: IEmailListModel): Promise<IEmailListModel> {
        return EmailsListModel.create(emailList);
    },

    /**
     * @method deleteById
     * @param {string} id
     * @returns {Promise< IEmailListModel >}
     * @memberof EmailListService
     */
    deleteById(id: string): Promise<IEmailListModel> {
        return EmailsListModel.findByIdAndDelete({
            _id: Types.ObjectId(id),
        }).exec();
    },
};

export default EmailListService;
