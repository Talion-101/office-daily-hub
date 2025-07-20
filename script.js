// Daily greeting
const greeting = document.getElementById("greeting");
const userName = "Isuru";
const hour = new Date().getHours();
let greetText = "Hello";
if (hour < 12) greetText = "Good Morning";
else if (hour < 18) greetText = "Good Afternoon";
else greetText = "Good Evening";
greeting.innerText = `${greetText}, ${userName}!`;

// Mood selector
function changeMood() {
  const mood = document.getElementById("mood-select").value;
  document.body.className = "";
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

// Background music
let isMusicPlaying = false;
const audio = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
function toggleMusic() {
  if (isMusicPlaying) {
    audio.pause();
    musicBtn.textContent = "🎵 Play Music";
  } else {
    audio.play();
    musicBtn.textContent = "🔇 Pause Music";
  }
  isMusicPlaying = !isMusicPlaying;
}

// To-do list
const taskList = document.getElementById("task-list");
function addTask() {
  const input = document.getElementById("task-input");
  if (input.value.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = input.value;
    taskList.appendChild(li);
    input.value = "";
  }
}

// Daily quote
const quotes = [
  "Stay positive, work hard, make it happen.",
  "Believe you can and you're halfway there.",
  "Every day is a fresh start.",
  "Progress, not perfection."
];
document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

// Sticky note
const sticky = document.getElementById("sticky-note");
sticky.value = localStorage.getItem("stickyNote") || "";
sticky.addEventListener("input", () => {
  localStorage.setItem("stickyNote", sticky.value);
});

// Random background images (optional instead of mood)
const backgrounds = [
  "url('https://source.unsplash.com/1600x900/?nature')",
  "url('https://source.unsplash.com/1600x900/?sky')",
  "url('https://source.unsplash.com/1600x900/?galaxy')",
  "url('https://source.unsplash.com/1600x900/?abstract')"
];
document.body.style.backgroundImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];
