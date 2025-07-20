const quotes = [
  "Keep going, you're almost at the point where no one notices your effort.",
  "Believe in yourself. Someone has to.",
  "Dream big. It’s the cheapest thing you can afford.",
  "You can do anything you set your mind to — except probably this.",
  "You're doing amazing...ly average.",
  "Another day, another existential crisis.",
  "Your potential is endless, much like your procrastination.",
  "Hard work pays off… just not today.",
  "Mistakes are proof that you’re trying. So why stop now?",
  "You’re the reason this app exists.",
  "Inspiring isn’t it? No? Oh well."
];

const nicknames = [
  "Captain Mediocre", "Productivity Potato", "Procrastination Guru",
  "Sarcasm Magnet", "Ambition Accident", "Intern of Doom",
  "Sleeping Sensei", "The Chosen Sloth", "Dream Crusher Deluxe"
];

const buttonTexts = [
  "Try Again?", "Hurt Me More", "Crave Pain?", "Punish Yourself",
  "More Fuel?", "Bring It On", "Roast Me", "Why Am I Here?", "Last One...maybe"
];

let sarcasmLevel = 0;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getNickname() {
  if (!localStorage.getItem("nickname")) {
    localStorage.setItem("nickname", getRandomItem(nicknames));
  }
  return localStorage.getItem("nickname");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("greeting").textContent = getGreeting();
  document.getElementById("nickname").textContent = `Hey ${getNickname()},`;

  const inspireBtn = document.getElementById("inspireBtn");
  const quoteEl = document.getElementById("quote");
  const sarcasmMeter = document.getElementById("sarcasmMeter");

  inspireBtn.addEventListener("click", () => {
    const newQuote = getRandomItem(quotes);
    quoteEl.textContent = newQuote;
    sarcasmLevel = Math.min(100, sarcasmLevel + Math.floor(Math.random() * 20) + 10);
    sarcasmMeter.style.width = `${sarcasmLevel}%`;

    if (sarcasmLevel >= 100) {
      sarcasmLevel = 0;
    }

    inspireBtn.textContent = getRandomItem(buttonTexts);
  });
});
