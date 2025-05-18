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

// Set up event listeners for the menu toggle button
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");

  menuButton.addEventListener("click", toggleMenu);
  window.addEventListener("resize", handleResize);
  handleResize(); // Run once to adjust visibility on initial load
});

///---stop here!----



//---IMAGES----
// Get the elements
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const modal = document.querySelector("#image-viewer");
  const modalImage = document.querySelector("#viewer-img");
  const closeButton = document.querySelector(".close-viewer");

  // Handle click on gallery images
  gallery.addEventListener("click", (event) => {
    const img = event.target.closest("img");  // Ensure it's an img that was clicked
    if (!img) return;  // Only proceed if an image was clicked

    // Get the small image src and construct the full-size image path
    const smallSrc = img.getAttribute("src");
    const fullSrc = smallSrc.replace("-sm", "-full");  // Adjust this if necessary
    const altText = img.getAttribute("alt");

    // Update the modal with the large image
    modalImage.src = fullSrc;
    modalImage.alt = altText;

    // Show the modal
    modal.showModal();  // Opens the modal
  });

  // Close the modal when the 'X' button is clicked
  closeButton.addEventListener("click", () => {
    modal.close();  // Close the modal when 'X' is clicked
  });

  // Close the modal if the user clicks outside the image
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();  // Close if clicking outside the image
    }
  });
});




