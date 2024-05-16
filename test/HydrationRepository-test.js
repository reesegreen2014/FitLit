import { assert, expect } from 'chai';
const { calculateAverageFluidOunces } = require('../src/hydrationData.js');



describe('calculateAverageFluidOunces Function', function () {
    let user1, user2, user3, hydrationArray
    beforeEach(function () {
        user1 = [
            {
                "userID": 1,
                "date": "2023/03/24",
                "numOunces": 28
            },
            {
                "userID": 1,
                "date": "2023/03/25",
                "numOunces": 35
            },
            {
                "userID": 1,
                "date": "2023/03/26",
                "numOunces": 95
            },
            {
                "userID": 1,
                "date": "2023/03/27",
                "numOunces": 74
            },
        ];
        user2 = [
            {
                "userID": 2,
                "date": "2023/03/24",
                "numOunces": 40
            },
            {
                "userID": 2,
                "date": "2023/03/25",
                "numOunces": 56
            },
            {
                "userID": 2,
                "date": "2023/03/26",
                "numOunces": 95
            },
            {
                "userID": 2,
                "date": "2023/03/27",
                "numOunces": 75
            },
        ];

        user3 = [
            {
                "userID": 3,
                "date": "2023/03/24",
                "numOunces": 55
            },
            {
                "userID": 3,
                "date": "2023/03/25",
                "numOunces": 20
            },
            {
                "userID": 3,
                "date": "2023/03/26",
                "numOunces": 100
            },
            {
                "userID": 3,
                "date": "2023/03/27",
                "numOunces": 75
            },
        ];
        hydrationArray = [user1, user2, user3];
    })

    it.skip('should be a function', () => {
        assert.isFunction(calculateAverageFluidOunces);
    })

    it.skip('should return the users average fluid ounces consumed per day for all time', () => {
        const user1Average = calculateAverageFluidOunces(user1);
        const user2Average = calculateAverageFluidOunces(user2);
        const user3Average = calculateAverageFluidOunces(user3);
        expect(user1Average).to.equal()
        expect(user2Average).to.equal(66.5)
        expect(user3Average).to.equal(62.5)
    })
    it.skip('should return user1s average fluid ounces consumed per day for all time', () => {
        const expectedAverage = calculateAverageFluidOunces(user1);
        const actualAverage = (28 + 35 + 95 + 74) / 4;
        expect(actualAverage).to.equal(expectedAverage);
    })
})

describe('calculateDailyFluidOunces Function', function () {
    let user1, user2, user3
    this.beforeEach(function () {
        user1 = [
            {
                "userID": 1,
                "date": "2023/03/24",
                "numOunces": 28
            },
            {
                "userID": 1,
                "date": "2023/03/24",
                "numOunces": 35
            },
            {
                "userID": 1,
                "date": "2023/03/26",
                "numOunces": 95
            },
            {
                "userID": 1,
                "date": "2023/03/27",
                "numOunces": 74
            },
        ];
        user2 = [
            {
                "userID": 2,
                "date": "2023/04/24",
                "numOunces": 40
            },
            {
                "userID": 2,
                "date": "2023/04/24",
                "numOunces": 56
            },
            {
                "userID": 2,
                "date": "2023/04/24",
                "numOunces": 95
            },
            {
                "userID": 2,
                "date": "2023/03/27",
                "numOunces": 75
            },
        ];
        user3 = [
            {
                "userID": 3,
                "date": "2023/03/24",
                "numOunces": 55
            },
            {
                "userID": 3,
                "date": "2023/03/24",
                "numOunces": 20
            },
            {
                "userID": 3,
                "date": "2023/03/24",
                "numOunces": 100
            },
            {
                "userID": 3,
                "date": "2023/03/24",
                "numOunces": 75
            },
        ];
        hydrationArray = [user1, user2, user3]
    })

    it('should return the correct fluid ounces consumed for a specific day', () => {
        const user1DailyOunces = calculateDailyOunces(hydrationArray, 1)
        expect(user1DailyOunces).to.deep.equal(63)
    })

    it('should handle invalid input for numOunces', () => {
        const invalidOunces = 'invalid_ounces'
        const result = calculateDailyOunces(hydrationArray, invalidOunces)
        expect(result).to.equal('Invalid Ounces Input')
    })

    it('should handle a zero value for numOunces', () => {
        const zeroOunces = 'zero_ounces'
        const
    })




// test ideas
//per day
//returns the correct fluid ounces they consumed for a specific day
//can handle 0 ounces consumed

//per week
//return array of fluid ounces consumed each day over the course of a week
//can handle partial weeks?

// -Empty Array
// -Array with no hydration data
// -Array with objects missing hydration data (function must filter out objects without hydration data)
// -Edge cases in hydration values: zero values, extremely large values, non-numeric values, etc
// -Can handle duplicate objects (or perhaps duplicate dates?

