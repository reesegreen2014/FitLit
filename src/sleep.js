function getAverageHrs(userData) {
    if(!userData.sleepData.length) {
        return `No data available.`
    } else {
    const allSleepHrs = userData.sleepData.map((day) => day.hoursOfSleep)
    const sleepAvg = allSleepHrs.reduce((total, hours) => total + hours, 0)
    return sleepAvg/userData.sleepData.length
    }
}

function getAverageQuality(userData) {
    if(!userData.sleepData.length) {
        return `No data available.`
    } else {
        const allSleepQuality = userData.sleepData.map((day) => day.qualityOfSleep)
        const qualityAvg = allSleepQuality.reduce((total, hours) => total + hours, 0)
        return qualityAvg/userData.sleepData.length
    }
}