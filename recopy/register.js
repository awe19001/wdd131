document.addEventListener("DOMContentLoaded", function () {
  let participantCount = 1;
  const addBtn = document.getElementById("add");
  const form = document.querySelector("form");
  const summary = document.getElementById("summary");

  // Add Participant Button
  addBtn.addEventListener("click", () => {
    if (participantCount >= 2) return; // Limit to 2 as per instructions

    participantCount++;
    const newSection = document.createElement("section");
    newSection.classList.add(`participant${participantCount}`);

    newSection.innerHTML = `
      <p>Participant ${participantCount}</p>
      <div class="item">
        <label for="pangan${participantCount}"> First Name<span>*</span></label>
        <input id="pangan${participantCount}" type="text" name="pangan${participantCount}" required />
      </div>
      <div class="item">
        <label for="act${participantCount}">Activity #<span>*</span></label>
        <input id="act${participantCount}" type="text" name="act${participantCount}" />
      </div>
      <div class="item">
        <label for="fee${participantCount}">Fee ($)<span>*</span></label>
        <input id="fee${participantCount}" type="number" name="fee${participantCount}" />
      </div>
      <div class="item">
        <label for="date${participantCount}">Desired Date <span>*</span></label>
        <input id="date${participantCount}" type="date" name="date${participantCount}" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select id="grade${participantCount}" name="grade${participantCount}">
          <option selected value="" disabled></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    `;

    const participantsFieldset = document.querySelector(".participants");
    participantsFieldset.insertBefore(newSection, addBtn);
  });

  // Submit Form
  form.addEventListener("submit", submitForm);

  function submitForm(event) {
    event.preventDefault();

    const adultName = document.getElementById("adult_name").value.trim();
    if (!adultName) {
      alert("Please enter the adult contact name.");
      return;
    }

    // Validate required household fields
    const requiredAdultFields = [
      "address1",
      "city",
      "state",
      "eaddress",
      "phone",
      "zip"
    ];

    for (let id of requiredAdultFields) {
      const input = document.getElementById(id);
      if (!input.value.trim()) {
        alert(`Please fill out the ${id.replace("_", " ")} field.`);
        return;
      }
    }

    // Validate at least pangan1 and date1
    const pangan1 = document.getElementById("pangan1").value.trim();
    const date1 = document.getElementById("date1").value.trim();
    if (!pangan1 || !date1) {
      alert("Please complete all required fields for Participant 1.");
      return;
    }

    // Optionally validate Participant 2
    if (participantCount >= 2) {
      const pangan2 = document.getElementById("pangan2").value.trim();
      const date2 = document.getElementById("date2").value.trim();
      if (!pangan2 || !date2) {
        alert("Please complete all required fields for Participant 2.");
        return;
      }
    }

    const total = totalFees();
    const info = {
      name: adultName,
      count: participantCount,
      total: total
    };

    // Hide form, show summary
    form.style.display = "none";
    summary.innerHTML = successTemplate(info);
    summary.style.display = "block";
  }

  // Fee Total Calculator
  function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements];
    const total = feeElements.reduce((sum, el) => {
      const val = parseFloat(el.value) || 0;
      return sum + val;
    }, 0);
    return total;
  }

  // Summary Message Generator
  function successTemplate(info) {
    return `
      <h3>Registration Successful!</h3>
      <p>Thank you <strong>${info.name}</strong> for registering.</p>
      <p>You have registered <strong>${info.count}</strong> participant(s) and owe <strong>$${info.total.toFixed(2)}</strong> in Fees.</p>
    `;
  }
});
