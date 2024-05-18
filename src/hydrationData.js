import { fetchHydrationData } from './apiCalls.js';

function calculateAverageFluidOunces(id) {
    return fetchHydrationData()
        .then(data => {
            const hydrationData = data.hydrationData.filter(d => d.userID === id);
            if (hydrationData.length === 0) {
                return 0;
            }
            const totalFluidOunces = hydrationData.reduce((total, data) => total + data.numOunces, 0);
            return totalFluidOunces / hydrationData.length;
        });
}

function calculateDailyFluidOunces(userID, date) {
    return fetchHydrationData()
        .then(data => {
            const hydrationData = data.hydrationData.filter(d => d.userID === userID && d.date === date);
            if (hydrationData.length === 0) {
                return "No data found for the specified user and date.";
            }
            return hydrationData.reduce((total, d) => total + d.numOunces, 0);
        });
}

function calculateWeeklyFluidOunces(id, startDate) {
    return fetchHydrationData()
        .then(data => {
            const hydrationData = data.hydrationData.filter(d => d.userID === id && new Date(d.date) >= new Date(startDate));
            if (hydrationData.length < 7) {
                return `Weekly data not available just yet! Check back soon`;
            }
            return hydrationData.slice(0, 7).map(d => d.numOunces);
        });
}

export { calculateAverageFluidOunces, calculateDailyFluidOunces, calculateWeeklyFluidOunces };