
import { assert, expect } from 'chai';
const { getUserData, calculateAverageStepGoal } = require('../src/userData.js');


describe('User Repository', () => {
  it('should run tests', function () {
    expect(true).to.equal(true);
  });
});


describe('user ID function', function () {
  let user1, user2, user3, userArray
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

});


describe('getAverageStepGoal', () => {
  let user1, user2, user3, user4, user5, userArray
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
    user4 = {
      "id": 12,
      "name": "Jacinthe Prosacco",
      "address": "9149 Kamille Brook, Josiannehaven TN 49127-4921",
      "email": "Daniela_Mante86@yahoo.com",
      "strideLength": 3.5,
      "dailyStepGoal": 3000,
      "friends": [
        5,
        17
      ]
    }
    user5 = {
      "id": 17,
      "name": "Amber Thiel",
      "address": "1978 Johnpaul Square, West Amina WA 90912-4707",
      "email": "Randi.Fay@yahoo.com",
      "strideLength": 4.5,
      "dailyStepGoal": 4000,
      "friends": [
        19,
        27,
        9,
        26,
        24
      ]
    }
    userArray = [user1, user2, user3, user4, user5]
  })

  it('should be a function', () => {
    assert.isFunction(calculateAverageStepGoal)
  })

  //empty array
  //one user
  //all users with same step goal
  //all users with different step goals
  //users with extreme step goals
  //non-integer step goals
  //users with negative step goals

  it('should return average steps', () => {
    const average = calculateAverageStepGoal(userArray)
    expect(average).to.equal(6000)
  })

  it('should handle an empty array of users', () => {
    userArray = []
    const average = calculateAverageStepGoal(userArray)
    expect(average).to.equal('No User Information Provided')
  })

  it('should handle all users with same step goal', () => {
    user1 = {
      "id": 1,
      "name": "Trystan Gorczany",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Taurean_Pollich31@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 5000,
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
      "dailyStepGoal": 5000,
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
      "dailyStepGoal": 5000,
      "friends": [
        46,
        48,
        12
      ]
    }
    user4 = {
      "id": 12,
      "name": "Jacinthe Prosacco",
      "address": "9149 Kamille Brook, Josiannehaven TN 49127-4921",
      "email": "Daniela_Mante86@yahoo.com",
      "strideLength": 3.5,
      "dailyStepGoal": 5000,
      "friends": [
        5,
        17
      ]
    }
    user5 = {
      "id": 17,
      "name": "Amber Thiel",
      "address": "1978 Johnpaul Square, West Amina WA 90912-4707",
      "email": "Randi.Fay@yahoo.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        19,
        27,
        9,
        26,
        24
      ]
    }
    userArray = [user1, user2, user3, user4, user5]
    const average = calculateAverageStepGoal(userArray)
    expect(average).to.equal(5000)
  })

//   it('should handle all users with different step goals', () => {
//     user1.dailyStepGoal = 3000;
//     user2.dailyStepGoal = 4000;
//     user3.dailyStepGoal = 5000;
//     user4.dailyStepGoal = 6000;
//     user5.dailyStepGoal = 7000;

//     userArray = [user1, user2, user3, user4, user5];

