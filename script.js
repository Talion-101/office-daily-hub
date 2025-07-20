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
    second: "numeric",
  });
}
setInterval(updateClock, 1000);
updateClock();

// Sarcastic Motivation Generator

const motivationBtn = document.getElementById("motivation-btn");
const dailyQuote = document.getElementById("daily-quote");

// Sarcastic/funny phrases parts for procedural generation
const sarcasticStarts = [
  "Remember, ",
  "Just a heads-up: ",
  "Don't forget, ",
  "FYI: ",
  "Pro tip: ",
  "Good news! ",
  "Warning: ",
];

const sarcasticMiddles = [
  "your coffee probably needs more caffeine, ",
  "your productivity is inversely proportional to your snack intake, ",
  "your deadlines don’t care about your feelings, ",
  "your to-do list is judging you, ",
  "your keyboard is tired of your typos, ",
  "your boss is suspiciously quiet today, ",
];

const sarcasticEnds = [
  "so buckle up and pretend to work.",
  "but hey, at least you showed up.",
  "time to fake it till you make it.",
  "because naps aren’t going to approve themselves.",
  "so smile like you mean it.",
  "don't mess it up.",
];

function generateSarcasticQuote() {
  const part1 = sarcasticStarts[Math.floor(Math.random() * sarcasticStarts.length)];
  const part2 = sarcasticMiddles[Math.floor(Math.random() * sarcasticMiddles.length)];
  const part3 = sarcasticEnds[Math.floor(Math.random() * sarcasticEnds.length)];
  return part1 + part2 + part3;
}

// Show a new sarcastic motivation quote (changes on button press and on page load daily)

function showDailyQuote() {
  // Use today's date to store quote key
  const today = new Date().toDateString();

  let storedQuote = localStorage.getItem("sarcastic_quote_" + today);

  if (!storedQuote) {
    storedQuote = generateSarcasticQuote();
    localStorage.setItem("sarcastic_quote_" + today, storedQuote);
  }

  dailyQuote.innerText = storedQuote;
  dailyQuote.style.display = "block";
}

// On button press, generate and show a new sarcastic quote (overwrites daily one)
motivationBtn.addEventListener("click", () => {
  const newQuote = generateSarcasticQuote();
  const today = new Date().toDateString();
  localStorage.setItem("sarcastic_quote_" + today, newQuote);
  dailyQuote.innerText = newQuote;
  dailyQuote.style.display = "block";
});

// Initial load: show daily quote from storage or generate
showDailyQuote();


// Weekly goals with localStorage persistence
const goalsList = document.getElementById("goals-list");
const goalCheckboxes = goalsList.querySelectorAll("input[type=checkbox]");

function loadGoals() {
  goalCheckboxes.forEach((checkbox) => {
    const id = checkbox.dataset.id;
    const saved = localStorage.getItem(`goal_${id}`);
    checkbox.checked = saved === "true";
  });
}

goalCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    localStorage.setItem(`goal_${checkbox.dataset.id}`, checkbox.checked);
  });
});

loadGoals();

// Coffee Break Generator

const coffeeBtn = document.getElementById("coffee-btn");
const coffeeIdea = document.getElementById("coffee-idea");

const coffeeBreakIdeas = [
  "Grab a mysterious flavored coffee — no questions asked.",
  "Pretend to meditate for 3 minutes (bonus points if anyone notices).",
  "Try balancing a spoon on your nose. Yes, really.",
  "Dance like no one's watching, even if they are.",
  "Make an elaborate coffee art masterpiece — even if it looks terrible.",
  "Take a quick walk and imagine you’re on a secret spy mission.",
  "Swap your chair for a stability ball — feel the burn!",
  "Sing your favorite song quietly and pretend you're in a musical.",
  "Challenge a colleague to a staring contest over coffee.",
  "Invent a new coffee-based superhero persona.",
];

function showCoffeeIdea() {
  const idea = coffeeBreakIdeas[Math.floor(Math.random() * coffeeBreakIdeas.length)];
  coffeeIdea.innerText = idea;
}

// Show one coffee idea on page load
showCoffeeIdea();

// Change coffee idea on button click
coffeeBtn.addEventListener("click", showCoffeeIdea);
