import hydrationData from '../src/data/hydration.js';

function calculateAverageFluidOunces(id, hydrationDataObject) {
    const hydrationData = hydrationDataObject.hydrationData;
        if (hydrationData.length === 0){
            return 0;
        }
    const userHydrationData = hydrationData.filter(data => data.userID === id);
        if (userHydrationData.length === 0){
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
    if (userHydrationData.length === 0) {
        return "No data found for the specified user and date.";
    }
    const totalFluidOunces = userHydrationData.reduce((total, data) => total + data.numOunces, 0);
    return totalFluidOunces;
}
console.log(`Fluid ounces for user 1 on 2023/03/24:`, calculateDailyFluidOunces(1, '2023/03/24', hydrationData));



export { calculateAverageFluidOunces, calculateDailyFluidOunces };


