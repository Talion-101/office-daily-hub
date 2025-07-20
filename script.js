// Greeting + Clock (no timezone)
const greeting = document.getElementById("greeting");
const clock = document.getElementById("clock");
const userName = "Isuru";

function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  let greetText = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  greeting.innerText = `${greetText}, ${userName}!`;

  // Local date + time, no timezone shown
  clock.innerText = now.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}
setInterval(updateClock, 1000);
updateClock();

// Theme toggle (unchanged)
function setTheme(mode) {
  document.body.className = mode;
  document.getElementById("dark-btn").classList.toggle("active", mode === "default");
  document.getElementById("cute-btn").classList.toggle("active", mode === "cute");
}

// Motivation
const quotes = [
  "The future depends on what you do today. — Gandhi",
  "Success is not final, failure is not fatal. — Churchill",
  "Believe you can and you're halfway there. — Roosevelt",
  "Do great work by loving what you do. — Steve Jobs",
  "Be yourself; everyone else is already taken. — Oscar Wilde"
];
const quoteBox = document.getElementById("daily-quote");
const quoteBtn = document.getElementById("generate-quote");

function refreshQuote() {
  const today = new Date().toDateString();
  let quote = localStorage.getItem(`quote_${today}`);
  if (!quote) {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    localStorage.setItem(`quote_${today}`, quote);
  }
  quoteBox.innerText = quote;
  quoteBox.style.display = "block"; // Make sure quote is visible
}
quoteBtn.addEventListener("click", refreshQuote);
refreshQuote(); // Load quote on page load

// --- Interactive Calendar ---
const calendarGrid = document.getElementById("calendar-grid");
const stickyNote = document.getElementById("sticky-note");
const noteStatus = document.getElementById("note-status");

// Holidays example (you can expand this)
const holidays = {
  "2025-01-15": "Tamil Thai Pongal Day",
  "2025-02-04": "Independence Day",
  "2025-04-13": "Sinhala and Tamil New Year’s Eve",
  "2025-04-14": "Sinhala and Tamil New Year’s Day",
  "2025-05-01": "May Day",
  "2025-06-20": "Poson Full Moon Poya Day"
};

let selectedDate = new Date(); // Start with today

function renderCalendar(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarGrid.innerHTML = "";

  // Add blank slots for days before month start
  for (let i = 0; i < firstDay; i++) {
    const blankDiv = document.createElement("div");
    blankDiv.classList.add("day-box", "empty");
    calendarGrid.appendChild(blankDiv);
  }

  // Add day boxes
  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day-box");
    const dayDate = new Date(year, month, d);
    const isoDate = dayDate.toISOString().slice(0, 10);
    dayDiv.textContent = d;
    dayDiv.title = isoDate;

    // Mark holidays
    if (holidays[isoDate]) {
      dayDiv.classList.add("holiday");
      dayDiv.title += ` - ${holidays[isoDate]}`;
    }

    // Highlight selected day
    if (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === d
    ) {
      dayDiv.classList.add("selected");
    }

    dayDiv.addEventListener("click", () => {
      selectedDate = dayDate;
      renderCalendar(selectedDate); // rerender to update highlight
      loadNoteForDate(selectedDate);
    });

    calendarGrid.appendChild(dayDiv);
  }
}
renderCalendar(selectedDate);

// Load note for selected date
function loadNoteForDate(date) {
  const key = date.toDateString();
  stickyNote.value = localStorage.getItem(`note_${key}`) || "";
  const savedAt = localStorage.getItem(`note_saved_${key}`);
  noteStatus.innerText = savedAt ? `Saved at: ${savedAt}` : "";
}
loadNoteForDate(selectedDate);

// Save note on input with timestamp
stickyNote.addEventListener("input", () => {
  const key = selectedDate.toDateString();
  localStorage.setItem(`note_${key}`, stickyNote.value);
  const time = new Date().toLocaleTimeString();
  localStorage.setItem(`note_saved_${key}`, time);
  noteStatus.innerText = `Saved at: ${time}`;
});
