// Greeting + Clock (local time, no timezone)
const greeting = document.getElementById("greeting");
const clock = document.getElementById("clock");
const userName = "Isuru";

function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  let greetText = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  greeting.innerText = `${greetText}, ${userName}!`;

  clock.innerText = now.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
}
setInterval(updateClock, 1000);
updateClock();

// Theme toggle with active button styling
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");

function setTheme(mode) {
  document.body.className = mode;
  darkBtn.classList.toggle("active", mode === "default");
  lightBtn.classList.toggle("active", mode === "light");
}
setTheme("default"); // default on load

darkBtn.addEventListener("click", () => setTheme("default"));
lightBtn.addEventListener("click", () => setTheme("light"));

// Motivation quotes
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
  // Always show a new random quote on button click
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.innerText = quote;
  quoteBox.style.display = "block"; // Make sure it's visible
}

quoteBtn.addEventListener("click", refreshQuote);

// Weekly goals with localStorage persistence
const goalsList = document.getElementById("goals-list");
const goalCheckboxes = goalsList.querySelectorAll("input[type=checkbox]");

// Load saved goals state
function loadGoals() {
  goalCheckboxes.forEach((checkbox) => {
    const id = checkbox.dataset.id;
    const saved = localStorage.getItem(`goal_${id}`);
    checkbox.checked = saved === "true";
  });
}

// Save goal state on change
goalCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    localStorage.setItem(`goal_${checkbox.dataset.id}`, checkbox.checked);
  });
});

loadGoals();

// Sticky notes for today only
const stickyNote = document.getElementById("sticky-note");
const noteStatus = document.getElementById("note-status");
const todayKey = new Date().toDateString();

function loadNote() {
  stickyNote.value = localStorage.getItem(`note_${todayKey}`) || "";
  const savedAt = localStorage.getItem(`note_saved_${todayKey}`);
  noteStatus.innerText = savedAt ? `Saved at: ${savedAt}` : "";
}

stickyNote.addEventListener("input", () => {
  localStorage.setItem(`note_${todayKey}`, stickyNote.value);
  const time = new Date().toLocaleTimeString();
  localStorage.setItem(`note_saved_${todayKey}`, time);
  noteStatus.innerText = `Saved at: ${time}`;
});

loadNote();
