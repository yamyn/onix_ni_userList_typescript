import EmailsListModel, { IEmailListModel } from './model';
import { IEmailListService } from './Interface';

/**
 * @export
 * @implements {IEmailListModelService}
 */

const EmailListService: IEmailListService = {
    /**
     * @returns {Promise < IEmailListModel[] >}
     * @memberof EmailListService
     */
    findAll(): Promise<IEmailListModel[]> {
        return EmailsListModel.find({}).exec();
    },

    /**
     * @returns {Promise < IEmailListModel >}
     * @memberof EmailListService
     */
    create(emailList: IEmailListModel): Promise<IEmailListModel> {
        return EmailsListModel.create(emailList);
    },
};

export default EmailListService;
