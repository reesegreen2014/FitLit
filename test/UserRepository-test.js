import { assert, expect } from 'chai';
const { getUserData, calculateAverageStepGoal } = require('../src/userData.js');

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
      "friends": [5, 43, 46, 11]
    };
    user2 = {
      "id": 25,
      "name": "Mellie Pacocha",
      "address": "5696 Eliseo Tunnel, North Earnestine KY 04912-9498",
      "email": "Jermey4@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 6000,
      "friends": [21, 46, 47, 19, 41]
    };
    user3 = {
      "id": 50,
      "name": "Karianne Berge",
      "address": "40555 White Knoll, New Christophechester MA 18097",
      "email": "Amy19@yahoo.com",
      "strideLength": 4.5,
      "dailyStepGoal": 10000,
      "friends": [46, 48, 12]
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
    expect(() => getUserData(userArray, 'invalid_id')).to.throw('Invalid ID');
  });

  it('should handle non-existent ID', () => {
    expect(() => getUserData(userArray, 100)).to.throw('Invalid ID');
  });

  it('should handle negative IDs', () => {
    expect(() => getUserData(userArray, -1)).to.throw('Invalid ID');
  });

  it('should handle special characters in IDs', () => {
    expect(() => getUserData(userArray, '!@#$%')).to.throw('Invalid ID');
  });

  it('should test if the id is a number', () => {
    const id = 10;
    expect(id).to.be.a('number');
  });

  it('should return an error if the id is not a number', () => {
    expect(() => getUserData(userArray, 'abc')).to.throw('Invalid ID');
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
    expect(() => calculateAverageStepGoal([])).to.throw('No Activity Information Provided');
  });

  it('should handle invalid step goals', () => {
    activityData.push({ "numSteps": -1000 });
    expect(() => calculateAverageStepGoal(activityData)).to.throw('Invalid Step Goal');
  });
});
