// sleep.js

function getAverageHrs(data, userID) {
  const userData = data.filter(d => d.userID === userID);
  if (!userData.length) {
    return `No data available.`;
  } else {
    const allSleepHrs = userData.map(day => day.hoursSlept);
    const sleepAvg = allSleepHrs.reduce((total, hours) => total + hours, 0);
    return (sleepAvg / userData.length).toFixed(2);
  }
}

function getAverageQuality(data, userID) {
  const userData = data.filter(d => d.userID === userID);
  if (!userData.length) {
    return `No data available.`;
  } else {
    const allSleepQuality = userData.map(day => day.sleepQuality);
    const qualityAvg = allSleepQuality.reduce((total, quality) => total + quality, 0);
    return (qualityAvg / userData.length).toFixed(2);
  }
}

function getDailyHrs(data, userID, targetDate) {
  const userData = data.filter(d => d.userID === userID);
  if (!userData.length) {
    return `No data available.`;
  }
  const specifiedSleep = userData.find((day) => day.date === targetDate);
  if (specifiedSleep) {
    return `You slept ${specifiedSleep.hoursSlept} hours on ${specifiedSleep.date}.`;
  } else {
    return `No data for today yet! Log your data now.`;
  }
}

function getDailyQuality(data, userID, targetDate) {
  const userData = data.filter(d => d.userID === userID);
  if (!userData.length) {
    return 'No data available.';
  }
  const specifiedQuality = userData.find((day) => day.date === targetDate);
  if (specifiedQuality) {
    return `You experienced a sleep quality of ${specifiedQuality.sleepQuality} on ${specifiedQuality.date}.`;
  } else {
    return 'No data for today yet! Log your data now.';
  }
}

function getRecentSleep({ sleepData, userID }) {
  const userData = sleepData.filter(data => data.userID === userID);
  if (!userData.length) {
    return [];
  }
  const sortedSleep = userData.sort((a, b) => new Date(b.date) - new Date(a.date));
  const mostRecentSleep = sortedSleep.slice(0, 7);
  return mostRecentSleep.map(week => {
    return {
      date: week.date,
      hoursSlept: week.hoursSlept,
      sleepQuality: week.sleepQuality
    };
  });
}

export {
  getAverageHrs,
  getAverageQuality,
  getDailyHrs,
  getDailyQuality,
  getRecentSleep
};







