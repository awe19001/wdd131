// Select the dropdown element
const themeSelector = document.getElementById("themeSelect");
const logo = document.getElementById("logo");

// Listen for changes to the dropdown
themeSelector.addEventListener("change", changeTheme);

// Define the function to change themes
function changeTheme() {
    const selectedTheme = themeSelector.value;
  
    if (selectedTheme === "dark") {
    // Add the dark class to the body
      document.body.classList.add("dark");
    // Change the logo to the white version
      logo.setAttribute("src", "byui-logo_white.webp"); 
    } else {
    // Remove the dark class    
      document.body.classList.remove("dark");
    // Change the logo to the blue version  
      logo.setAttribute("src", "byui-logo_blue.webp"); 
    }
  }


