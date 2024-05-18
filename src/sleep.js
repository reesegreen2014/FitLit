import { fetchSleepData } from './apiCalls.js';

function getAverageHrs(userID) {
  return fetchSleepData()
    .then(data => {
      const userData = data.sleepData.filter(d => d.userID === userID);
      if (!userData.length) {
        return `No data available.`;
      } else {
        const allSleepHrs = userData.map(day => day.hoursSlept); // Ensure property name matches the data structure
        const sleepAvg = allSleepHrs.reduce((total, hours) => total + hours, 0);
        return (sleepAvg / userData.length).toFixed(2); // Round to 2 decimal places
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
        const allSleepQuality = userData.map(day => day.sleepQuality); // Ensure property name matches the data structure
        const qualityAvg = allSleepQuality.reduce((total, quality) => total + quality, 0);
        return (qualityAvg / userData.length).toFixed(2); // Round to 2 decimal places
      }
    });
}

export { getAverageHrs, getAverageQuality };



