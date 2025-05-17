const PI = 3.14;
//let radius = 3;
//let area = radius * radius * PI;
//console.log("Area with radius 3:", area);

//radius = 4;
//area = radius * radius * PI;
//console.log("Area with radius 4:", area);

let area = 0;

function circleArea(radius) {
  const area = radius * radius * PI;
  return area;
}
area = circleArea(3);
console.log("Area1:", area);   //Logs: Area1: 28.26

area = circleArea(4);
console.log("Area2:", area);  // Logs: Area2: 50.24