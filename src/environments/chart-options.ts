export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  // We use these empty structures as placeholders for dynamic theming.
  scales: {
    xAxes: [
      {
        ticks: {
          min: 0,
          max: 10,
          stepSize: 1
        }
      }
    ],
    yAxes: [
      {
        offset: true,
        barThickness: 15,
        gridLines: {
          offsetGridLines: true
        },
      }
    ]
  },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};
