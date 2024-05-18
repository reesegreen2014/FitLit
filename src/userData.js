import { fetchUsers, fetchActivityData } from './apiCalls.js';

function getUserData(id) {
  return fetchUsers()
    .then(users => {
      const user = users.find(user => user.id === id);
      if (!user) {
        throw new Error('Invalid ID');
      }
      return user;
    });
}

function calculateAverageStepGoal() {
  return fetchActivityData()
    .then(activities => {
      let invalidFound = false;
      const totalSteps = activities.reduce((acc, activity) => {
        if (activity.numSteps < 0) {
          invalidFound = true;
        }
        acc += activity.numSteps;
        return acc;
      }, 0);
      if (invalidFound) {
        throw new Error('Invalid Step Goal');
      }
      if (!totalSteps) {
        throw new Error('No Activity Information Provided');
      }
      return totalSteps / activities.length;
    });
}

export { getUserData, calculateAverageStepGoal };

