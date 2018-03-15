// Load with a sample data set
const dataSet = [
  {
    Label: "Mixmax",
    Value: 10,
    Color: "violet"
  },
  {
    Label: "Foo",
    Value: 5,
    Color: "red"
  },
  {
    Label: "Bar",
    Value: 2,
    Color: "yellow"
  }
];

const ctx = document.getElementById("myChart");
const hotElement = document.querySelector("#hot");
const hotElementContainer = hotElement.parentNode;
const hotSettings = {
  data: dataSet,
  stretchH: "all",
  width: 806,
  autoWrapRow: true,
  height: 487,
  rowHeaders: true,
  minRows: 10,
  colHeaders: ["Label", "Value", "Color"],
  afterChange: renderChart
};
const hot = new Handsontable(hotElement, hotSettings);

var myChart;
var image;
function renderChart() {
  // Remove invalid entries on the data set
  const validDataSet = dataSet.filter(row => {
    const value = parseInt(row.Value, 10);
    return row.Label && value;
  });

  const labels = [];
  const data = [];
  const backgroundColor = [];
  // Create options to feed the chart
  validDataSet.forEach(row => {
    labels.push(row.Label);
    data.push(parseInt(row.Value, 10));
    backgroundColor.push(row.Color);
  });

  if (myChart) {
    // Destroy previous chart instance
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: $("input[name=inlineRadioOptions]:checked").val(),
    data: {
      labels,
      datasets: [
        {
          label: $("#label").val(),
          data,
          borderWidth: 1,
          backgroundColor
        }
      ]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      animation: {
        onComplete: function() {
          // Get image in base64
          image = document.getElementById("myChart").toDataURL("image/jpg");
        }
      }
    }
  });
}

$("input").change(function() {
  renderChart();
});

$("#save").on("click", function() {
  // Resolve with base64
  // TODO: We could resolve with the chart options and generate the image on the server
  Mixmax.done({
    src: image
  });
});

$("#cancel").on("click", function() {
  Mixmax.cancel();
});
