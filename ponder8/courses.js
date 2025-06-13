// Define the course object
const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  sections: [
    { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Bro T" },
    { sectionNum: 2, roomNum: "STC 347", enrolled: 28, days: "TTh", instructor: "Sis A" }
  ],

  // New method to change enrollment by delta (+1 or -1)
  changeEnrollment: function(sectionNum, delta) {
    const index = this.sections.findIndex(sec => sec.sectionNum === parseInt(sectionNum));
    if (index === -1) {
      console.log("Section not found.");
      return;
    }

    const newCount = this.sections[index].enrolled + delta;
    if (newCount < 0) {
      console.log("Cannot have fewer than 0 students enrolled.");
      return;
    }

    this.sections[index].enrolled = newCount;
    renderSections(this.sections);
  },

  // enrollStudent calls changeEnrollment with +1
  enrollStudent: function(sectionNum) {
    this.changeEnrollment(sectionNum, +1);
  },

  // dropStudent calls changeEnrollment with -1
  dropStudent: function(sectionNum) {
    this.changeEnrollment(sectionNum, -1);
  }
};

// Function to display course info in HTML
function setCourseInfo(course) {
  document.getElementById("courseName").textContent = course.name;
  document.getElementById("courseCode").textContent = course.code;
}

// Function to display sections in the table
function renderSections(sections) {
  const tbody = document.getElementById("sections");
  tbody.innerHTML = ""; // Clear previous rows

  sections.forEach((section) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td>
    `;
    tbody.appendChild(row);
  });
}

// Set up event listeners
document.getElementById("enrollStudent").addEventListener("click", () => {
  const sectionNum = document.getElementById("sectionNumber").value;
  aCourse.enrollStudent(sectionNum);
});

document.getElementById("dropStudent").addEventListener("click", () => {
  const sectionNum = document.getElementById("sectionNumber").value;
  aCourse.dropStudent(sectionNum);
});

// Initialize the page
setCourseInfo(aCourse);
renderSections(aCourse.sections);
