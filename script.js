// Greeting + Live Clock
const greeting = document.getElementById("greeting");
const userName = "Isuru";
function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  let greetText = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  greeting.innerText = `${greetText}, ${userName}!`;
  document.getElementById("clock").innerText = now.toLocaleString(undefined, {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short"
  });
}
setInterval(updateClock, 1000);
updateClock();

// Theme Buttons
function setTheme(mode) {
  document.body.className = mode;
  document.getElementById("dark-btn").classList.toggle("active", mode === "default");
  document.getElementById("cute-btn").classList.toggle("active", mode === "cute");
}

// Holidays + Calendar
const holidays = {
  "2025-01-15": "Tamil Thai Pongal Day",
  "2025-02-04": "Independence Day",
  "2025-04-13": "New Year's Eve",
  "2025-04-14": "New Year's Day",
  "2025-05-01": "May Day",
  "2025-06-20": "Poson Poya"
};

function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid = document.getElementById("calendar-grid");
  grid.innerHTML = "";
  for (let i = 0; i < firstDay; i++) grid.innerHTML += `<div class="day-box"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const isHoliday = holidays[dateStr];
    grid.innerHTML += `<div class="day-box ${isHoliday ? "holiday" : ""}" title="${dateStr}${isHoliday ? ' - ' + isHoliday : ''}">${d}</div>`;
  }
}
renderCalendar();

// Quotes
const quotes = [
  "The future depends on what you do today. — Gandhi",
  "Success is not final, failure is not fatal. — Churchill",
  "You are never too old to set another goal. — C.S. Lewis",
  "Believe you can and you're halfway there. — Roosevelt",
  "Do great work by loving what you do. — Steve Jobs"
];

function refreshQuote() {
  const box = document.getElementById("daily-quote");
  const today = new Date().toDateString();
  let quote = localStorage.getItem(`quote_${today}`);
  if (!quote) {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    localStorage.setItem(`quote_${today}`, quote);
  }
  box.innerText = quote;
}
refreshQuote();

// Sticky Notes
const note = document.getElementById("sticky-note");
const noteStatus = document.getElementById("note-status");
function loadNote() {
  const today = new Date().toDateString();
  note.value = localStorage.getItem(`note_${today}`) || "";
  const savedAt = localStorage.getItem(`note_saved_${today}`);
  noteStatus.innerText = savedAt ? `Saved at: ${savedAt}` : "";
}
note.addEventListener("input", () => {
  const today = new Date().toDateString();
  localStorage.setItem(`note_${today}`, note.value);
  const time = new Date().toLocaleTimeString();
  localStorage.setItem(`note_saved_${today}`, time);
  noteStatus.innerText = `Saved at: ${time}`;
});
loadNote();
