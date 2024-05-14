import { assert, expect } from 'chai';
const { getUserData } = require('../src/scripts.js');

describe('User Repository', () => {
  it('should run tests', function () {
    expect(true).to.equal(true);
  });
});

//ID Tests
// It should find correct user ID
// Should ignore all data from incorrect ID (return msg?)
// Do we want to return the entire object element?
// Should correctly suss out correct/incorrect User ID's 
// Should correctly return any ID's object; beg-mid-end 1-25-50

describe('user ID function', function() {
  let user1, user2, user3, userArray
  beforeEach(function() {
    user1 =  {
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
    }
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
    }
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
    }
    userArray = [user1, user2, user3]
  })

  it('should be a function', () => {
    assert.isFunction(getUserData);
  })

  it('should deliver correct user information', () => {
    const user1Data = getUserData(userArray, 1)
    expect(user1Data).to.deep.equal(user1)
    const user2Data = getUserData(userArray, 25)
    expect(user2Data).to.deep.equal(user2)
    const user3Data = getUserData(userArray, 50)
    expect(user3Data).to.deep.equal(user3)
  });

  it('should handle invalid IDs', () => {
    const invalidId = 'invalid_id'
    const generic = getUserData(userArray, invalidId)
    expect(generic).to.equal('Invalid ID')
  });

  it('should handle non-existent ID', () => {
    const nonExistentId = 100;
    const result = getUserData(userArray, nonExistentId);
    expect(result).to.equal('Invalid ID')
  })

  it('should handle negative IDs', () => {
    const negativeId = -1;
    const result = getUserData(userArray, negativeId);
    expect(result).to.equal('Invalid ID')
  })

  it('should handle special characters in IDs', () => {
    const specialCharId = '!@#$%'; 
    const result = getUserData(userArray, specialCharId);
    expect(result).to.equal('Invalid ID');
  })

  it('should test if the id is a number', () => {
    const id = 10;
    expect(id).to.be.a('number')
  })

  it('should return an error if the id is not a number', () => {
    const notANumber = 'abc'
    const result = getUserData(userArray, notANumber)
    expect(result).to.include('Invalid ID')
  })

})