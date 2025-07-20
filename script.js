// Greeting
const greeting = document.getElementById("greeting");
const userName = "Isuru";
const hour = new Date().getHours();
let greetText = "Hello";
if (hour < 12) greetText = "Good Morning";
else if (hour < 18) greetText = "Good Afternoon";
else greetText = "Good Evening";
greeting.innerText = `${greetText}, ${userName}!`;

// Background Mood Themes
const images = {
  default: ["bg1.jpg", "bg2.jpg", "bg3.jpg"],
  light: ["light1.jpg", "light2.jpg", "light3.jpg"],
  cute: ["cute1.jpg", "cute2.jpg", "cute3.jpg"]
};

function changeMood() {
  const mood = document.getElementById("mood-select").value;
  document.body.className = mood;
  const bgList = images[mood] || images.default;
  const selected = bgList[Math.floor(Math.random() * bgList.length)];
  document.body.style.backgroundImage = `url('assets/${selected}')`;
}

// Sri Lankan Holidays
const holidays = {
  "2025-01-15": "Tamil Thai Pongal Day",
  "2025-02-04": "Independence Day",
  "2025-04-13": "Sinhala and Tamil New Year’s Eve",
  "2025-04-14": "Sinhala and Tamil New Year’s Day",
  "2025-05-01": "May Day",
  "2025-06-20": "Poson Full Moon Poya Day",
  // Add more holidays here
};

// Calendar & Notes Save
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

// Music
const music = document.getElementById("bg-music");
function toggleMusic() {
  if (music.paused) music.play();
  else music.pause();
}
