import * as moment from 'moment';
import UserModel from '../model';
import UserService from './tableService';
import { Aggregate } from 'mongoose';
import { AggregationCursor } from 'mongodb';

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
 * @function
 * @param {number} dayCount - count day ago
 * @returns {object} userStatistic
 */
async function getUserStat(dayCount: number): Promise<object> {
    const lastMonthDay: number =
        moment()
            .utc()
            .dayOfYear() - dayCount;

    const userStatisticArr: Aggregate<AggregationCursor[]> = await UserService.getStatistic(
        lastMonthDay,
    );

    console.log(userStatisticArr);
    const userStatistic = {
        labels: [],
        count: [],
    };
    userStatisticArr.map(obj => {
        const date = countMsInDays(obj._id);
        userStatistic.labels.push(date);
        userStatistic.count.push(obj.number);
        return;
    });

    return userStatistic;
}

module.exports = getUserStat;
