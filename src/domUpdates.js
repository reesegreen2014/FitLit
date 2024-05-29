import { getUserData, calculateAverageStepGoal } from './userData.js';
import { calculateDailyFluidOunces, calculateWeeklyFluidOunces } from './hydrationData.js';
import { fetchUsers, fetchHydrationData, fetchSleepData, fetchActivityData } from './apiCalls.js';
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

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayRandomUser() {
  fetchUsers()
    .then(users => {
      const randomIndex = getRandomIndex(users);
      const user = users[randomIndex];
      const { id, strideLength, dailyStepGoal, friends, name } = user;
      userInfo.innerHTML = `<h2>Your information:</h2>
        <p><h4>Stride Length:</h4> ${strideLength}</p>
        <p><h4>Daily Step Goal:</h4> ${dailyStepGoal}</p>
        <p><h4>Friends:</h4> ${getFriendsNames(friends, users)}</p>`;
      userName.innerText = `${name}`;
      displayStepGoal(user);
      displayWaterConsumptionToday(id);
      displayWaterConsumptionLatestWeek(id);
      displayAverageSleepHours(id);
      displayAverageSleepQuality(id);
      getCurrentDate(id).then(date => {
        displayDailySleepHours(id, date);
        displayDailySleepQuality(id, date);
      });
      displayRecentSleep(id);  // Added to display weekly sleep data
    })
    .catch(error => console.error('Error displaying random user:', error));
}

function getFriendsNames(friendsIds, users) {
  if (!Array.isArray(friendsIds)) {
    return "No friends found";
  }
  const friends = users.filter((user) => friendsIds.includes(user.id));
  return friends.map((friend) => friend.name).join(', ');
}

function displayStepGoal(user) {
  fetchActivityData()
    .then(activityData => {
      const averageStepGoal = calculateAverageStepGoal(activityData);
      const userStepGoal = user.dailyStepGoal;
      let comparisonMessage = "";
      if (userStepGoal > averageStepGoal) {
        comparisonMessage = "higher";
      } else if (userStepGoal < averageStepGoal) {
        comparisonMessage = "lower";
      }
      stepGoal.innerText = `Your step goal is ${userStepGoal}, while the average for all users is ${averageStepGoal}. Your step goal is ${comparisonMessage} than the average user's.`;
    })
    .catch(error => console.error('Error displaying step goal:', error));
}

function getCurrentDate(id) {
  return fetchHydrationData()
    .then(hydrationData => {
      const userHydrationData = hydrationData.hydrationData.filter(data => data.userID === id);
      if (userHydrationData.length) {
        userHydrationData.sort((a, b) => new Date(b.date) - new Date(a.date));
        const mostRecentDate = userHydrationData[0].date; 
        console.log(`Most recent date for user ${id}: ${mostRecentDate}`);
        return mostRecentDate;
      } else {
        return null;
      }
    });
}

function displayWaterConsumptionToday(id) {
  fetchHydrationData()
    .then(hydrationData => {
      return getCurrentDate(id).then(currentDate => {
        if (currentDate) {
          return calculateDailyFluidOunces(hydrationData, id, currentDate);
        } else {
          return "No data found for the specified user and date.";
        }
      });
    })
    .then(waterConsumedToday => {
      if (waterConsumedToday !== undefined) {
        waterConsumptionTodayElement.innerHTML = `<h3>Water Consumed Today:</h3><p>${waterConsumedToday} ounces</p>`;
      } else {
        waterConsumptionTodayElement.innerHTML = "<h3>Water Consumed Today:</h3><p>No data found for the specified user and date.</p>";
      }
    })
    .catch(error => console.error('Error displaying water consumption today:', error));
}

function displayWaterConsumptionLatestWeek(id) {
  fetchHydrationData()
    .then(hydrationData => {
      return getCurrentDate(id).then(currentDate => {
        if (currentDate) {
          const weeklyOunces = calculateWeeklyFluidOunces(hydrationData, id, currentDate);
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
      });
    })
    .catch(error => console.error('Error displaying water consumption latest week:', error));
}

function displayAverageSleepHours(userID) {
  fetchSleepData()
    .then(sleepData => {
      const averageHrs = getAverageHrs(sleepData, userID);
      console.log(`Average sleep hours for user ${userID}: ${averageHrs}`);
      if (sleepAverageElement) {
        sleepAverageElement.innerText = `${averageHrs}`;
      } else {
        console.error('sleepAverageElement not found');
      }
    })
    .catch(error => console.error('Error displaying average sleep hours:', error));
}

function displayAverageSleepQuality(userID) {
  fetchSleepData()
    .then(sleepData => {
      const averageQuality = getAverageQuality(sleepData, userID);
      console.log(`Average sleep quality for user ${userID}: ${averageQuality}`);
      if (sleepQualityElement) {
        sleepQualityElement.innerText = `${averageQuality}`;
      } else {
        console.error('sleepQualityElement not found');
      }
    })
    .catch(error => console.error('Error displaying average sleep quality:', error));
}

function displayDailySleepHours(userID, date) {
  fetchSleepData()
    .then(sleepData => {
      const sleepMessage = getDailyHrs(sleepData, userID, date);
      console.log(`Daily sleep hours for user ${userID} on ${date}: ${sleepMessage}`);
      if (dailySleepHoursElement) {
        dailySleepHoursElement.innerText = sleepMessage;
      } else {
        console.error('dailySleepHoursElement not found');
      }
    })
    .catch(error => console.error('Error displaying daily sleep hours:', error));
}

function displayDailySleepQuality(userID, date) {
  fetchSleepData()
    .then(sleepData => {
      const qualityMessage = getDailyQuality(sleepData, userID, date);
      console.log(`Daily sleep quality for user ${userID} on ${date}: ${qualityMessage}`);
      if (dailySleepQualityElement) {
        dailySleepQualityElement.innerText = qualityMessage;
      } else {
        console.error('dailySleepQualityElement not found');
      }
    })
    .catch(error => console.error('Error displaying daily sleep quality:', error));
}

function displayRecentSleep(userID) {
  fetchSleepData()
    .then(sleepData => {
      if (!sleepData || sleepData === 'No data available') {
        weeklySleepDataElement.innerText = 'No data available.'
        return
      }
      const recentSleep = getRecentSleep({sleepData: sleepData.sleepData, userID: userID});
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
    })
    .catch(error => {
      weeklySleepDataElement.innerText = 'Error loading data';
      console.error('Error processing data', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const welcomeOverlay = document.querySelector('.welcome-overlay');
  setTimeout(() => {
    welcomeOverlay.classList.add('fade-out');
  }, 6000); 
});

addEventListener('load', displayRandomUser);

export { getRandomIndex, displayRandomUser, displayStepGoal, displayWaterConsumptionToday, displayRecentSleep };
