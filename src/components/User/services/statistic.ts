import * as moment from 'moment';
import { IStatModel } from '../model';
import UserService from './tableService';

/**
 * @function
 * @param {number} dayCount - count day of year
 * @returns {string} dateAgo
 */
function countMsInDays(dayCount: number): string {
    const msInDay: number = 86400000;
    const countMS: number = dayCount * msInDay;

    const dateLast: number =
        Number(moment('2020 - 01 - 01', 'YYYY-MM-DD').format('x')) + countMS;
    const dateAgo: string = moment(dateLast, 'x')
        .utc()
        .format('DD-MM');

    return dateAgo;
}

/**
 * @export
 * @interface IUserStatistic
 */

export interface IUserStatistic {
    labels: string[];
    count: number[];
}

/**
 * @export
 * @function
 * @param {number} dayCount - count day ago
 * @returns {object} userStatistic
 */
export async function getUserStat(dayCount: number): Promise<IUserStatistic> {
    const lastMonthDay: number =
        moment()
            .utc()
            .dayOfYear() - dayCount;

    const userStatisticArr: IStatModel[] = await UserService.getStatistic(
        lastMonthDay,
    );

    const userStatistic: IUserStatistic = {
        labels: [],
        count: [],
    };

    userStatisticArr.map((obj: IStatModel): void => {
        const date: string = countMsInDays(obj._id);

        userStatistic.labels.push(date);
        userStatistic.count.push(obj.number);
    });

    return userStatistic;
}
