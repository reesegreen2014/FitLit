function getUserData(data, id) {
  const user = data.find(user => user.id === id);
  if (!user) {
    throw new Error('Invalid ID');
  }
  return user;
}

function calculateAverageStepGoal(data) {
  let invalidFound = false;
  const totalSteps = data.reduce((acc, activity) => {
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
  return totalSteps / data.length;
}

export { getUserData, calculateAverageStepGoal };

  


