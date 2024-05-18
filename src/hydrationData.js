import hydrationData from '../src/data/hydration.js';

function calculateAverageFluidOunces(id, hydrationDataObject) {
    const hydrationData = hydrationDataObject.hydrationData;
        if (!hydrationData.length){
            return 0;
        }
    const userHydrationData = hydrationData.filter(data => data.userID === id);
        if (!userHydrationData.length){
            return 0;
        }
    const totalFluidOunces = userHydrationData.reduce((total, data) => total + data.numOunces, 0);
    const averageFluidOunces = totalFluidOunces / userHydrationData.length;
    return averageFluidOunces;
}

console.log(`Average fluid ounces for yourself:`, calculateAverageFluidOunces(1, hydrationData));


function calculateDailyFluidOunces(userID, date, hydrationDataObject) {
    const hydrationData = hydrationDataObject.hydrationData;
    const userHydrationData = hydrationData.filter(data => data.userID === userID && data.date === date);
    if (!userHydrationData.length) {
        return "No data found for the specified user and date.";
    }
    const totalFluidOunces = userHydrationData.reduce((total, data) => total + data.numOunces, 0);
    return totalFluidOunces;
}
console.log(`Fluid ounces for user 1 on 2023/03/24:`, calculateDailyFluidOunces(1, '2023/03/24', hydrationData));


// Return how many fluid ounces of water a user consumed each day over the course of a week (7 days)
function calculateWeeklyFluidOunces(id, startDate, hydrationDataObject){
    const hydrationData = hydrationDataObject.hydrationData;
    const userHydrationData = hydrationData.filter(data => data.userID === id && data.date >= startDate)
    if (userHydrationData.length === 0) {
        return 'No data found.'
    } else if (userHydrationData.length < 7) {
        return `Weekly data not available just yet! Check back soon`
    } else {
        const weeklyFluidOunces = userHydrationData.slice(0, 7).map(data => data.numOunces)
        return weeklyFluidOunces;
    }
}

console.log('WeeklyFluidOuncesForUser1:', calculateWeeklyFluidOunces(1, '2023/03/01', hydrationData))

export { calculateAverageFluidOunces, calculateDailyFluidOunces, calculateWeeklyFluidOunces };


