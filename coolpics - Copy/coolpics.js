document.addEventListener("DOMContentLoaded", () => {
  // ===== MENU FUNCTIONALITY =====
  const menuButton = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");
  const links = navbar.querySelectorAll("a");

  function toggleMenu() {
    navbar.classList.toggle("open");
    links.forEach(link => {
      link.style.display = navbar.classList.contains("open") ? "block" : "none";
    });
  }

  function handleResize() {
    if (window.innerWidth > 1000) {
      links.forEach(link => link.style.display = "inline-block");
      navbar.classList.remove("open");
    } else if (!navbar.classList.contains("open")) {
      links.forEach(link => link.style.display = "none");
    }
  }

  menuButton.addEventListener("click", toggleMenu);
  window.addEventListener("resize", handleResize);
  handleResize();

  // ===== MODAL IMAGE VIEWER =====
  const gallery = document.querySelector(".gallery");
  const modal = document.querySelector("#image-viewer");

  // Viewer template function (required by rubric)
  function viewerTemplate(imgSrc, altText) {
    return `
      <img id="viewer-img" src="${imgSrc}" alt="${altText}">
      <button class="close-viewer">X</button>
    `;
  }

  // Open modal on image click
  gallery.addEventListener("click", (event) => {
    const img = event.target.closest("img");
    if (!img) return;

    const smallSrc = img.getAttribute("src");
    const fullSrc = smallSrc.replace("norris-sm.jpeg", "norris-full.jpeg");

    modal.innerHTML = viewerTemplate(fullSrc, img.alt);

    // Show modal
    modal.showModal();
    document.body.style.overflow = "hidden"; // Prevent scroll

    // Close button functionality
    const closeButton = modal.querySelector(".close-viewer");
    closeButton.addEventListener("click", () => {
      modal.close();
    });
  });

  // Close modal on background click
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  // Close modal on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.open) {
      modal.close();
    }
  });

  // Restore scroll after modal is closed
  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
  });
});
