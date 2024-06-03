function createChart(element,  dataset, chartType) {
    const ctx = element.getContext('2d')
    const data = [];
    const data2 = [];
    dataset.forEach((sleep, index) => {
        data.push({ x: index, y: sleep.hoursSlept });
        data2.push({ x: index, y: sleep.sleepQuality });
    });
  
const totalDuration = 5000;
const delayBetweenPoints = totalDuration / data.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};
const config = {
    type: chartType,
    data: {
      datasets: [{
        borderColor: 'red',
        borderWidth: 1,
        radius: 0,
        data: data,
      },
      {
        borderColor: 'blue',
        borderWidth: 1,
        radius: 0,
        data: data2,
      }]
    },
    options: {
      animation,
      interaction: {
        intersect: false
      },
      plugins: {
        legend: false
      },
      scales: {
        x: {
          type: 'linear'
        }
      }
    }
  };

return new Chart(ctx, config)
}

export {createChart}