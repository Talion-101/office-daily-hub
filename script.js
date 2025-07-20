// Greeting
const greeting = document.getElementById("greeting");
const userName = "Isuru";
const hour = new Date().getHours();
let greetText = "Hello";
if (hour < 12) greetText = "Good Morning";
else if (hour < 18) greetText = "Good Afternoon";
else greetText = "Good Evening";
greeting.innerText = `${greetText}, ${userName}!`;

// Animated Background Gradient
function changeMood() {
  const mood = document.getElementById("mood-select").value;
  document.body.className = mood;
}

// Live Time and Date
function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit', second:'2-digit', timeZoneName: 'short' };
  clock.innerText = now.toLocaleString(undefined, options);
}
setInterval(updateClock, 1000);

// Sri Lankan Holidays
const holidays = {
  "2025-01-15": "Tamil Thai Pongal Day",
  "2025-02-04": "Independence Day",
  "2025-04-13": "New Year’s Eve",
  "2025-04-14": "New Year’s Day",
  "2025-05-01": "May Day",
  "2025-06-20": "Poson Poya"
};

// Custom Calendar
function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarGrid = document.getElementById("calendar-grid");
  calendarGrid.innerHTML = "";
  for (let i = 0; i < firstDay; i++) {
    calendarGrid.innerHTML += `<div class="day-box"></div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isHoliday = holidays[dateStr];
    const holidayText = isHoliday ? ` (${holidays[dateStr]})` : "";
    calendarGrid.innerHTML += `<div class="day-box ${isHoliday ? 'holiday' : ''}" title="${dateStr}${holidayText}">${d}</div>`;
  }
}
renderCalendar();

// Motivation Quotes
const quotes = [
  "The future depends on what you do today. — Mahatma Gandhi",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. — Winston Churchill",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "You are never too old to set another goal or to dream a new dream. — C.S. Lewis",
  "The only way to do great work is to love what you do. — Steve Jobs"
];

function refreshQuote() {
  const quoteBox = document.getElementById("daily-quote");
  const today = new Date().toDateString();
  const saved = localStorage.getItem(`quote_${today}`);
  if (saved) {
    quoteBox.innerText = saved;
  } else {
    const selected = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.innerText = selected;
    localStorage.setItem(`quote_${today}`, selected);
  }
}
refreshQuote();

// Sticky Notes
const note = document.getElementById("sticky-note");
const noteStatus = document.getElementById("note-status");

function loadNote() {
  const today = new Date().toDateString();
  note.value = localStorage.getItem(`note_${today}`) || "";
  const timestamp = localStorage.getItem(`note_saved_at_${today}`);
  if (timestamp) noteStatus.innerText = `Saved: ${timestamp}`;
  else noteStatus.innerText = "";
}

note.addEventListener("input", () => {
  const today = new Date().toDateString();
  localStorage.setItem(`note_${today
