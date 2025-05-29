const steps = ["one", "two", "three"];

// 1. Function that turns "one" into "<li>one</li>"
function listTemplate(step) {
  return `<li>${step}</li>`;
}

// 2. Use map to create a new array of HTML list items
const stepsHtml = steps.map(listTemplate); 
// stepsHtml now is: ["<li>one</li>", "<li>two</li>", "<li>three</li>"]

// 3. Insert into the DOM — join them into one string first!
document.querySelector("#myList").innerHTML = stepsHtml.join(""); 


// example 2
const grades = ['A', 'B', 'A'];

function convertToGpa(grade) {
  if (grade === 'A') return 4;
  if (grade === 'B') return 3;
  if (grade === 'C') return 2;
  if (grade === 'D') return 1;
  if (grade === 'F') return 0;
}

const gpaPoints = grades.map(convertToGpa);

// Output Activity 2 to the page
document.querySelector("#gpaOutput").innerHTML = `GPA Points: ${gpaPoints.join(", ")}`;

// Output Activity for developer
console.log("The GPA array is:", gpaPoints);

// Activity 3 - Reduce to get average GPA
const totalGpa = gpaPoints.reduce((total, current) => total + current, 0);
const averageGpa = totalGpa / gpaPoints.length;
document.querySelector("#gpaAverage").innerHTML = `Average GPA: ${averageGpa.toFixed(2)}`;

//Activity 4 Task
const fruits = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

// Use filter to get fruits with less than 6 characters
const smallFruits = fruits.filter(fruit => fruit.length < 6);

// Convert each to a <li> using map
const fruitList = smallFruits.map(fruit => `<li>${fruit}</li>`);

// Insert the list into the page
document.querySelector("#filteredFruits").innerHTML = fruitList.join('');

//Activity 5 Task
const numbers = [12, 34, 21, 54];
const luckyNumber = 21;

const luckyIndex = numbers.indexOf(luckyNumber);

const message = luckyIndex !== -1
  ? `Lucky number ${luckyNumber} found at index ${luckyIndex}`
  : `Lucky number ${luckyNumber} not found in the array.`;

document.querySelector("#luckyResult").innerHTML = message;
