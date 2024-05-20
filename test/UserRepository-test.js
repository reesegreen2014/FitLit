import { assert, expect } from 'chai';
const { getUserData, calculateAverageStepGoal } = require('../src/userData.js');

describe('User Repository', () => {
  it('should run tests', function () {
    expect(true).to.equal(true);
  });
});

describe('user ID function', function () {
  let user1, user2, user3, userArray;
  beforeEach(function () {
    user1 = {
      "id": 1,
      "name": "Trystan Gorczany",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Taurean_Pollich31@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 7000,
      "friends": [
        5,
        43,
        46,
        11
      ]
    };
    user2 = {
      "id": 25,
      "name": "Mellie Pacocha",
      "address": "5696 Eliseo Tunnel, North Earnestine KY 04912-9498",
      "email": "Jermey4@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 6000,
      "friends": [
        21,
        46,
        47,
        19,
        41
      ]
    };
    user3 = {
      "id": 50,
      "name": "Karianne Berge",
      "address": "40555 White Knoll, New Christophechester MA 18097",
      "email": "Amy19@yahoo.com",
      "strideLength": 4.5,
      "dailyStepGoal": 10000,
      "friends": [
        46,
        48,
        12
      ]
    };
    userArray = [user1, user2, user3];
  });

  it('should be a function', () => {
    assert.isFunction(getUserData);
  });

  it('should deliver correct user information', () => {
    const user1Data = getUserData(userArray, 1);
    expect(user1Data).to.deep.equal(user1);
    const user2Data = getUserData(userArray, 25);
    expect(user2Data).to.deep.equal(user2);
    const user3Data = getUserData(userArray, 50);
    expect(user3Data).to.deep.equal(user3);
  });

  it('should handle invalid IDs', () => {
    try {
      getUserData(userArray, 'invalid_id');
    } catch (error) {
      expect(error.message).to.equal('Invalid ID');
    }
  });

  it('should handle non-existent ID', () => {
    try {
      getUserData(userArray, 100);
    } catch (error) {
      expect(error.message).to.equal('Invalid ID');
    }
  });

  it('should handle negative IDs', () => {
    try {
      getUserData(userArray, -1);
    } catch (error) {
      expect(error.message).to.equal('Invalid ID');
    }
  });

  it('should handle special characters in IDs', () => {
    try {
      getUserData(userArray, '!@#$%');
    } catch (error) {
      expect(error.message).to.equal('Invalid ID');
    }
  });

  it('should test if the id is a number', () => {
    const id = 10;
    expect(id).to.be.a('number');
  });

  it('should return an error if the id is not a number', () => {
    try {
      getUserData(userArray, 'abc');
    } catch (error) {
      expect(error.message).to.equal('Invalid ID');
    }
  });
});

describe('getAverageStepGoal', () => {
  let activityData;
  beforeEach(function () {
    activityData = [
      { "numSteps": 7000 },
      { "numSteps": 6000 },
      { "numSteps": 10000 },
      { "numSteps": 3000 },
      { "numSteps": 4000 }
    ];
  });

  it('should be a function', () => {
    assert.isFunction(calculateAverageStepGoal);
  });

  it('should return average steps', () => {
    const expectedAverage = calculateAverageStepGoal(activityData);
    const actualAverage = (7000 + 6000 + 10000 + 3000 + 4000) / 5;
    expect(expectedAverage).to.equal(actualAverage);
  });

  it('should handle an empty array of users', () => {
    const average = calculateAverageStepGoal([]);
    expect(average).to.equal('No Activity Information Provided');
  });

  it('should handle invalid step goals', () => {
    activityData.push({ "numSteps": -1000 });
    try {
      calculateAverageStepGoal(activityData);
    } catch (error) {
      expect(error.message).to.equal('Invalid Step Goal');
    }
  });
});


