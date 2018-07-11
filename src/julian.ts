import { isLeapYear, IHistoricalDate, InvalidDateException } from "./common";
import { GregorianDate } from "./gregorian";

// Licensed under the MIT license:
// http://opensource.org/licenses/MIT
// Copyright (c) 2016, fitnr <fitnr@fakeisthenewreal>
// based on https://github.com/fitnr/convertdate/blob/master/convertdate/julian.py

const HAVE_30_DAYS = [4, 6, 9, 11];

export class JulianDate implements IHistoricalDate {
    public readonly calendar = 'julian';
    public get isLeapYear() {
        return isLeapYear(this.year, this.calendar);
    }

    constructor(public readonly year: number,
        public readonly month: number,
        public readonly day: number) {
        this.assertLegalDate(year, month, day);
    }

    /**
     * Creates a new JulianDate object based on the number of Julian days.
     * @param jd 
     */
    static fromJulianDays(jd: number) {
        jd += 0.5;
        let z = Math.trunc(jd);

        let a = z;
        let b = a + 1524;
        let c = Math.trunc((b - 122.1) / 365.25);
        let d = Math.trunc(365.25 * c);
        let e = Math.trunc((b - d) / 30.6001);

        let month: number;
        if (e < 14) {
            month = e - 1;
        } else {
            month = e - 13;
        }
        let year: number;
        if (month > 2) {
            year = c - 4716;
        } else {
            year = c - 4715;
        }
        let day = b - d - Math.trunc(30.6001 * e);

        return new JulianDate(year, month, day);
    }

    /**
     * Check if this is a legal date in the Julian calendar
     */
    private assertLegalDate(year: number, month: number, day: number) {
        if (day < 0 || day > this.monthLength(year, month)) {
            throw new InvalidDateException(`Month ${month} doesn't have a day ${day}`);
        }

        return true;
    }

    /**
     * Convert to Julian day using astronomical years (0 = 1 BC, -1 = 2 BC)
     */
    private toJulianDay(year: number, month: number, day: number) {
        // Algorithm as given in Meeus, Astronomical Algorithms, Chapter 7, page 61
        if (month <= 2) {
            year -= 1;
            month += 12;
        }

        return (Math.trunc((365.25 * (year + 4716))) + Math.trunc((30.6001 * (month + 1))) + day) - 1524.5
    }

    public monthLength(year: number, month: number) {
        return month == 2
            ? isLeapYear(year, 'julian') ? 29 : 28
            : HAVE_30_DAYS.indexOf(month) >= 0 ? 30 : 31;
    }

    public toGregorian() {
        let julianDays = this.toJulianDay(this.year, this.month, this.day);
        return GregorianDate.fromJulianDays(julianDays);
    }

    public toJulian() {
        return this;
    }

    public toString() {
        return `${this.year}-${this.month}-${this.day} (Julian)`;
    }
}
