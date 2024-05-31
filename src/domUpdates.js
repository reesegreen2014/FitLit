import { getUserData, calculateAverageStepGoal } from './userData.js';
import { calculateDailyFluidOunces, calculateWeeklyFluidOunces } from './hydrationData.js';
import { fetchUsers, fetchHydrationData, fetchSleepData, fetchActivityData, postHydrationData, postSleepData } from './apiCalls.js';
import { getAverageHrs, getAverageQuality, getDailyHrs, getDailyQuality, getRecentSleep } from './sleep.js';

const userInfo = document.querySelector('#userInfo');
const userName = document.querySelector('.userFirstName');
const stepGoal = document.querySelector('#stepGoalComparisonResult');
const waterConsumptionTodayElement = document.querySelector('#waterConsumptionToday');
const waterConsumptionWeekElement = document.querySelector('#waterConsumptionWeek');
const sleepAverageElement = document.querySelector('#sleepAverageResult');
const sleepQualityElement = document.querySelector('#sleepQualityResult');
const dailySleepHoursElement = document.querySelector('#dailySleepHoursResult');
const dailySleepQualityElement = document.querySelector('#dailySleepQualityResult');
const weeklySleepDataElement = document.querySelector('#weeklySleepDataResult');
const errorMessageElement = document.querySelector('#errorMessage');

document.getElementById('logStepGoalForm').addEventListener('submit', logStepGoal);
document.getElementById('logWaterConsumptionForm').addEventListener('submit', logWaterConsumption);
document.getElementById('logSleepHoursForm').addEventListener('submit', logSleepHours);
document.getElementById('logWeeklySleepForm').addEventListener('submit', logWeeklySleep);

let currentUser;

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayRandomUser() {
  loadData()
    .then(([users, hydrationData, activityData, sleepData]) => {
      const randomIndex = getRandomIndex(users);
      const user = users[randomIndex];
      currentUser = user;
      const { id, strideLength, dailyStepGoal, friends, name } = user;

      userInfo.innerHTML = `<h2>Your information:</h2>
        <p><h4>Stride Length:</h4> ${strideLength}</p>
        <p><h4>Daily Step Goal:</h4> ${dailyStepGoal}</p>
        <p><h4>Friends:</h4> ${getFriendsNames(friends, users)}</p>`;
      userName.innerText = `${name}`;

      displayStepGoal(user, activityData);
      const currentDate = getCurrentDate(hydrationData, id);
      displayWaterConsumptionToday(hydrationData, id, currentDate);
      displayWaterConsumptionLatestWeek(hydrationData, id, currentDate);
      displayAverageSleepHours(sleepData, id);
      displayAverageSleepQuality(sleepData, id);
      displayDailySleepHours(sleepData, id, currentDate);
      displayDailySleepQuality(sleepData, id, currentDate);
      displayRecentSleep(sleepData, id);
    })
    .catch(error => {
      console.error('Error displaying random user:', error);
      displayError('An error occurred while loading user data. Please try again later.');
    });
}

function loadData() {
  return Promise.all([fetchUsers(), fetchHydrationData(), fetchActivityData(), fetchSleepData()]);
}

function displayError(message) {
  errorMessageElement.innerText = message;
  errorMessageElement.style.display = 'block';
}

function getFriendsNames(friendsIds, users) {
  if (!Array.isArray(friendsIds)) {
    return "No friends found";
  }
  const friends = users.filter((user) => friendsIds.includes(user.id));
  return friends.map((friend) => friend.name).join(', ');
}

function displayStepGoal(user, activityData) {
  try {
    const averageStepGoal = calculateAverageStepGoal(activityData);
    const userStepGoal = user.dailyStepGoal;
    let comparisonMessage = "";
    if (userStepGoal > averageStepGoal) {
      comparisonMessage = "higher";
    } else if (userStepGoal < averageStepGoal) {
      comparisonMessage = "lower";
    }
    stepGoal.innerText = `Your step goal is ${userStepGoal}, while the average for all users is ${averageStepGoal}. Your step goal is ${comparisonMessage} than the average user's.`;
  } catch (error) {
    console.error('Error displaying step goal:', error);
    displayError('An error occurred while calculating step goals. Please try again later.');
  }
}

function getCurrentDate(hydrationData, id) {
  const userHydrationData = hydrationData.filter(data => data.userID === id);
  if (userHydrationData.length) {
    userHydrationData.sort((a, b) => new Date(b.date) - new Date(a.date));
    return userHydrationData[0].date;
  } else {
    return null;
  }
}

function displayWaterConsumptionToday(hydrationData, id, currentDate) {
  try {
    if (currentDate) {
      const waterConsumedToday = calculateDailyFluidOunces({ hydrationData }, id, currentDate);
      if (waterConsumedToday !== undefined) {
        waterConsumptionTodayElement.innerHTML = `<h3>Water Consumed Today:</h3><p>${waterConsumedToday} ounces</p>`;
      } else {
        waterConsumptionTodayElement.innerHTML = "<h3>Water Consumed Today:</h3><p>No data found for the specified user and date.</p>";
      }
    } else {
      waterConsumptionTodayElement.innerHTML = "<h3>Water Consumed Today:</h3><p>No data found for the specified user and date.</p>";
    }
  } catch (error) {
    console.error('Error displaying water consumption today:', error);
    displayError('An error occurred while displaying water consumption data. Please try again later.');
  }
}

