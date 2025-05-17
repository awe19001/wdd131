// Menu toggle button
function toggleMenu() {
  const nav = document.querySelector(".navbar");
  nav.classList.toggle("open");  // Toggle the "open" class
  const links = nav.querySelectorAll("a");
  
  // Toggle the visibility of the links
  links.forEach(link => {
    if (nav.classList.contains("open")) {
      link.style.display = "block";
    } else {
      link.style.display = "none";
    }
  });
}

// Resize handler to show/hide menu links
function handleResize() {
  const navbar = document.querySelector(".navbar");
  const links = navbar.querySelectorAll("a");

  if (window.innerWidth > 1000) {
    links.forEach(link => link.style.display = "inline-block");
    navbar.classList.remove("open"); // reset state
  } else {
    if (!navbar.classList.contains("open")) {
      links.forEach(link => link.style.display = "none");
    }
  }
}

// Set up event listeners
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");

  menuButton.addEventListener("click", toggleMenu);
  window.addEventListener("resize", handleResize);
  handleResize(); // Run once to adjust visibility on initial load
});



//function toggleMenu() {
//  document.getElementById("navMenu").classList.toggle("active");
//    }

//document.addEventListener("DOMContentLoaded", function () {
//  const menuButton = document.querySelector(".menu-toggle");
//  const navbar = document.querySelector(".navbar");

// menuButton.addEventListener("click", function () {
//   navbar.classList.toggle("open");
// });
// });