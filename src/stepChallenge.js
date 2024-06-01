function getFriendsSteps(user, users, activityData, currentDate) {
    const userActivity = activityData.find(activity => activity.userID === user.id && activity.date === currentDate);
    let userSteps;
    if (userActivity) {
      userSteps = userActivity.numSteps;
    } else {
      userSteps = 0;
    }
    const friendsSteps = user.friends.map(friendId => {
      const friend = users.find(user => user.id === friendId);
      let friendName;
      if (friend) {
        friendName = friend.name;
      } else {
        friendName = 'Unknown';
      }
      const friendActivity = activityData.find(activity => activity.userID === friendId && activity.date === currentDate);
      let friendSteps;
      if (friendActivity) {
        friendSteps = friendActivity.numSteps;
      } else {
        friendSteps = 0;
      }
      return {
        name: friendName,
        steps: friendSteps
      };
    });
    return { userSteps, friends: friendsSteps };
  }
  
  function getWinnerOfSteps(userSteps, friendsSteps) {
    const allUsers = [{ name: 'You', steps: userSteps }];
    friendsSteps.forEach(friend => {
      allUsers.push({ name: friend.name, steps: friend.steps });
    });
    const highestStepUser = allUsers.reduce((acc, currentUser) => {
      if (currentUser.steps > acc.steps) {
        return currentUser;
      }
      return acc;
    }, { name: '', steps: 0 });
    return highestStepUser;
  }
  
export {getFriendsSteps, getWinnerOfSteps}