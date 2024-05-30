// hydrationData.js

function calculateAverageFluidOunces(data, id) {
  const hydrationData = data.hydrationData.filter(d => d.userID === id);
  if (hydrationData.length === 0) {
    return 0;
  }
  const totalFluidOunces = hydrationData.reduce((total, data) => total + data.numOunces, 0);
  return totalFluidOunces / hydrationData.length;
}

function calculateDailyFluidOunces(data, userID, date) {
  const hydrationData = data.hydrationData.filter(d => d.userID === userID && d.date === date);
  if (hydrationData.length === 0) {
    return "No data found for the specified user and date.";
  }
  return hydrationData.reduce((total, d) => total + d.numOunces, 0);
}

function calculateWeeklyFluidOunces(data, id, endDate) {
  const end = new Date(endDate);
  const start = new Date(end);
  start.setDate(end.getDate() - 6);

  const hydrationData = data.hydrationData.filter(d => {
    const date = new Date(d.date);
    return d.userID === id && date >= start && date <= end;
  });

  if (hydrationData.length < 7) {
    return "Weekly data not available just yet! Check back soon.";
  }

  hydrationData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return hydrationData.map(d => d.numOunces);
}

export { calculateAverageFluidOunces, calculateDailyFluidOunces, calculateWeeklyFluidOunces };

