// Toggle which payment detail inputs are visible and required
function togglePaymentDetails(e) {
  const theForm = document.querySelector("#checkoutForm");
  const creditCardContainer = document.getElementById("creditCardNumberContainer");
  const paypalContainer = document.getElementById("paypalUsernameContainer");

  // Hide both containers initially
  creditCardContainer.classList.add("hide");
  paypalContainer.classList.add("hide");

  // Remove required attribute from both inputs to prevent hidden input errors
  theForm.creditCardNumber.required = false;
  theForm.paypalUsername.required = false;

  // Show the appropriate container based on payment method and make it required
  if (theForm.paymentMethod.value === "creditCard") {
    creditCardContainer.classList.remove("hide");
    theForm.creditCardNumber.required = true;
  } else if (theForm.paymentMethod.value === "paypal") {
    paypalContainer.classList.remove("hide");
    theForm.paypalUsername.required = true;
  }
}

// Validate form on submit with custom rules
function validateForm(event) {
  const theForm = event.target;
  const errors = [];
  let isValid = true;

  // Only allow name "Bob"
  if (theForm.fullName.value.trim() !== "Bob") {
    isValid = false;
    errors.push("Only users named 'Bob' can place an order.");
  }

  // If payment is credit card, check if the number is the one allowed
  if (theForm.paymentMethod.value === "creditCard") {
    if (theForm.creditCardNumber.value.trim() !== "1234123412341234") {
      isValid = false;
      errors.push("Invalid Credit Card Number.");
    }
  }

  if (!isValid) {
    event.preventDefault(); // Stop submission
    showErrors(errors);
    return false;
  }
}

// Show errors in the .errors container
function showErrors(errors) {
  const errorEl = document.querySelector(".errors");
  errorEl.innerHTML = errors.map(error => `<p>${error}</p>`).join("");
}

// Attach event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const theForm = document.querySelector("#checkoutForm");
  const paymentSelect = document.querySelector("#paymentMethod");

  paymentSelect.addEventListener("change", togglePaymentDetails);
  theForm.addEventListener("submit", validateForm);

  // Initialize the payment details visibility on page load
  togglePaymentDetails();
});
