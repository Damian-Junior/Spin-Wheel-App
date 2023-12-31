const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const email = document.getElementById("email").value;
const spinnerName = document.getElementById("name").value;
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 36, value: 1, name: "Mummy" },
  { minDegree: 37, maxDegree: 72, value: 2, name: "Aunt" },
  { minDegree: 73, maxDegree: 108, value: 3, name: "Henry" },
  { minDegree: 109, maxDegree: 144, value: 4, name: "Tessy" },
  { minDegree: 145, maxDegree: 180, value: 5, name: "Veronica" },
  { minDegree: 181, maxDegree: 216, value: 6, name: "Emmanuel" },
  { minDegree: 217, maxDegree: 252, value: 7, name: "Suzzan" },
  { minDegree: 253, maxDegree: 288, value: 8, name: "Damian" },
  { minDegree: 287, maxDegree: 324, value: 9, name: "Miracle" },
  { minDegree: 325, maxDegree: 360, value: 10, name: "Favour" },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16, 16, 16, 16, 16];
const selectedNames = [];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#98FB98",
  "#40E0D0",
  "#7FFF00",
  "#FF5733",
];
// numbers to display on the chart 
const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels,
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    // compare name of the spinner to avoid picking self
    if (spinnerName == i.name.toLowerCase()) {
      finalValue.innerHTML = `<p style="color:red;">Spin again; u can't pick urself </p>`;
      break;
    }
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      selectedNames.push(i.value)
      sendEmail(i);
      console.log({selectedNames})
      finalValue.innerHTML = `<p>You picked number: ${i.value} &#x1F60A; </p>`;

      spinBtn.disabled = false;
      
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {

    spinBtn.disabled = true;
    //Empty final value
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
      //Set rotation for piechart
      /*
      Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
      */
      myChart.options.rotation = myChart.options.rotation + resultValue;
      //Update chart with new value;
      myChart.update();
      //If rotation>360 reset it back to 0
      if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation == randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  
});

// function to send mail
function sendEmail({ name }) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "emekamadumere12@gmail.com",
    Password: "0AA3EBBEFA316FD06B72894B8A6AA6EEB35B",
    To: `${email}`,
    From: "emmydollar98@gmail.com",
    Subject: "Christmas buddy",
    Body: `Merry chrismas, pls share the joy of the season by getting a gift for ${name}`,
  }).then(() => alert(`Dear ${spinnerName}, your christmas buddy has been sent to ${email}`));

  return true;
}

//validate name of spinners to match family names
function checkInput() {
  // Get the input element

  // Get the entered value
  var enteredValue = spinnerName.toLowerCase(); // Convert to lowercase for case-insensitive comparison
console.log(enteredValue)
  // Allowed values
  var allowedValues = [
    "Mummy",
    "Aunt",
    "Henry",
    "Tessy",
    "Veronica",
    "Emmanuel",
    "Suzzan",
    "Damian",
    "Miracle",
    "Favour",
    "Aunt",
  ];

  // Check if the entered value is in the allowed values
  if (allowedValues.includes(enteredValue)) {
    // Valid input
    document.getElementById("error").textContent = enteredValue; // Clear error message
  } else {
    // Invalid input
    document.getElementById("error").textContent =
      "This spinner is not allowed";
  }
}
