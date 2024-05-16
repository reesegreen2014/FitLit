function calculateAverageFluidOunces(id, hydrationDataObject) {
    const hydrationData = hydrationDataObject.hydrationData;
    const userHydrationData = hydrationData.filter(data => data.userID === id);
    const totalFluidOunces = userHydrationData.reduce((total, data) => total + data.numOunces, 0);
    const averageFluidOunces = totalFluidOunces / userHydrationData.length;
    return averageFluidOunces;
}

console.log(calculateAverageFluidOunces(4, hydrationData));


module.exports = { calculateAverageFluidOunces };