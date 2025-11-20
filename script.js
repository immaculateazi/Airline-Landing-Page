/* ================================================
   MOBILE MENU
================================================ */
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav ul");

toggle.addEventListener("click", () => {
  menu.classList.toggle("open");
});

/* ================================================
   FADE ANIMATIONS
================================================ */
const fades = document.querySelectorAll(".fade");

function reveal() {
  fades.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal();

/* ================================================
   AUTO-FILL TODAY DATE
================================================ */
if (document.getElementById("departDate")) {
  document.getElementById("departDate").value = new Date().toISOString().split("T")[0];
}

/* ================================================
   TRIP TYPE SWITCH
================================================ */
const oneWay = document.getElementById("oneWay");
const roundTrip = document.getElementById("roundTrip");
const returnDate = document.getElementById("returnDate");
const returnLabel = document.getElementById("returnLabel");

if (oneWay && roundTrip) {
  oneWay.addEventListener("click", () => {
    returnDate.style.display = "none";
    returnLabel.style.display = "none";
  });

  roundTrip.addEventListener("click", () => {
    returnDate.style.display = "block";
    returnLabel.style.display = "block";
  });
}

/* ================================================
   PASSENGER COUNTERS
================================================ */
let adults = 1;
let children = 0;

document.querySelectorAll(".plus").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.type === "adult") adults++;
    else children++;

    document.getElementById("adultCount").textContent = adults;
    document.getElementById("childCount").textContent = children;
  });
});

document.querySelectorAll(".minus").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.type === "adult" && adults > 1) adults--;
    if (btn.dataset.type === "child" && children > 0) children--;

    document.getElementById("adultCount").textContent = adults;
    document.getElementById("childCount").textContent = children;
  });
});

/* ================================================
   LOCAL STORAGE — SAVE SEARCH DATA
================================================ */
function saveSearch() {
  const data = {
    from: document.getElementById("from")?.value || "",
    to: document.getElementById("to")?.value || "",
    departDate: document.getElementById("departDate")?.value || "",
    returnDate: document.getElementById("returnDate")?.value || "",
    adults: adults,
    children: children,
    tripType: oneWay?.checked ? "oneWay" : "roundTrip"
  };

  localStorage.setItem("watts_search", JSON.stringify(data));
}

/* ================================================
   LOCAL STORAGE — LOAD SAVED SEARCH
================================================ */
function loadSearch() {
  const saved = localStorage.getItem("watts_search");
  if (!saved) return;

  const data = JSON.parse(saved);

  if (document.getElementById("from")) document.getElementById("from").value = data.from;
  if (document.getElementById("to")) document.getElementById("to").value = data.to;
  if (document.getElementById("departDate")) document.getElementById("departDate").value = data.departDate;

  if (data.tripType === "oneWay") {
    oneWay.checked = true;
    returnDate.style.display = "none";
    returnLabel.style.display = "none";
  } else {
    roundTrip.checked = true;
    returnDate.style.display = "block";
    returnLabel.style.display = "block";
    if (document.getElementById("returnDate")) {
      document.getElementById("returnDate").value = data.returnDate;
    }
  }

  adults = data.adults;
  children = data.children;

  if (document.getElementById("adultCount")) {
    document.getElementById("adultCount").textContent = adults;
  }
  if (document.getElementById("childCount")) {
    document.getElementById("childCount").textContent = children;
  }
}

loadSearch();

/* ================================================
   SAVE SEARCH WHEN SUBMITTING BOOKING FORM
================================================ */
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", () => {
    saveSearch();
  });
}

/* ================================================
   RESULTS PAGE – LOADING SIMULATION
================================================ */
setTimeout(() => {
  const loader = document.getElementById("loading");
  const results = document.getElementById("results");
  if (loader) loader.style.display = "none";
  if (results) results.classList.remove("hidden");
}, 2000);

/* ================================================
   DISPLAY ROUTE INFO FROM URL (RESULTS PAGE)
================================================ */
const params = new URLSearchParams(window.location.search);

let from = params.get("from") || "Your departure";
let to = params.get("to") || "Your destination";
let date = params.get("date") || "selected date";

const info = document.getElementById("routeInfo");
if (info) info.textContent = `Flights from ${from} → ${to} on ${date}`;

/* ================================================
   CHOOSE FLIGHT BUTTON
================================================ */
document.querySelectorAll(".choose").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Your flight has been selected! A booking agent will contact you.");
  });
});