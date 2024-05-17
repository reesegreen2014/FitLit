import { getUserData, calculateAverageStepGoal } from './userData.js';
import users from './data/users.js';

const userInfo = document.querySelector('#userInfo');
const userName = document.querySelector('.userFirstName');
const stepGoal = document.querySelector('#stepGoalComparison');

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayRandomUser() {
  const randomIndex = getRandomIndex(users.users);
  const { id, strideLength, dailyStepGoal, friends, name } = getUserData(users.users, randomIndex);
  userInfo.innerHTML = `Your information: 
    <p>ID: ${id}, </p>
    <p> Stride Length: ${strideLength}, </p>
    <p> Daily Step Goal: ${dailyStepGoal}, </p>
    <p> Friends: ${getFriendsNames(friends, users.users)}</p>`;
  userName.innerText = `${name}`;
  displayStepGoal(randomIndex, { id, dailyStepGoal });
}

function getFriendsNames(friendsIds, users) {
  const friends = users.filter((user) => friendsIds.includes(user.id));
  return friends.map((friend) => friend.name).join(', ');
}

function displayStepGoal(randomIndex, { id, dailyStepGoal }) {
  const selectedUser = getUserData(users.users, randomIndex);
  const userStepGoal = dailyStepGoal;
  const averageStepGoal = calculateAverageStepGoal(users.users);
  let comparisonMessage = "";

  if (userStepGoal > averageStepGoal) {
    comparisonMessage = "higher";
  } else if (userStepGoal < averageStepGoal) {
    comparisonMessage = "lower";
  }

  stepGoal.innerText = `Your step goal is ${userStepGoal}, while the average for all users is ${averageStepGoal}. Your step goal is ${comparisonMessage} than the average user's.`;

  // Log user info
  console.log("Random User ID:", id);
  console.log("Selected User:", selectedUser);
  console.log("User Step Goal:", userStepGoal);
  console.log("Average Step Goal:", averageStepGoal);
}

addEventListener('load', displayRandomUser);

export { getRandomIndex, displayRandomUser, displayStepGoal };
