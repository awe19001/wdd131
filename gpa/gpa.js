// 1. Get grades from input, clean, and return array
function getGrades(inputSelector) {
  const grades = document.querySelector(inputSelector).value;
  const gradesArray = grades.split(",");
  const cleanGrades = gradesArray.map(grade => grade.trim().toUpperCase());
  console.log(cleanGrades); // Useful for debugging/testing
  return cleanGrades;
}

// 2. Convert letter grade to GPA points (no + or - grades)
function lookupGrade(grade) {
  let points = 0;
  if (grade === "A") {
    points = 4;
  } else if (grade === "B") {
    points = 3;
  } else if (grade === "C") {
    points = 2;
  } else if (grade === "D") {
    points = 1;
  }
  return points;
}

// 3. Calculate GPA from array of grades using lookupGrade
function calculateGpa(grades) {
  const gradePoints = grades.map(grade => lookupGrade(grade));
  const gpa = gradePoints.reduce((total, num) => total + num, 0) / gradePoints.length;
  return gpa.toFixed(2); // Round to 2 decimals as string
}

// 4. Output the GPA in the specified HTML element
function outputGpa(gpa, selector) {
  const outputElement = document.querySelector(selector);
  outputElement.innerText = gpa;
}

// 5. Handle click: get grades, calculate GPA, display result
function clickHandler() {
  const grades = getGrades("#grades");
  const gpa = calculateGpa(grades);
  outputGpa(gpa, "#output");
}

// 6. Attach event listener to button
document.querySelector("#submitButton").addEventListener("click", clickHandler);
