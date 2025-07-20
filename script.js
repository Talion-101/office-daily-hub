// Greeting + Clock
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

// Theme toggle
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

function refreshQuote() {
  const box = document.getElementById("daily-quote");
  const today = new Date().toDateString();
  let quote = localStorage.getItem(`quote_${today}`);
  if (!quote) {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    localStorage.setItem(`quote_${today}`, quote);
  }
  box.innerText = quote;
  box.style.display = "block";
}

// Calendar
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
    grid.innerHTML += `<div class="day-box" title="${dateStr}">${d}</div>`;
  }
}
renderCalendar();

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
