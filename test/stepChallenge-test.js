import { expect } from 'chai';
import { getFriendsSteps, getWinnerOfSteps } from '../src/stepChallenge.js';

describe('Step Challenge Functions', function () {
  let user, users, activityData, currentDate;

  beforeEach(function () {
    user = {
      id: 1,
      friends: [2, 3], 
    };

    users = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      { id: 3, name: 'User 3' },
    ];

    activityData = [
      { userID: 1, date: '2024/06/01', numSteps: 5000 },
      { userID: 2, date: '2024/06/01', numSteps: 6000 },
      { userID: 3, date: '2024/06/01', numSteps: 7000 },
    ];

    currentDate = '2024/06/01';
  });

  it('should return user and friends steps for the current date', function () {
    const result = getFriendsSteps(user, users, activityData, currentDate);
    
    expect(result).to.deep.equal({
      userSteps: 5000,
      friends: [
        { name: 'User 2', steps: 6000 },
        { name: 'User 3', steps: 7000 },
      ],
    });
  });

  it('should handle missing activity data for user and friends', function () {
    activityData = [];
    const result = getFriendsSteps(user, users, activityData, currentDate);
    expect(result).to.deep.equal({
      userSteps: 0, 
      friends: [
        { name: 'User 2', steps: 0 },
        { name: 'User 3', steps: 0 }, 
      ],
    });
  });

  it('should return the winner of steps among user and friends', function () {
    const result = getWinnerOfSteps(5000, [
      { name: 'User 2', steps: 6000 },
      { name: 'User 3', steps: 7000 },
    ]);
    expect(result).to.deep.equal({ name: 'User 3', steps: 7000 });
  });

  it('should handle equal steps among user and friends', function () {
    const result = getWinnerOfSteps(5000, [
      { name: 'User 2', steps: 5000 }, 
      { name: 'User 3', steps: 5000 }, 
    ]);
    expect(result).to.deep.equal({ name: 'You', steps: 5000 });
  });

  it('should handle zero steps for user and friends', function () {
    const result = getWinnerOfSteps(0, [
      { name: 'User 2', steps: 0 },
      { name: 'User 3', steps: 0 },
    ]);
    expect(result).to.deep.equal({ name: '', steps: 0 });
  });
});
