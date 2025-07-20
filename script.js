// Live Clock
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// To-Do List
function addTodo() {
  const input = document.getElementById("todo-input");
  const task = input.value.trim();
  if (task) {
    const ul = document.getElementById("todo-list");
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      li.remove();
      saveTodos();
    };
    ul.appendChild(li);
    input.value = "";
    saveTodos();
  }
}

function saveTodos() {
  const items = [];
  document.querySelectorAll("#todo-list li").forEach(li => items.push(li.textContent));
  localStorage.setItem("todos", JSON.stringify(items));
}

function loadTodos() {
  const items = JSON.parse(localStorage.getItem("todos") || "[]");
  items.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      li.remove();
      saveTodos();
    };
    document.getElementById("todo-list").appendChild(li);
  });
}
loadTodos();

// Daily Quote
const quotes = [
  "Believe in yourself!",
  "You are capable of amazing things.",
  "Small steps lead to big success.",
  "Be kind to your mind.",
  "One day or day one? You decide.",
  "Progress over perfection.",
  "Your energy introduces you before you even speak."
];

function newQuote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = q;
}
newQuote();

// Sticky Note
const note = document.getElementById("note");
note.value = localStorage.getItem("note") || "";
note.addEventListener("input", () => {
  localStorage.setItem("note", note.value);
});

// Mood Theme Switcher
function changeMood() {
  const mood = document.getElementById("mood-select").value;
  document.body.className = ""; // Reset
  if (mood !== "default") {
    document.body.classList.add(`mood-${mood}`);
  }
  localStorage.setItem("selectedMood", mood);
}

const savedMood = localStorage.getItem("selectedMood");
if (savedMood) {
  document.getElementById("mood-select").value = savedMood;
  changeMood();
}

// Background Music Toggle
let isMusicPlaying = false;
const audio = document.getElementById("bg-music");
const btn = document.getElementById("music-btn");

function toggleMusic() {
  if (isMusicPlaying) {
    audio.pause();
    btn.textContent = "🎵 Play Music";
  } else {
    audio.play();
    btn.textContent = "🔇 Pause Music";
  }
  isMusicPlaying = !isMusicPlaying;
}
