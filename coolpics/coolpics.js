const thumbnail = document.getElementById("thumbnail");
const overlay = document.getElementById("overlay");

thumbnail.addEventListener("click", () => {
  overlay.classList.remove("hidden");
});

overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
});


function toggleMenu() {
  const nav = document.querySelector(".navbar");
  nav.classList.toggle("open");
}


