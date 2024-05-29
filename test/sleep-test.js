import { assert, expect } from 'chai';
const { getAverageHrs, getAverageQuality, getDailyHrs, getDailyQuality, getRecentSleep } = require('../src/sleep.js');

let sleepData;

before(function () {
  sleepData = {
    sleepData: [
      {
        "userID": 1,
        "date": "2023/03/24",
        "hoursSlept": 7,
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
        "hoursSlept": 7,
        "sleepQuality": 5
      },
      {
        "userID": 1,
        "date": "2023/03/27",
        "hoursSlept": 8,
        "sleepQuality": 4.7
      },
      {
        "userID": 1,
        "date": "2023/03/28",
        "hoursSlept": 7,
        "sleepQuality": 3.8
      },
      {
        "userID": 1,
        "date": "2023/03/29",
        "hoursSlept": 6,
        "sleepQuality": 3.1
      },
      {
        "userID": 1,
        "date": "2023/03/30",
        "hoursSlept": 7,
        "sleepQuality": 9.1
      }
    ]
  };
});

describe('Get Average Hours Function', function () {
  it('should calculate average hours of sleep for all time', () => {
    const sleepAvg = getAverageHrs(sleepData, 1);
    expect(sleepAvg).to.equal('7.00');
  });

  it('should return an error if no data is provided', () => {
    const sleepAvg = getAverageHrs({ sleepData: [] }, 1);
    expect(sleepAvg).to.equal('No data available.');
  });

  it('should return a value for just one day', () => {
    const singleDayData = {
      sleepData: [
        {
          "userID": 1,
          "date": "2023/03/24",
          "hoursSlept": 8,
          "sleepQuality": 4.7
        }
      ]
    };
    const sleepAvg = getAverageHrs(singleDayData, 1);
    expect(sleepAvg).to.equal('8.00');
  });
});

describe('Get Sleep Quality Average', function () {
  it('should calculate average quality of sleep for all time', () => {
    const sleepAvg = getAverageQuality(sleepData, 1);
    expect(sleepAvg).to.equal('4.89');
  });

  it('should return an error if no data is provided', () => {
    const sleepAvg = getAverageQuality({ sleepData: [] }, 1);
    expect(sleepAvg).to.equal('No data available.');
  });

  it('should return a value for just one day', () => {
    const singleDayData = {
      sleepData: [
        {
          "userID": 1,
          "date": "2023/03/24",
          "hoursSlept": 8,
          "sleepQuality": 4.7
        }
      ]
    };
    const sleepAvg = getAverageQuality(singleDayData, 1);
    expect(sleepAvg).to.equal('4.70');
  });
});

describe('Get Daily Sleep Data', function () {
  it('should return sleep data for a specified day', () => {
    const specifiedSleep = getDailyHrs(sleepData, 1, '2023/03/24');
    expect(specifiedSleep).to.equal('You slept 7 hours on 2023/03/24.');
  });

  it('should handle an empty sleep request', () => {
    const specifiedSleep = getDailyHrs({ sleepData: [] }, 1, '2023/03/24');
    expect(specifiedSleep).to.equal('No data available.');
  });
});

describe('Get Daily Sleep Quality', function () {
  it('should return sleep quality for a specified day', () => {
    const specifiedQuality = getDailyQuality(sleepData, 1, '2023/03/24');
    expect(specifiedQuality).to.equal('You experienced a sleep quality of 4.7 on 2023/03/24.');
  });

  it('should handle an empty sleep request', () => {
    const specifiedQuality = getDailyQuality({ sleepData: [] }, 1, '2023/03/24');
    expect(specifiedQuality).to.equal('No data available.');
  });
});

describe('Get Most Recent Sleep Data', function() {
  it('should return most recent week of sleep data', () => {
    const weekOfSleep = getRecentSleep(sleepData)
    const recentSleep = [
          { date: '2023/03/30', hoursSlept: 7, sleepQuality: 9.1 },
          { date: '2023/03/29', hoursSlept: 6, sleepQuality: 3.1 },
          { date: '2023/03/28', hoursSlept: 7, sleepQuality: 3.8 },
          { date: '2023/03/27', hoursSlept: 8, sleepQuality: 4.7 },
          { date: '2023/03/26', hoursSlept: 7, sleepQuality: 5 },
          { date: '2023/03/25', hoursSlept: 7, sleepQuality: 3.8 },
          { date: '2023/03/24', hoursSlept: 7, sleepQuality: 4.7 }
    ]
    expect(weekOfSleep).to.deep.equal(recentSleep)
  })

  it('should handle empty user data', () => {
    sleepData = []
    const weekOfSleep = getRecentSleep(sleepData)
    expect(weekOfSleep).to.equal('No data available.')
  })

  it('should return all recent data, even if it is less than seven days worth', () => {
    sleepData = {
    sleepData: [
      {
        "userID": 1,
        "date": "2023/03/24",
        "hoursSlept": 7,
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
        "hoursSlept": 7,
        "sleepQuality": 5
      }
    ]
  }
  
    const expectedSleepData = [
      { date: '2023/03/26', hoursSlept: 7, sleepQuality: 5 },
      { date: '2023/03/25', hoursSlept: 7, sleepQuality: 3.8 },
      { date: '2023/03/24', hoursSlept: 7, sleepQuality: 4.7 }
    ]

      const lessThanWeekOfSleep = getRecentSleep(sleepData) 
    expect(lessThanWeekOfSleep).to.deep.equal(expectedSleepData)
  })
})
