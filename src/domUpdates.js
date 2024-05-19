import { getUserData, calculateAverageStepGoal } from './userData.js';
import { calculateDailyFluidOunces } from './hydrationData.js';
import { fetchUsers, fetchHydrationData, fetchSleepData } from './apiCalls.js';
import { getAverageHrs, getAverageQuality, getDailyHrs, getDailyQuality } from './sleep.js';

const userInfo = document.querySelector('#userInfo');
const userName = document.querySelector('.userFirstName');
const stepGoal = document.querySelector('#stepGoalComparisonResult');
const waterConsumptionElement = document.querySelector('#waterConsumption');
const sleepAverageElement = document.querySelector('#sleepAverageResult');
const sleepQualityElement = document.querySelector('#sleepQualityResult');
const dailySleepHoursElement = document.querySelector('#dailySleepHoursResult');
const dailySleepQualityElement = document.querySelector('#dailySleepQualityResult');

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayRandomUser() {
  fetchUsers()
    .then(users => {
      const randomIndex = getRandomIndex(users);
      const { id, strideLength, dailyStepGoal, friends, name } = users[randomIndex];
      userInfo.innerHTML = `Your information: 
        <p>ID: ${id}</p>
        <p>Stride Length: ${strideLength}</p>
        <p>Daily Step Goal: ${dailyStepGoal}</p>
        <p>Friends: ${getFriendsNames(friends, users)}</p>`;
      userName.innerText = `${name}`;
      displayStepGoal(dailyStepGoal);
      displayWaterConsumptionToday(id);
      displayWaterConsumptionLatestWeek(id);
      displayAverageSleepHours(id);
      displayAverageSleepQuality(id);
      getCurrentDate(id).then(date => {
        console.log(`Displaying daily sleep data for user ${id} on date ${date}`);
        displayDailySleepHours(id, date);
        displayDailySleepQuality(id, date);
      });
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

function displayStepGoal(dailyStepGoal) {
  calculateAverageStepGoal()
    .then(averageStepGoal => {
      const userStepGoal = dailyStepGoal;
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
  getCurrentDate(id)
    .then(currentDate => calculateDailyFluidOunces(id, currentDate))
    .then(waterConsumedToday => {
      if (waterConsumedToday !== undefined) {
        waterConsumptionElement.innerText = `Water consumed today: ${waterConsumedToday}`;
      } else {
        waterConsumptionElement.innerText = "Water consumed today: No data found for the specified user and date.";
      }
    })
    .catch(error => console.error('Error displaying water consumption today:', error));
}

function displayWaterConsumptionLatestWeek(id) {
  fetchHydrationData()
    .then(hydrationData => {
      const userHydrationData = hydrationData.hydrationData.filter(data => data.userID === id);
      if (!userHydrationData.length) {
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
      Promise.all(latestWeekDates.map(date => calculateDailyFluidOunces(id, date)))
        .then(results => {
          results.forEach((waterConsumed, index) => {
            const date = latestWeekDates[index];
            waterConsumptionText += `${date}: ${waterConsumed !== "No data found for the specified user and date." ? waterConsumed + ' ounces' : 'No data found'}\n`;
          });
          waterConsumptionElement.innerText = waterConsumptionText;
        })
        .catch(error => console.error('Error displaying water consumption latest week:', error));
    });
}

function displayAverageSleepHours(userID) {
  getAverageHrs(userID)
    .then(averageHrs => {
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
  getAverageQuality(userID)
    .then(averageQuality => {
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
  getDailyHrs(userID, date)
    .then(sleepMessage => {
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
  getDailyQuality(userID, date)
    .then(qualityMessage => {
      console.log(`Daily sleep quality for user ${userID} on ${date}: ${qualityMessage}`);
      if (dailySleepQualityElement) {
        dailySleepQualityElement.innerText = qualityMessage;
      } else {
        console.error('dailySleepQualityElement not found');
      }
    })
    .catch(error => console.error('Error displaying daily sleep quality:', error));
}

function updateWaterConsumption(id) {
  if (currentView === 'day') {
    displayWaterConsumptionToday(id);
  } else {
    displayWaterConsumptionLatestWeek(id);
  }
}

toggleButton.addEventListener('click', () => {
  currentView = currentView === 'day' ? 'week' : 'day';
  toggleButton.innerText = currentView === 'day' ? 'Show Weekly Data' : 'Show Daily Data';
  const randomIndex = getRandomIndex(users.users);
  const { id } = getUserData(users.users, randomIndex);
  updateWaterConsumption(id);
});


addEventListener('load', displayRandomUser);

export { getRandomIndex, displayRandomUser, displayStepGoal, displayWaterConsumptionToday };




