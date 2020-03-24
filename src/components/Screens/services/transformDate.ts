import * as moment from 'moment';
import { IScreensModel } from '../model';

export interface IScreen {
    link: string;
    date: string;
}

export function transformDate(emails: IScreensModel[]): IScreen[] {
    const screenList: IScreen[] = emails.map(
        (screen: IScreensModel): IScreen => {
            const date: string = moment(screen.createdAt).format(
                'MMMM Do YYYY, h:mm:ss a',
            );

            return {
                date,
                link: screen.screenLink,
            };
        },
    );

    return screenList;
}
