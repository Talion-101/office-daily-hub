const sarcasmQuotes = [
  "You're doing amazing... at wasting time.",
  "Keep going! You're setting the bar lower every day.",
  "Productivity? Never heard of her.",
  "Hard work pays off... just not for you.",
  "Your potential is unlimited — and untouched.",
  "Confidence is key, which explains a lot.",
  "At least your chair supports you.",
  "Dream big, nap often.",
  "You bring something special to the team... confusion.",
  "You miss 100% of the shots you don't take — and the ones you do.",
];

const coffeeIdeas = [
  "Stare into your coffee like it holds the answers.",
  "Take a 15-minute break to contemplate your life choices.",
  "Stretch your legs... to the snack drawer.",
  "Make a coffee so strong it files your taxes.",
  "Walk around like you're solving world peace.",
  "Pretend you're in a productivity montage.",
  "Boil water, forget why. Repeat.",
  "Grab a donut, regret it later.",
  "Ask someone if they want coffee — secretly hope they say no.",
  "Dramatically sigh until someone notices."
];

const buttonLabels = [
  "💥 Hit Me Again",
  "😩 I Hate Myself",
  "🎯 Self Sabotage Time",
  "🤡 Roast Me",
  "🥲 Another One Please",
  "🧠 Fuel My Doubts",
  "🔥 Why Am I Like This?",
  "💤 Inject Sarcasm",
  "👀 Is This Helping?",
  "🫠 Try Me Again"
];

const nicknames = [
  "Captain Chaos", "Drama Llama", "Keyboard Warrior", "Meeting Enthusiast", 
  "Snack Destroyer", "Midnight Coder", "Professional Scroller", "Sir Naps-a-Lot",
  "Chief Procrastinator", "Queen of Tabs", "Browser Overlord"
];

let sarcasmIndex = 0;

// Get DOM elements
const sarcasmText = document.getElementById("sarcasmText");
const motivateBtn = document.getElementById("motivateBtn");
const sarcasmMeterFill = document.getElementById("sarcasmMeterFill");
const coffeeBtn = document.getElementById("coffeeBtn");
const coffeeIdea = document.getElementById("coffeeIdea");
const greeting = document.getElementById("greeting");
const nickname = document.getElementById("nickname");

// Generate nickname on page load
window.onload = () => {
  const time = new Date().getHours();
  const randomNick = nicknames[Math.floor(Math.random() * nicknames.length)];

  if (time < 12) {
    greeting.innerText = `Good morning, ${randomNick}`;
  } else if (time < 18) {
    greeting.innerText = `Good afternoon, ${randomNick}`;
  } else {
    greeting.innerText = `Good evening, ${randomNick}`;
  }
};

// Update sarcasm on click
motivateBtn.addEventListener("click", () => {
  sarcasmIndex++;
  const newQuote = sarcasmQuotes[Math.floor(Math.random() * sarcasmQuotes.length)];
  sarcasmText.innerText = newQuote + " " + generateExtraSarcasm();
  
  const fill = Math.min(100, sarcasmIndex * 10);
  sarcasmMeterFill.style.width = `${fill}%`;

  const newLabel = buttonLabels[Math.floor(Math.random() * buttonLabels.length)];
  motivateBtn.innerText = newLabel;
});

// Update coffee idea
coffeeBtn.addEventListener("click", () => {
  const idea = coffeeIdeas[Math.floor(Math.random() * coffeeIdeas.length)];
  coffeeIdea.innerText = idea;
});

// Generate more pain
function generateExtraSarcasm() {
  const extra = [
    "Honestly, iconic.",
    "Your boss is definitely crying somewhere.",
    "Inspirational... to no one.",
    "You’re basically a case study.",
    "Goals. Redefined.",
    "And yet... here we are."
  ];
  const index = Math.floor(Math.random() * extra.length);
  return extra[index];
}
