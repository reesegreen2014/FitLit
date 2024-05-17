import { assert, expect } from 'chai';
const { calculateAverageFluidOunces, calculateDailyFluidOunces, calculateWeeklyFluidOunces } = require('../src/hydrationData.js');



describe('calculateAverageFluidOunces Function', function () {
    let hydrationData;
    beforeEach(function () {
       hydrationData = [
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
    })

    it('should be a function', () => {
        assert.isFunction(calculateAverageFluidOunces);
    })

    it('should return the users average fluid ounces consumed per day for all time', () => {
        const user1Average = calculateAverageFluidOunces(1, {hydrationData});
        const user2Average = calculateAverageFluidOunces(2, {hydrationData});
        const user3Average = calculateAverageFluidOunces(3, {hydrationData});
        expect(user1Average).to.equal(58)
        expect(user2Average).to.equal(66.5)
        expect(user3Average).to.equal(62.5)
    })
    it('should return user1s average fluid ounces consumed per day for all time', () => {
        const expectedAverage = calculateAverageFluidOunces(1, {hydrationData});
        const actualAverage = (28 + 35 + 95 + 74) / 4;
        expect(actualAverage).to.equal(expectedAverage);
    })

    it('should return 0 if hydration data is empty', () => {
        const emptyDataAverage = calculateAverageFluidOunces(1, { hydrationData: [] });
        expect(emptyDataAverage).to.equal(0);
    })

    it('should return 0 if user ID does not exist in the data', () => {
        const nonExistentUserAverage = calculateAverageFluidOunces(4, {hydrationData});
        expect(nonExistentUserAverage).to.equal(0);
    })
})

describe('calculateDailyFluidOunces Function', function () {
    let hydrationData;
    this.beforeEach(function () {
        hydrationData = [
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
    })

    it('should be a function', () => {
        assert.isFunction(calculateDailyFluidOunces);
    })

    it('should return the correct fluid ounces consumed for a specific day', () => {
        const user1DailyOunces = calculateDailyFluidOunces(1, '2023/03/24', { hydrationData });
        expect(user1DailyOunces).to.equal(63)
    })

    it('should handle invalid input for numOunces', () => {
        const invalidOunces = 'invalid_ounces'
        const result = calculateDailyFluidOunces(invalidOunces, '2023/03/24', {hydrationData})
        expect(result).to.equal('No data found for the specified user and date.')
    })

    it('should return appropriate message for nonexistent user and date combination', () => {
        const result = calculateDailyFluidOunces(4, '2023/03/24', { hydrationData });
        expect(result).to.equal('No data found for the specified user and date.');
    });

    it('should return appropriate message when no data is found', () => {
        const result = calculateDailyFluidOunces(1, '2023/03/28', { hydrationData });
        expect(result).to.equal('No data found for the specified user and date.');
    });
})


describe('calculateWeeklyFluidOunces Function', function () {
    let hydrationData;
    beforeEach(function () {
       hydrationData = [
        {
            "userID": 1,
            "date": "2023/03/01",
            "numOunces": 28
        },
        {
            "userID": 1,
            "date": "2023/03/02",
            "numOunces": 35
        },
        {
            "userID": 1,
            "date": "2023/03/03",
            "numOunces": 40
        },
        {
            "userID": 1,
            "date": "2023/03/04",
            "numOunces": 56
        },
        {
            "userID": 1,
            "date": "2023/03/05",
            "numOunces": 60
        },
        {
            "userID": 1,
            "date": "2023/03/06",
            "numOunces": 70
        },
        {
            "userID": 1,
            "date": "2023/03/07",
            "numOunces": 80
        },
        {
            "userID": 2,
            "date": "2023/03/01",
            "numOunces": 32
        },
        {
            "userID": 2,
            "date": "2023/03/02",
            "numOunces": 38
        },
        {
            "userID": 2,
            "date": "2023/03/03",
            "numOunces": 45
        },
        {
            "userID": 2,
            "date": "2023/03/04",
            "numOunces": 60
        },
        {
            "userID": 2,
            "date": "2023/03/05",
            "numOunces": 70
        },
        {
            "userID": 2,
            "date": "2023/03/06",
            "numOunces": 85
        },
        {
            "userID": 2,
            "date": "2023/03/07",
            "numOunces": 90
        },
        {
            "userID": 3,
            "date": "2023/03/01",
            "numOunces": 25
        },
        {
            "userID": 3,
            "date": "2023/03/02",
            "numOunces": 30
        },
        {
            "userID": 3,
            "date": "2023/03/03",
            "numOunces": 35
        },
        {
            "userID": 3,
            "date": "2023/03/04",
            "numOunces": 40
        },
        {
            "userID": 3,
            "date": "2023/03/05",
            "numOunces": 45
        },
        {
            "userID": 3,
            "date": "2023/03/06",
            "numOunces": 50
        },
        {
            "userID": 3,
            "date": "2023/03/07",
            "numOunces": 55
        },
        {
            "userID": 4,
            "date": "2023/03/05",
            "numOunces": 48
        },
        {
            "userID": 4,
            "date": "2023/03/06",
            "numOunces": 50
        },
        {
            "userID": 4,
            "date": "2023/03/07",
            "numOunces": 55
        }
    ];
    })

    it('should be a function', () => {
        assert.isFunction(calculateWeeklyFluidOunces)
    })

    it('array should be 7 elements long', () => {
        const user1WeeklyFluidOunces = calculateWeeklyFluidOunces(1, '2023/03/01', hydrationData);
        const user2WeeklyFluidOunces = calculateWeeklyFluidOunces(2, '2023/03/01', hydrationData);
        const user3WeeklyFluidOunces = calculateWeeklyFluidOunces(3, '2023/03/01', hydrationData);
        expect(user1WeeklyFluidOunces.length).to.equal(7);
        expect(user2WeeklyFluidOunces.length).to.equal(7);
        expect(user3WeeklyFluidOunces.length).to.equal(7);
    })

    it('should return the correct fluid ounces of water a user consumed each day over the course of a week', () => {
        const user1WeeklyFluidOunces = calculateWeeklyFluidOunces(1, '2023/03/01', hydrationData);
        const user2WeeklyFluidOunces = calculateWeeklyFluidOunces(2, '2023/03/01', hydrationData);
        const user3WeeklyFluidOunces = calculateWeeklyFluidOunces(3, '2023/03/01', hydrationData);
        expect(user1WeeklyFluidOunces).to.deep.equal([28, 35, 40, 56, 60, 70, 80])
        expect(user2WeeklyFluidOunces).to.deep.equal([32, 38, 45, 60, 70, 85, 90])
        expect(user3WeeklyFluidOunces).to.deep.equal([25, 30, 35, 40, 45, 50, 55])
    })

    it('should handle an empty array', () => {
        const emptyWeeklyFluidOunces = calculateWeeklyFluidOunces(5, '2023/03/01', hydrationData)
        expect(emptyWeeklyFluidOunces).to.equal('No data found.')
    })

    it('should handle if user has less than 7 days of data', () => {
        const user4WeeklyFluidOunces = calculateWeeklyFluidOunces(4, '2023/03/01', hydrationData);
        expect(user4WeeklyFluidOunces).to.equal('Weekly data not available just yet! Check back soon');
    })
})


//should also be able to handle an array with length less than 7.