import { fromRoman, toRoman, rtags, rtxts, rmonats, RomanDate } from './roman';
describe('Roman', () => {
    it('Converts Roman dates', () => {
        expectRoman(5, 6, 2018, '', 'Non.', 'Jun.', 'MMXVIII');
        expectRoman(8, 9, 2017, 'a.d.VI.', 'Id.', 'Sept.', 'MMXVII');
        expectRoman(27, 2, 1987, 'a.d.III.', 'Kal.', 'Mart.', 'MCMLXXXVII');
        expectRoman(10, 12, 1815, 'a.d.IV.', 'Id.', 'Dec.', 'MDCCCXV');
        expectRoman(17, 5, 1792, 'a.d.XVI.', 'Kal.', 'Jun.', 'MDCCXCII');
        expectRoman(18, 3, 1634, 'a.d.XV.', 'Kal.', 'Apr.', 'MDCXXXIV');
    });

    it('Loop through all the dates', () => {
        let today = new Date();
        for (let date = new Date(1400, 1, 1), i = 0; date < today && i < 1000; i++) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let roman: RomanDate = null;
            try {
                roman = null;
                roman = toRoman(day, month, year);
                let back = fromRoman(roman.rtag, roman.rtxt, roman.rmonat, roman.year);

                let fromString = `${day}-${month}-${year}`;
                let backString = `${back.day}-${back.month}-${back.year}`;

                if (fromString != backString) {
                    fail(`${fromString} != ${backString} (${roman})`);
                }
            } catch (error) {
                if (roman != null) {
                    console.log(roman.toString());
                }
                console.log(`${day}-${month}-${year}`);
                console.log(error);
                throw error;
            }

            let next = date.getDate() + 1;
            date.setDate(next);
        }
    });

    function expectRoman<T>(day: number,
        month: number,
        year: number,
        romanDay: rtags,
        romanText: rtxts,
        romanMonth: rmonats,
        romanYear: string) {
        let expected = `${romanDay}${romanText}${romanMonth} ${romanYear}`;

        expect(toRoman(day, month, year).toString()).toEqual(expected);
        let from = fromRoman(
            romanDay,
            romanText,
            romanMonth,
            romanYear);
        expect(`${from.day}-${from.month}-${from.year}`)
            .toEqual(`${day}-${month}-${year}`);
    }
});
