// DOM Elements
const greeting = document.getElementById("greeting");
const clock = document.getElementById("clock");
const motivationBtn = document.getElementById("motivation-btn");
const dailyQuote = document.getElementById("daily-quote");

// Sarcastic nicknames or funny titles instead of real name
const sarcasticNames = [
  "Productivity Police",
  "Deadline Dodger",
  "Coffee Connoisseur",
  "Meeting Survivor",
  "Snack Hoarder",
  "Keyboard Warrior",
  "Email Ninja",
  "Spreadsheet Wizard",
  "Procrastination Pro",
  "Workplace Legend",
];

// Greeting with sarcastic nickname, updates every second for fun
function updateGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let greetText = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  const name = sarcasticNames[Math.floor(Math.random() * sarcasticNames.length)];
  greeting.innerText = `${greetText}, ${name}!`;
}

// Clock display (local date/time, no timezone)
function updateClock() {
  const now = new Date();
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

// Phrase pools per sarcasm level
const phrasePools = [
  { // Level 0: mild sarcasm
    openers: ["Heads up, ", "Just so you know, ", "FYI, ", "Word of advice, ", "Warning: "],
    subjects: [
      "your coffee is plotting against you",
      "the printer hates you",
      "the snack drawer is empty again",
      "your emails have feelings too",
      "your deadlines are silently laughing",
    ],
    comments: [
      "but nobody asked.",
      "and it's not impressed.",
      "so maybe try harder?",
      "but you'll ignore it anyway.",
      "and it’s definitely not your friend.",
    ],
    punchlines: [
      "Time to pretend you’re busy!",
      "Brace yourself for more coffee breaks.",
      "Fake it till you make it.",
      "Smile like you mean it — or just fake it better.",
    ]
  },
  { // Level 1: moderate sarcasm
    openers: ["Breaking news: ", "FYI, ", "Here's the deal: ", "Take note: ", "Alert! "],
    subjects: [
      "your keyboard filed a formal complaint",
      "the office plant is thriving more than you",
      "your meeting could have been an email",
      "your screen time is dangerously high",
      "your productivity is on vacation",
    ],
    comments: [
      "and it’s judging you silently.",
      "but hey, it’s the only one growing.",
      "and nobody noticed you were missing.",
      "so maybe step away for a bit.",
      "but you wouldn’t know that.",
    ],
    punchlines: [
      "Go on, pretend to work harder.",
      "At least your chair knows your secrets.",
      "Time to reboot your motivation (or your computer).",
      "Blink twice if you need help.",
    ]
  },
  { // Level 2: savage sarcasm
    openers: ["Disaster alert: ", "Good news — not really: ", "Brace yourself: ", "Reality check: ", "Ouch! "],
    subjects: [
      "your coffee tastes like regret",
      "the boss just rolled their eyes",
      "your emails scream desperation",
      "your keyboard is threatening a strike",
      "your deadlines are planning a rebellion",
    ],
    comments: [
      "and it’s absolutely hilarious.",
      "but nobody’s laughing with you.",
      "so quit whining and get to work.",
      "and it’s probably for the best.",
      "because you’re clearly not ready.",
    ],
    punchlines: [
      "Time to face the music... or fake it well.",
      "Maybe a coffee won’t save this time.",
      "Blink and the opportunity’s gone.",
      "You're the star of this workplace comedy.",
    ]
  },
  { // Level 3+: brutal sarcasm (max level)
    openers: ["Ultimate roast: ", "Unpopular opinion: ", "Warning: Brutal honesty ahead! ", "Newsflash: ", "Epic fail: "],
    subjects: [
      "your productivity called in sick",
      "your keyboard just quit on you",
      "your coffee is stronger than your willpower",
      "your deadlines are laughing in your face",
      "the office chair filed harassment charges",
    ],
    comments: [
      "and it’s about time someone noticed.",
      "because even your mouse is fed up.",
      "so maybe call it a day?",
      "and honestly, who can blame them?",
      "because your ‘work’ is a joke.",
    ],
    punchlines: [
      "Might wanna rethink your life choices.",
      "Congratulations — you’ve mastered procrastination.",
      "Go home, you’re done (not really).",
      "Hope you enjoy your extended coffee break.",
    ]
  },
];

// Get sarcasm level based on click count
function getSarcasmLevel(clickCount) {
  if (clickCount < 3) return 0;
  if (clickCount < 6) return 1;
  if (clickCount < 10) return 2;
  return 3; // max level
}

// Generate sarcastic quote based on level
function generateSarcasticQuote(clickCount) {
  const level = getSarcasmLevel(clickCount);
  const pool = phrasePools[level];

  const part1 = pool.openers[Math.floor(Math.random() * pool.openers.length)];
  const part2 = pool.subjects[Math.floor(Math.random() * pool.subjects.length)];
  const part3 = pool.comments[Math.floor(Math.random() * pool.comments.length)];
  const part4 = pool.punchlines[Math.floor(Math.random() * pool.punchlines.length)];

  return `${part1}${part2}, ${part3} ${part4}`;
}

// Show daily quote or use stored one
function showDailyQuote() {
  const today = new Date().toDateString();
  let storedQuote = localStorage.getItem("sarcastic_quote_" + today);
  let clickCount = parseInt(localStorage.getItem("sarcastic_clicks_" + today)) || 0;

  if (!storedQuote) {
    storedQuote = generateSarcasticQuote(clickCount);
    localStorage.setItem("sarcastic_quote_" + today, storedQuote);
    localStorage.setItem("sarcastic_clicks_" + today, clickCount.toString());
  }

  dailyQuote.innerText = storedQuote;
  dailyQuote.style.display = "block";
}

// Handle button click: increase click count, generate harsher quote
motivationBtn.addEventListener("click", () => {
  const today = new Date().toDateString();
  let clickCount = parseInt(localStorage.getItem("sarcastic_clicks_" + today)) || 0;

  clickCount++;
  localStorage.setItem("sarcastic_clicks_" + today, clickCount.toString());

  const newQuote = generateSarcasticQuote(clickCount);
  localStorage.setItem("sarcastic_quote_" + today, newQuote);

  dailyQuote.innerText = newQuote;
  dailyQuote.style.display = "block";
});

// Update greeting and clock every second
function update() {
  updateGreeting();
  updateClock();
}

setInterval(update, 1000);

// Initial load
updateGreeting();
updateClock();
showDailyQuote();
