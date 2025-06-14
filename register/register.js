import { successTemplate } from "./Templates.js";


document.addEventListener("DOMContentLoaded", function () {
  let participantCount = 1;
  const addBtn = document.getElementById("dugang");
  const form = document.querySelector("form");
  const summary = document.getElementById("sumaryo");

  // Add Participant Button
  addBtn.addEventListener("click", () => {
    if (participantCount >= 2) return; // Limit to 2 participants

    participantCount++;
    const newSection = document.createElement("section");
    newSection.classList.add(`partisipante${participantCount}`);

    newSection.innerHTML = `
      <p>Participant ${participantCount}</p>
      <div class="butang">
        <label for="ngalan${participantCount}"> First Name<span>*</span></label>
        <input id="ngalan${participantCount}" type="text" name="ngalan${participantCount}" required />
      </div>
      <div class="butang">
        <label for="aktibidad${participantCount}">Activity #<span>*</span></label>
        <input id="aktibidad${participantCount}" type="text" name="aktibidad${participantCount}" />
      </div>
      <div class="butang">
        <label for="bayad${participantCount}">Fee ($)<span>*</span></label>
        <input id="bayad${participantCount}" type="number" name="bayad${participantCount}" />
      </div>
      <div class="butang">
        <label for="petsa${participantCount}">Desired Date <span>*</span></label>
        <input id="petsa${participantCount}" type="date" name="petsa${participantCount}" />
      </div>
      <div class="butang">
        <p>Grade</p>
        <select id="grado${participantCount}" name="grado${participantCount}">
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

    const participantsFieldset = document.querySelector(".mga_partisipante");
    participantsFieldset.insertBefore(newSection, addBtn);
  });

  // Submit Form
  form.addEventListener("submit", submitForm);

  function submitForm(event) {
    event.preventDefault();

    const adultName = document.getElementById("ngalan_adulto").value.trim();
    if (!adultName) {
      alert("Palihug sulati ang ngalan sa adulto nga kontak.");
      return;
    }

    // Validate required household fields
    const requiredAdultFields = [
      "adres1",
      "syudad",
      "estado",
      "email_adres",
      "telepono",
      "zip_code"
    ];

    for (let id of requiredAdultFields) {
      const input = document.getElementById(id);
      if (!input.value.trim()) {
        alert(`Palihug sulati ang ${id.replace("_", " ")}.`);
        return;
      }
    }

    // Validate at least pangan1 and date1
    const pangan1 = document.getElementById("ngalan1").value.trim();
    const date1 = document.getElementById("petsa1").value.trim();
    if (!pangan1 || !date1) {
      alert("Palihug kompletoha ang tanan kinahanglan nga butang para sa Participant 1.");
      return;
    }

    // Optionally validate Participant 2
    if (participantCount >= 2) {
      const pangan2 = document.getElementById("ngalan2").value.trim();
      const date2 = document.getElementById("petsa2").value.trim();
      if (!pangan2 || !date2) {
        alert("Palihug kompletoha ang tanan kinahanglan nga butang para sa Participant 2.");
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
    let feeElements = document.querySelectorAll("[id^=bayad]");
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
      <h3>Pagparehistro Malampuson!</h3>
      <p>Salamat <strong>${info.name}</strong> sa imong pagparehistro.</p>
      <p>Nakarehistro ka og <strong>${info.count}</strong> ka participant(s) ug kinahanglan mobayad og <strong>$${info.total.toFixed(2)}</strong>.</p>
    `;
  }
});
