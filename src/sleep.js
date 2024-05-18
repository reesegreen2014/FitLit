import { fetchSleepData } from './apiCalls.js';

function getAverageHrs(userID) {
  return fetchSleepData()
    .then(data => {
      const userData = data.sleepData.filter(d => d.userID === userID);
      if (!userData.length) {
        return `No data available.`;
      } else {
        const allSleepHrs = userData.map((day) => day.hoursOfSleep);
        const sleepAvg = allSleepHrs.reduce((total, hours) => total + hours, 0);
        return sleepAvg / userData.length;
      }
    });
}

function getAverageQuality(userID) {
  return fetchSleepData()
    .then(data => {
      const userData = data.sleepData.filter(d => d.userID === userID);
      if (!userData.length) {
        return `No data available.`;
      } else {
        const allSleepQuality = userData.map((day) => day.qualityOfSleep);
        const qualityAvg = allSleepQuality.reduce((total, quality) => total + quality, 0);
        return qualityAvg / userData.length;
      }
    });
}

export { getAverageHrs, getAverageQuality };

