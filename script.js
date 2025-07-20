// Greeting Based on Time
const greeting = document.getElementById("greeting");
const userName = "Isuru";
const hour = new Date().getHours();
let greetText = "Hello";
if (hour < 12) greetText = "Good Morning";
else if (hour < 18) greetText = "Good Afternoon";
else greetText = "Good Evening";
greeting.innerText = `${greetText}, ${userName}!`;

// Gradient Backgrounds per Mood
function proceduralGradient(mood) {
  const gradients = {
    default: [
      "linear-gradient(135deg, #1e3c72, #2a5298)",
      "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
    ],
    light: [
      "linear-gradient(135deg, #e0eafc, #cfdef3)",
      "linear-gradient(135deg, #ffffff, #f2f2f2)"
    ],
    cute: [
      "linear-gradient(135deg, #ffecd2, #fcb69f)",
      "linear-gradient(135deg, #f6d365, #fda085)"
    ]
  };
  const options = gradients[mood] || gradients.default;
  return options[Math.floor(Math.random() * options.length)];
}

function changeMood() {
  const mood = document.getElementById("mood-select").value;
  document.body.className = mood;
  document.body.style.backgroundImage = proceduralGradient(mood);
}

// Sri Lankan Holidays
const holidays = {
  "2025-01-15": "Tamil Thai Pongal Day",
  "2025-02-04": "Independence Day",
  "2025-04-13": "Sinhala and Tamil New Year’s Eve",
  "2025-04-14": "Sinhala and Tamil New Year’s Day",
  "2025-05-01": "May Day",
  "2025-06-20": "Poson Full Moon Poya Day"
};

// Sticky Notes & Quotes
const calendar = document.getElementById("calendar");
const note = document.getElementById("sticky-note");
const quote = document.getElementById("quote");
const holidayBox = document.getElementById("holiday");

function loadDataForDate() {
  const selected = calendar.value;
  note.value = localStorage.getItem(`${selected}_note`) || "";
  quote.value = localStorage.getItem(`${selected}_quote`) || "";
  holidayBox.innerText = holidays[selected] ? `🎉 Holiday: ${holidays[selected]}` : "";
}

note.addEventListener("input", () => {
  const selected = calendar.value;
  localStorage.setItem(`${selected}_note`, note.value);
});

quote.addEventListener("input", () => {
  const selected = calendar.value;
  localStorage.setItem(`${selected}_quote`, quote.value);
});

// Background Music
const music = document.getElementById("bg-music");
function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}

// Weekly Goals Persistence & Progress Bar
const goalInputs = document.querySelectorAll('#goals-list input');
const progressBar = document.getElementById('progress');

goalInputs.forEach(input => {
  const key = `goal_${input.dataset.task}`;
  input.checked = localStorage.getItem(key) === "true";
  input.addEventListener("change", () => {
    localStorage.setItem(key, input.checked);
    updateProgress();
  });
});

function updateProgress() {
  const total = goalInputs.length;
  const completed = Array.from(goalInputs).filter(input => input.checked).length;
  const percent = Math.round((completed / total) * 100);
  progressBar.value = percent;
}

updateProgress(); // Initialize on load
