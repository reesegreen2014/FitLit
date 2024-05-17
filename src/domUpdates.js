import { getUserData, calculateAverageStepGoal } from './userData.js';
import { calculateDailyFluidOunces } from './hydrationData.js';
import users from './data/users.js';
import hydrationData from './data/hydration.js';

const userInfo = document.querySelector('#userInfo');
const userName = document.querySelector('.userFirstName');
const stepGoal = document.querySelector('#stepGoalComparison');
const waterConsumptionElement = document.querySelector('#waterConsumption');

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
  displayWaterConsumptionToday(id)
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
}

function getCurrentDate(id) {
  const userHydrationData = hydrationData.hydrationData.filter(data => data.userID === id);
  if (userHydrationData.length > 0) {
    userHydrationData.sort((a, b) => (b.date) - (a.date));
    const mostRecentDate = userHydrationData[0].date; 
    return mostRecentDate;
  } else {
    return null;
  }
}

function displayWaterConsumptionToday(id) {
  const currentDate = getCurrentDate(id);
  const waterConsumedToday = calculateDailyFluidOunces(id, currentDate, hydrationData);
  if (waterConsumedToday !== undefined) {
    waterConsumptionElement.innerText = `Water consumed today: ${waterConsumedToday}`;
  } else {
    waterConsumptionElement.innerText = "Water consumed today: No data found for the specified user and date.";
  }
}

displayWaterConsumptionToday();

addEventListener('load', displayRandomUser);

export { getRandomIndex, displayRandomUser, displayStepGoal, displayWaterConsumptionToday };