function displayWaterConsumptionLatestWeek(hydrationData, id, currentDate) {
  try {
    if (currentDate) {
      const weeklyOunces = calculateWeeklyFluidOunces({ hydrationData }, id, currentDate);
      if (typeof weeklyOunces === 'string') {
        waterConsumptionWeekElement.innerHTML = `<h3>Weekly Water Consumption:</h3><p>${weeklyOunces}</p>`;
      } else {
        let waterConsumptionText = '<h3>Weekly Water Consumption:</h3>';
        weeklyOunces.forEach((ounces, index) => {
          const dayDate = new Date(currentDate);
          dayDate.setDate(dayDate.getDate() - 6 + index);
          const formattedDate = dayDate.toDateString();
          waterConsumptionText += `<p>${formattedDate}: ${ounces} ounces</p>`;
        });
        waterConsumptionWeekElement.innerHTML = waterConsumptionText;
      }
    } else {
      waterConsumptionWeekElement.innerHTML = "<h3>Weekly Water Consumption:</h3><p>Weekly data not available just yet! Check back soon.</p>";
    }
  } catch (error) {
    console.error('Error displaying water consumption latest week:', error);
    displayError('An error occurred while displaying weekly water consumption data. Please try again later.');
  }
}

function displayAverageSleepHours(sleepData, userID) {
  try {
    const averageHrs = getAverageHrs(sleepData, userID);
    sleepAverageElement.innerText = `${averageHrs}`;
  } catch (error) {
    console.error('Error displaying average sleep hours:', error);
    displayError('An error occurred while calculating average sleep hours. Please try again later.');
  }
}

function displayAverageSleepQuality(sleepData, userID) {
  try {
    const averageQuality = getAverageQuality(sleepData, userID);
    sleepQualityElement.innerText = `${averageQuality}`;
  } catch (error) {
    console.error('Error displaying average sleep quality:', error);
    displayError('An error occurred while calculating average sleep quality. Please try again later.');
  }
}

function displayDailySleepHours(sleepData, userID, date) {
  try {
    const sleepMessage = getDailyHrs(sleepData, userID, date);
    dailySleepHoursElement.innerText = sleepMessage;
  } catch (error) {
    console.error('Error displaying daily sleep hours:', error);
    displayError('An error occurred while displaying daily sleep hours. Please try again later.');
  }
}

function displayDailySleepQuality(sleepData, userID, date) {
  try {
    const qualityMessage = getDailyQuality(sleepData, userID, date);
    dailySleepQualityElement.innerText = qualityMessage;
  } catch (error) {
    console.error('Error displaying daily sleep quality:', error);
    displayError('An error occurred while displaying daily sleep quality. Please try again later.');
  }
}

function displayRecentSleep(sleepData, userID) {
  try {
    const recentSleep = getRecentSleep({ sleepData, userID });
    if (recentSleep.length === 0) {
      weeklySleepDataElement.innerHTML = 'No recent sleep data available.';
      return;
    }
    weeklySleepDataElement.innerHTML = recentSleep.map(sleep => `
      <div class="sleep-entry">
        <p>Date: ${sleep.date}</p>
        <p>Hours Slept: ${sleep.hoursSlept}</p>
        <p>Sleep Quality: ${sleep.sleepQuality}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error displaying recent sleep:', error);
    weeklySleepDataElement.innerText = 'Error loading data';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const welcomeOverlay = document.querySelector('.welcome-overlay');
  setTimeout(() => {
    welcomeOverlay.classList.add('fade-out');
  }, 6000); 
});

addEventListener('load', displayRandomUser);

function logStepGoal(event) {
  event.preventDefault();
  const date = event.target.elements.stepGoalDate.value;
  const value = event.target.elements.stepGoalValue.value;
  
}

function logWaterConsumption(event) {
  event.preventDefault();
  const date = event.target.elements.waterConsumptionDate.value;
  const value = event.target.elements.waterConsumptionValue.value;
  const userID = currentUser.id; 

  postHydrationData(userID, date, value)
  .then(hydrationData => {
    console.log('Hydration data successfully logged:', hydrationData);
    const currentDate = getCurrentDate(hydrationData, userID);
    displayWaterConsumptionToday(hydrationData, userID, currentDate);
    displayWaterConsumptionLatestWeek(hydrationData, userID, currentDate);
  })
  .catch(error => {
    console.error('Error logging hydration data:', error);
  });
}


function logSleepHours(event) {
  event.preventDefault();
  const date = event.target.elements.sleepHoursDate.value;
  const hoursSlept = event.target.elements.sleepHoursValue.value;
  const sleepQuality = event.target.elements.sleepQualityValue.value;
  const userID = currentUser.id;
  
  postSleepData(userID, date, hoursSlept, sleepQuality)
  .then(sleepData => {
    console.log('Sleep data logged successfully:', sleepData)
    const currentDate = getCurrentDate(sleepData, userID)
    displayDailySleepHours(sleepData, userID, date);
    displayDailySleepQuality(sleepData, userID, date);
    displayAverageSleepHours(sleepData, userID);
    displayAverageSleepQuality(sleepData, userID);
    displayRecentSleep(sleepData, userID);
  })
  .catch(error => {
    console.error('Error logging sleep data:', error);
      displayError('An error occurred while logging sleep data. Please try again later.');
  });
}

function logWeeklySleep(event) {
  event.preventDefault();
  const date = event.target.elements.weeklySleepDate.value;
  const value = event.target.elements.weeklySleepValue.value;
  
}

export { getRandomIndex, displayRandomUser, displayStepGoal, displayWaterConsumptionToday, displayRecentSleep };



