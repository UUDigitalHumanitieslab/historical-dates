import { JulianDate } from "./julian-date";

describe('Julian dates', () => {
    it('Converts dates to Gregorian as expected', () => {
        // Start of the Gregorian calendar
        expectGregorian(5, 10, 1582, 15, 10, 1582);
        // Battle of the Boyne
        expectGregorian(1, 7, 1690, 11, 7, 1690);
        // Birthday George Washington
        expectGregorian(11, 2, 1732, 22, 2, 1732);
        // Russian October Revolution
        expectGregorian(25, 10, 1917, 7, 11, 1917);
    });

    function expectGregorian(julianDay: number, julianMonth: number, julianYear: number,
        gregorianDay: number, gregorianMonth: number, gregorianYear: number) {
        let converted = new JulianDate(julianYear, julianMonth, julianDay).toGregorian();
        expect({
            year: converted.year,
            month: converted.month,
            day: converted.day
        }).toEqual({
            year: gregorianYear,
            month: gregorianMonth,
            day: gregorianDay
        });
    }
})
