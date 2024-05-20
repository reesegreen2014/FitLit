import { assert, expect } from 'chai';
const { getAverageHrs, getAverageQuality, getDailyHrs, getDailyQuality
} = require('../src/sleep.js')

describe('Get Average Hours Function', function () {
    let sleepData
    beforeEach(function () {
        sleepData = {
            sleepData: [
                {
                    "ID": 1,
                    "name": "Monday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 7
                },
                {
                    "ID": 2,
                    "name": "Tuesday",
                    "hoursOfSleep": 7,
                    "qualityOfSleep": 6
                },
                {
                    "ID": 3,
                    "name": "Wednesday",
                    "hoursOfSleep": 6,
                    "qualityOfSleep": 8
                },
                {
                    "ID": 4,
                    "name": "Thursday",
                    "hoursOfSleep": 5,
                    "qualityOfSleep": 5
                },
                {
                    "ID": 5,
                    "name": "Friday",
                    "hoursOfSleep": 7,
                    "qualityOfSleep": 7
                },
                {
                    "ID": 6,
                    "name": "Saturday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 9
                },
                {
                    "ID": 7,
                    "name": "Sunday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 8
                }
            ]
        }
    })

    it('should calculate average hours of sleep for all time', () => {
        let sleepAvg = getAverageHrs(sleepData)
        expect(sleepAvg).to.equal(7)
    })

    it('should return an error if no data is provided', () => {
        sleepData = { sleepData: [] }
        let sleepAvg = getAverageHrs(sleepData)
        expect(sleepAvg).to.equal(`No data available.`)
    })

    it('should return a value for just one day', () => {
        sleepData = {
            sleepData: [
                {
                    "ID": 1,
                    "name": "Monday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 7
                }
            ]
        }
        let sleepAvg = getAverageHrs(sleepData)
        expect(sleepAvg).to.equal(8)
    })
})

describe('Get Sleep Quality Average', function () {
    let sleepData
    beforeEach(function () {
        sleepData = {
            sleepData: [
                {
                    "ID": 1,
                    "name": "Monday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 7
                },
                {
                    "ID": 2,
                    "name": "Tuesday",
                    "hoursOfSleep": 7,
                    "qualityOfSleep": 6
                },
                {
                    "ID": 3,
                    "name": "Wednesday",
                    "hoursOfSleep": 6,
                    "qualityOfSleep": 8
                },
                {
                    "ID": 4,
                    "name": "Thursday",
                    "hoursOfSleep": 5,
                    "qualityOfSleep": 5
                },
                {
                    "ID": 5,
                    "name": "Friday",
                    "hoursOfSleep": 7,
                    "qualityOfSleep": 7
                },
                {
                    "ID": 6,
                    "name": "Saturday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 9
                },
                {
                    "ID": 7,
                    "name": "Sunday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 7
                }
            ]
        }
    })

    it('should calculate average quality of sleep for all time', () => {
        let sleepAvg = getAverageQuality(sleepData)
        expect(sleepAvg).to.equal(7)
    })

    it('should return an error if no data is provided', () => {
        sleepData = { sleepData: [] }
        let sleepAvg = getAverageQuality(sleepData)
        expect(sleepAvg).to.equal(`No data available.`)
    })

    it('should return a value for just one day', () => {
        sleepData = {
            sleepData: [
                {
                    "ID": 1,
                    "name": "Monday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 7
                }
            ]
        }
        let sleepAvg = getAverageQuality(sleepData)
        expect(sleepAvg).to.equal(7)
    })
})

describe('Get Daily Sleep Data', function () {
    let sleepData
    beforeEach(function () {
        sleepData = {
            sleepData: [
                {
                    "date": "1/2/24",
                    "name": "Monday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 7
                },
                {
                    "date": "1/3/24",
                    "name": "Tuesday",
                    "hoursOfSleep": 7,
                    "qualityOfSleep": 6
                },
                {
                    "date": "1/4/24",
                    "name": "Wednesday",
                    "hoursOfSleep": 6,
                    "qualityOfSleep": 8
                },
                {
                    "date": "1/5/24",
                    "name": "Thursday",
                    "hoursOfSleep": 5,
                    "qualityOfSleep": 5
                },
                {
                    "date": "1/6/24",
                    "name": "Friday",
                    "hoursOfSleep": 7,
                    "qualityOfSleep": 7
                },
                {
                    "date": "1/7/24",
                    "name": "Saturday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 9
                },
                {
                    "date": "1/8/24",
                    "name": "Sunday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 7
                }
            ]
        }
    })

    it('should return sleep data for a specified day', () => {
        let specifiedSleep = getDailyHrs(sleepData, '1/8/24')
        expect(specifiedSleep).to.equal(`You slept 8 hours on 1/8/24.`)
    })

    it('should handle an empty sleep request', () => {
        sleepData = { sleepData: [] }
        let specifiedSleep = getDailyHrs(sleepData)
        expect(specifiedSleep).to.equal('No data available.')
    })
})

describe('Get Daily Sleep Quality', function () {
    let sleepData
    beforeEach(function () {
        sleepData = {
            sleepData: [
                {
                    "date": "1/2/24",
                    "name": "Monday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 7
                },
                {
                    "date": "1/3/24",
                    "name": "Tuesday",
                    "hoursOfSleep": 7,
                    "qualityOfSleep": 6
                },
                {
                    "date": "1/4/24",
                    "name": "Wednesday",
                    "hoursOfSleep": 6,
                    "qualityOfSleep": 8
                },
                {
                    "date": "1/5/24",
                    "name": "Thursday",
                    "hoursOfSleep": 5,
                    "qualityOfSleep": 5
                },
                {
                    "date": "1/6/24",
                    "name": "Friday",
                    "hoursOfSleep": 7,
                    "qualityOfSleep": 7
                },
                {
                    "date": "1/7/24",
                    "name": "Saturday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 9
                },
                {
                    "date": "1/8/24",
                    "name": "Sunday",
                    "hoursOfSleep": 8,
                    "qualityOfSleep": 7
                }
            ]
        }
    })

    it('should return sleep quality for a specified day', () => {
        let specifiedSleep = getDailyQuality(sleepData, '1/8/24')
        expect(specifiedSleep).to.equal(`You experienced a sleep quality of 7.`)
    })

    it('should handle an empty sleep request', () => {
        sleepData = { sleepData: [] }
        let specifiedSleep = getDailyQuality(sleepData)
        expect(specifiedSleep).to.equal('No data available.')
    })
})