//     const average = calculateAverageStepGoal(userArray);
//     expect(average).to.equal(5000);  // (3000 + 4000 + 5000 + 6000 + 7000) / 5 = 5000
// });

  it('should handle all users with different step goals', () => {
    user1 = {
      "id": 1,
      "name": "Trystan Gorczany",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Taurean_Pollich31@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 3000,
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
      "dailyStepGoal": 4000,
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
      "dailyStepGoal": 5000,
      "friends": [
        46,
        48,
        12
      ]
    }
    user4 = {
      "id": 12,
      "name": "Jacinthe Prosacco",
      "address": "9149 Kamille Brook, Josiannehaven TN 49127-4921",
      "email": "Daniela_Mante86@yahoo.com",
      "strideLength": 3.5,
      "dailyStepGoal": 6000,
      "friends": [
        5,
        17
      ]
    }
    user5 = {
      "id": 17,
      "name": "Amber Thiel",
      "address": "1978 Johnpaul Square, West Amina WA 90912-4707",
      "email": "Randi.Fay@yahoo.com",
      "strideLength": 4.5,
      "dailyStepGoal": 7000,
      "friends": [
        19,
        27,
        9,
        26,
        24
      ]
    }
    userArray = [user1, user2, user3, user4, user5];
    const average = calculateAverageStepGoal(userArray);
    expect(average).to.equal(5000);
  })


  it('should handle users with extreme step goals', () => {
    user1 = {
      "id": 1,
      "name": "Trystan Gorczany",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Taurean_Pollich31@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 100,
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
      "dailyStepGoal": 50000,
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
    user4 = {
      "id": 12,
      "name": "Jacinthe Prosacco",
      "address": "9149 Kamille Brook, Josiannehaven TN 49127-4921",
      "email": "Daniela_Mante86@yahoo.com",
      "strideLength": 3.5,
      "dailyStepGoal": 500,
      "friends": [
        5,
        17
      ]
    }
    user5 = {
      "id": 17,
      "name": "Amber Thiel",
      "address": "1978 Johnpaul Square, West Amina WA 90912-4707",
      "email": "Randi.Fay@yahoo.com",
      "strideLength": 4.5,
      "dailyStepGoal": 100000,
      "friends": [
        19,
        27,
        9,
        26,
        24
      ]
    }
    userArray = [user1, user2, user3, user4, user5];
    const average = calculateAverageStepGoal(userArray);
    expect(average).to.equal((100 + 50000 + 10000 + 500 + 100000) / 5);
  })

  it('should handle non-integer step goals', () => {
    user1 = {
      "id": 1,
      "name": "Trystan Gorczany",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Taurean_Pollich31@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 2500.75,
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
      "dailyStepGoal": 4000.25,
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
      "dailyStepGoal": 5000,
      "friends": [
        46,
        48,
        12
      ]
    }
    user4 = {
      "id": 12,
      "name": "Jacinthe Prosacco",
      "address": "9149 Kamille Brook, Josiannehaven TN 49127-4921",
      "email": "Daniela_Mante86@yahoo.com",
      "strideLength": 3.5,
      "dailyStepGoal": 3000.50,
      "friends": [
        5,
        17
      ]
    }
    user5 = {
      "id": 17,
      "name": "Amber Thiel",
      "address": "1978 Johnpaul Square, West Amina WA 90912-4707",
      "email": "Randi.Fay@yahoo.com",
      "strideLength": 4.5,
      "dailyStepGoal": 8000,
      "friends": [
        19,
        27,
        9,
        26,
        24
      ]
    }
    userArray = [user1, user2, user3, user4, user5];

    const average = calculateAverageStepGoal(userArray);
    expect(average).to.equal((2500.75 + 4000.25 + 5000 + 3000.50 + 8000) / 5);
  })

  it('should handle negative step goals', () => {
    user1 = {
      "id": 1,
      "name": "Trystan Gorczany",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Taurean_Pollich31@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": -1000,
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
      "dailyStepGoal": 4000.25,
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
      "dailyStepGoal": 5000,
      "friends": [
        46,
        48,
        12
      ]
    }
    user4 = {
      "id": 12,
      "name": "Jacinthe Prosacco",
      "address": "9149 Kamille Brook, Josiannehaven TN 49127-4921",
      "email": "Daniela_Mante86@yahoo.com",
      "strideLength": 3.5,
      "dailyStepGoal": 3000.50,
      "friends": [
        5,
        17
      ]
    }
    user5 = {
      "id": 17,
      "name": "Amber Thiel",
      "address": "1978 Johnpaul Square, West Amina WA 90912-4707",
      "email": "Randi.Fay@yahoo.com",
      "strideLength": 4.5,
      "dailyStepGoal": 8000,
      "friends": [
        19,
        27,
        9,
        26,
        24
      ]
    }
    userArray = [user1, user2, user3, user4, user5];

    const average = calculateAverageStepGoal(userArray);
    expect(average).to.equal('Invalid Step Goal');
  })

});

