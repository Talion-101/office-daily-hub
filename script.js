// Greeting + Clock (local time, no timezone)
const greeting = document.getElementById("greeting");
const clock = document.getElementById("clock");
const userName = "Isuru";

function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  let greetText = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  greeting.innerText = `${greetText}, ${userName}!`;

  // Local date/time without timezone
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

// Advanced Sarcastic Motivation Generator

const motivationBtn = document.getElementById("motivation-btn");
const dailyQuote = document.getElementById("daily-quote");

// Parts for procedural generation
const openers = [
  "Heads up, ",
  "Just so you know, ",
  "FYI, ",
  "Word of advice, ",
  "Warning: ",
  "News flash, ",
  "Breaking: "
];

const subjects = [
  "your coffee is plotting against you",
  "the printer hates you",
  "the snack drawer is empty again",
  "your emails have feelings too",
  "your deadlines are silently laughing",
  "the meeting could've been an email",
  "your keyboard just filed a complaint",
  "your computer is secretly judging your browsing history",
  "your office chair knows all your secrets"
];

const sarcasticComments = [
  "but nobody asked.",
  "and it's not impressed.",
  "so maybe try harder?",
  "but you'll ignore it anyway.",
  "and it’s definitely not your friend.",
  "but hey, at least you showed up.",
  "and it’s more productive than you.",
  "so maybe stand up and stretch? Or not.",
  "and it’s the only thing being productive today."
];

const punchlines = [
  "Time to pretend you’re busy!",
  "Brace yourself for more coffee breaks.",
  "Fake it till you make it.",
  "Smile like you mean it — or just fake it better.",
  "Don’t forget to look stressed enough.",
  "Keep calm and pretend to multitask.",
  "Remember: blame your WiFi.",
  "This message will self-destruct after your next meeting.",
  "Congratulations, you’re still employed!"
];

// Generate one sarcastic quote combining random parts
function generateSarcasticQuote() {
  const part1 = openers[Math.floor(Math.random() * openers.length)];
  const part2 = subjects[Math.floor(Math.random() * subjects.length)];
  const part3 = sarcasticComments[Math.floor(Math.random() * sarcasticComments.length)];
  const part4 = punchlines[Math.floor(Math.random() * punchlines.length)];

  return `${part1}${part2}, ${part3} ${part4}`;
}

// Show daily quote from localStorage or generate new one
function showDailyQuote() {
  const today = new Date().toDateString();
  let storedQuote = localStorage.getItem("sarcastic_quote_" + today);

  if (!storedQuote) {
    storedQuote = generateSarcasticQuote();
    localStorage.setItem("sarcastic_quote_" + today, storedQuote);
  }

  dailyQuote.innerText = storedQuote;
  dailyQuote.style.display = "block";
}

// On button click, generate new quote and overwrite today's quote
motivationBtn.addEventListener("click", () => {
  const newQuote = generateSarcasticQuote();
  const today = new Date().toDateString();
  localStorage.setItem("sarcastic_quote_" + today, newQuote);
  dailyQuote.innerText = newQuote;
  dailyQuote.style.display = "block";
});

// Initialize on page load
showDailyQuote();
