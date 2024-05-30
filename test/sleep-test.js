import { assert, expect } from 'chai';
const { getAverageHrs, getAverageQuality, getDailyHrs, getDailyQuality } = require('../src/sleep.js');

describe('Get Average Hours Function', function () {
  let sleepData;
  beforeEach(function () {
    sleepData = [
      {
        "userID": 1,
        "date": "2023/03/24",
        "hoursSlept": 8,
        "sleepQuality": 4.7
      },
      {
        "userID": 1,
        "date": "2023/03/25",
        "hoursSlept": 7,
        "sleepQuality": 3.8
      },
      {
        "userID": 1,
        "date": "2023/03/26",
        "hoursSlept": 6,
        "sleepQuality": 2.1
      }
    ];
  });

  it('should calculate average hours of sleep for all time', () => {
    const sleepAvg = getAverageHrs(sleepData, 1);
    expect(sleepAvg).to.equal('7.00');
  });

  it('should return an error if no data is provided', () => {
    const sleepAvg = getAverageHrs([], 1);
    expect(sleepAvg).to.equal('No data available.');
  });

  it('should return a value for just one day', () => {
    const singleDayData = [
      {
        "userID": 1,
        "date": "2023/03/24",
        "hoursSlept": 8,
        "sleepQuality": 4.7
      }
    ];
    const sleepAvg = getAverageHrs(singleDayData, 1);
    expect(sleepAvg).to.equal('8.00');
  });
});

describe('Get Sleep Quality Average', function () {
  let sleepData;
  beforeEach(function () {
    sleepData = [
      {
        "userID": 1,
        "date": "2023/03/24",
        "hoursSlept": 8,
        "sleepQuality": 4.7
      },
      {
        "userID": 1,
        "date": "2023/03/25",
        "hoursSlept": 7,
        "sleepQuality": 3.8
      },
      {
        "userID": 1,
        "date": "2023/03/26",
        "hoursSlept": 6,
        "sleepQuality": 2.1
      }
    ];
  });

  it('should calculate average quality of sleep for all time', () => {
    const sleepAvg = getAverageQuality(sleepData, 1);
    expect(sleepAvg).to.equal('3.53');
  });

  it('should return an error if no data is provided', () => {
    const sleepAvg = getAverageQuality([], 1);
    expect(sleepAvg).to.equal('No data available.');
  });

  it('should return a value for just one day', () => {
    const singleDayData = [
      {
        "userID": 1,
        "date": "2023/03/24",
        "hoursSlept": 8,
        "sleepQuality": 4.7
      }
    ];
    const sleepAvg = getAverageQuality(singleDayData, 1);
    expect(sleepAvg).to.equal('4.70');
  });
});

describe('Get Daily Sleep Data', function () {
  let sleepData;
  beforeEach(function () {
    sleepData = [
      {
        "userID": 1,
        "date": "2023/03/24",
        "hoursSlept": 8,
        "sleepQuality": 4.7
      },
      {
        "userID": 1,
        "date": "2023/03/25",
        "hoursSlept": 7,
        "sleepQuality": 3.8
      },
      {
        "userID": 1,
        "date": "2023/03/26",
        "hoursSlept": 6,
        "sleepQuality": 2.1
      }
    ];
  });

  it('should return sleep data for a specified day', () => {
    const specifiedSleep = getDailyHrs(sleepData, 1, '2023/03/24');
    expect(specifiedSleep).to.equal('You slept 8 hours on 2023/03/24.');
  });

  it('should handle an empty sleep request', () => {
    const specifiedSleep = getDailyHrs([], 1, '2023/03/24');
    expect(specifiedSleep).to.equal('No data available.');
  });
});

describe('Get Daily Sleep Quality', function () {
  let sleepData;
  beforeEach(function () {
    sleepData = [
      {
        "userID": 1,
        "date": "2023/03/24",
        "hoursSlept": 8,
        "sleepQuality": 4.7
      },
      {
        "userID": 1,
        "date": "2023/03/25",
        "hoursSlept": 7,
        "sleepQuality": 3.8
      },
      {
        "userID": 1,
        "date": "2023/03/26",
        "hoursSlept": 6,
        "sleepQuality": 2.1
      }
    ];
  });

  it('should return sleep quality for a specified day', () => {
    const specifiedQuality = getDailyQuality(sleepData, 1, '2023/03/24');
    expect(specifiedQuality).to.equal('You experienced a sleep quality of 4.7 on 2023/03/24.');
  });

  it('should handle an empty sleep request', () => {
    const specifiedQuality = getDailyQuality([], 1, '2023/03/24');
    expect(specifiedQuality).to.equal('No data available.');
  });
});

