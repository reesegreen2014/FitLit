<<<<<<< HEAD
import { getUserData, calculateAverageStepGoal } from './userData.js'
import users from './data/users.js'

const userInfo = document.querySelector('#userInfo')
const userName = document.querySelector('.userFirstName')
const stepGoal = document.querySelector('#stepGoalComparison')
=======
import { getUserData, calculateAverageStepGoal } from './userData.js';
import { calculateDailyFluidOunces } from './hydrationData.js';
import users from './data/users.js';
import hydrationData from './data/hydration.js';
>>>>>>> 8c293d1823f66d8b2eeff7752194292345126c02

const userInfo = document.querySelector('#userInfo');
const userName = document.querySelector('.userFirstName');
const stepGoal = document.querySelector('#stepGoalComparison');
const waterConsumptionElement = document.querySelector('#waterConsumption');

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayRandomUser() {
<<<<<<< HEAD
  let randomIndex = getRandomIndex(users.users)
  let { id, strideLength, dailyStepGoal, friends, name } = getUserData(users.users, randomIndex)
  userInfo.innerHTML = `Your information: 
<p>ID: ${id}, </p>
<p> Stride Length ${strideLength}, </p>
<p> Daily Step Goal ${dailyStepGoal}, </p>
<p> Friends: ${getFriendsNames(friends, users.users)}</p>`
  userName.innerText = `${name}`
  displayStepGoal()
}

function getFriendsNames(friendsIds, users) {
  const friends = users.filter((user) => friendsIds.includes(user.id))
  return friends.map((friend) => friend.name).join(', ')
}

displayRandomUser()
function displayStepGoal() {
  let stepGoalComparison = calculateAverageStepGoal(users.users)
  stepGoal.innerText = `Your step goal compared with all other users: ${stepGoalComparison}`

=======
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
  displayWaterConsumptionLatestWeek(id);
}

function getFriendsNames(friendsIds, users) {
  if (!Array.isArray(friendsIds)) {
    return "No friends found";
  }
  const friends = users.filter((user) => friendsIds.includes(user.id));
  return friends.map((friend) => friend.name).join(', ');
>>>>>>> 8c293d1823f66d8b2eeff7752194292345126c02
}
addEventListener('load', displayRandomUser)

<<<<<<< HEAD
export {
  getRandomIndex, displayRandomUser
}

=======
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

function displayWaterConsumptionLatestWeek(id) {
  const userHydrationData = hydrationData.hydrationData.filter(data => data.userID === id);
  if (userHydrationData.length === 0) {
    waterConsumptionElement.innerText = "No data found for the specified user and date.";
    return;
  }

  userHydrationData.sort((a, b) => new Date(b.date) - new Date(a.date)); 
  const latestWeekDates = [];
  const today = new Date(userHydrationData[0].date); 

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if(month < 10) {
      month = '0' + month;
    }
    let day = date.getDate(); 
    if (day < 10) { 
      day = "0" + day;
    }
    latestWeekDates.push(`${year}/${month}/${day}`);
  }

  let waterConsumptionText = '';
  latestWeekDates.forEach(date => {
    const waterConsumed = calculateDailyFluidOunces(id, date, hydrationData);
    waterConsumptionText += `${date}: ${waterConsumed !== "No data found for the specified user and date." ? waterConsumed + ' ounces' : 'No data found'}\n`;
  });
  waterConsumptionElement.innerText = waterConsumptionText;
}

displayWaterConsumptionToday();
displayWaterConsumptionLatestWeek();

addEventListener('load', displayRandomUser);

export { getRandomIndex, displayRandomUser, displayStepGoal, displayWaterConsumptionToday };
>>>>>>> 8c293d1823f66d8b2eeff7752194292345126c02
