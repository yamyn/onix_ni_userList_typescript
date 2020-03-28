import * as moment from 'moment';
import { IEmailListModel } from '../model';

export interface IEmail {
    emails: string[];
    date: string;
    id: string;
}

export function transformDate(emails: IEmailListModel[]): IEmail[] {
    const emailList: IEmail[] = emails.map(
        (emailObj: IEmailListModel): IEmail => {
            const date: string = moment(emailObj.createdAt).format(
                'MMMM Do YYYY, h:mm:ss a',
            );

            return {
                date,
                emails: emailObj.emails,
                id: emailObj.id,
            };
        },
    );

    return emailList;
}
