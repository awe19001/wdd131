document.addEventListener("DOMContentLoaded", () => {
  // ========== NAV MENU ==========
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
  handleResize(); // run initially

  // ========== IMAGE MODAL ==========
  const gallery = document.querySelector(".gallery");
  const modal = document.querySelector("#image-viewer");
  const modalImage = document.querySelector("#viewer-img");
  const closeButton = document.querySelector(".close-viewer");

  gallery.addEventListener("click", (event) => {
    const img = event.target.closest("img");
    if (!img) return;

    const smallSrc = img.getAttribute("src");
    const fullSrc = smallSrc.replace("norris-sm.jpeg", "norris-full.jpeg");

    modalImage.src = fullSrc;
    modalImage.alt = img.alt;
    modal.showModal();// Opens dialog properly
  });

    closeButton.addEventListener("click", () => {
    console.log("X button clicked");
    if (modal.open) {
      modal.close();
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
});