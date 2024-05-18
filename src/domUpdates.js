import { getUserData, calculateAverageStepGoal } from './userData.js';
import { calculateDailyFluidOunces } from './hydrationData.js';
import { fetchUsers, fetchHydrationData } from './apiCalls.js';
import { getAverageHrs, getAverageQuality } from './sleep.js';

const userInfo = document.querySelector('#userInfo');
const userName = document.querySelector('.userFirstName');
const stepGoal = document.querySelector('#stepGoalComparisonResult');
const waterConsumptionElement = document.querySelector('#waterConsumption');
const sleepAverageElement = document.querySelector('#sleepAverageResult');
const sleepQualityElement = document.querySelector('#sleepQualityResult');

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
      if (sleepQualityElement) {
        sleepQualityElement.innerText = `${averageQuality}`;
      } else {
        console.error('sleepQualityElement not found');
      }
    })
    .catch(error => console.error('Error displaying average sleep quality:', error));
}

addEventListener('load', displayRandomUser);

export { getRandomIndex, displayRandomUser, displayStepGoal, displayWaterConsumptionToday };


