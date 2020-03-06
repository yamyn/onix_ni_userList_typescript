import * as moment from 'moment';

/**
 * @export
 * @function
 * @returns {string} screenName - to use current date as name for screen
 */
export function createScreenName(): string {
    return moment()
        .utc()
        .format('YYYY-MM-DD__HH:mm');
}
