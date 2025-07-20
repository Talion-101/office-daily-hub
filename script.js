// DOM Elements
const greeting = document.getElementById("greeting");
const clock = document.getElementById("clock");
const motivationBtn = document.getElementById("motivation-btn");
const dailyQuote = document.getElementById("daily-quote");
const loadingText = document.getElementById("loading-text");
const meter = document.getElementById("sarcasm-meter");
const meterLabel = document.getElementById("meter-label");
const sorryBtn = document.getElementById("sorry-btn");
const surpriseHeading = document.getElementById("surprise-heading");
const userInput = document.getElementById("user-input");
const personalRoastBtn = document.getElementById("personal-roast-btn");

// Audio
const laughSound = document.getElementById("laugh-sound");
const buzzerSound = document.getElementById("buzzer-sound");

// Sarcastic nicknames for greeting (one per session, stored in sessionStorage)
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
  "Office Ghost",
  "Nap Specialist",
  "Reply-All Master",
  "The Silent Screamer",
  "Captain Avoidance"
];

// Button texts
const buttonTexts = [
  "Give me hell!",
  "Hit me with your worst!",
  "Burn me, baby!",
  "Roast me now!",
  "More pain, please!",
  "Make it hurt!",
  "Unleash the sarcasm!",
  "I can take it!",
  "Spare no feelings!",
  "Sarcasm me up!"
];

// Phrase pools for escalating sarcasm levels
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

// Passive-aggressive “backhanded compliments”
const backhandedCompliments = [
  "You're impressively mediocre.",
  "I’d agree with you but then we’d both be wrong.",
  "You bring everyone so much joy — when you leave the room.",
  "Your secrets are safe with me... I never even listen.",
  "You have something on your chin — no, the third one down.",
];

// Extreme “truth bombs” for rare occasions
const truthBombs = [
  "Truth bomb: Your work ethic is competing with a sloth on a Sunday.",
  "Reality check: Your 'busy' looks suspiciously like 'doing nothing.'",
  "Final verdict: Even the coffee has given up on you.",
  "Ultimate truth: You’re the reason they put instructions on shampoo bottles.",
];

// Loading texts for fake delays
const loadingMessages = [
  "Calculating your inevitable failure...",
  "Brewing the perfect roast...",
  "Downloading sarcasm module v42...",
  "Adjusting snark levels...",
  "Warming up the burn engine...",
];

// Confetti emoji bursts for extra effect
const confettiEmojis = ["💀", "🔥", "🤡", "👀", "😈", "💥", "🩸", "🥀"];

// Utility: random from array
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Sarcasm clicks & limits
const maxClicks = 15;
const overloadStart = 10;  // glitchy overload starts after 10 clicks
const truthBombChance = 0.1; // 10% chance for truth bomb after overload

// Sarcasm meter labels
const meterLabels = [
  "Just warming up...",
  "Sarcasm heating up...",
  "Careful, it's getting real...",
  "Warning: Brutal roast mode!",
  "You've reached sarcasm overload!",
  "🔥 Truth Bomb Incoming! 🔥"
];

// Get sarcasm level by click count
function getSarcasmLevel(clickCount) {
  if (clickCount < 3) return 0;
  if (clickCount < 6) return 1;
  if (clickCount < 10) return 2;
  return 3;
}

// Generate sarcastic quote for given click count and optional user input
function generateSarcasticQuote(clickCount, userPhrase = "") {
  // Random chance for truth bomb after overload
  if (clickCount >= overloadStart && Math.random() < truthBombChance) {
    return randomFrom(truthBombs);
  }

  // Backhanded compliment chance 20%
  if (Math.random() < 0.2) {
    return randomFrom(backhandedCompliments);
  }

  // If user provided input, roast it
  if (userPhrase.trim()) {
    return roastUserInput(userPhrase);
  }

  // Normal generated sarcasm
  const level = getSarcasmLevel(clickCount);
  const pool = phrasePools[level];

  const part1 = randomFrom(pool.openers);
  const part2 = randomFrom(pool.subjects);
  const part3 = randomFrom(pool.comments);
  const part4 = randomFrom(pool.punchlines);

  return `${part1}${part2}, ${part3} ${part4}`;
}

// Roast user input phrase
function roastUserInput(input) {
  // Mix of random insults + input phrase
  const insults = [
    `Wow, ${input} really needs a reality check.`,
    `If ${input} was a coffee, it'd be decaf — disappointing and ineffective.`,
    `I heard ${input} tried to work hard once. It didn't end well.`,
    `${input}? Sounds like a meeting that could have been an email.`,
    `Your ${input} is about as useful as a screen door on a submarine.`,
    `Everyone's talking about ${input}... mostly about what a joke it is.`,
  ];
  return randomFrom(insults);
}

// Pick nickname once on page load, store in sessionStorage
function getOrSetNickname() {
  let storedName = sessionStorage.getItem("sarcastic_nickname");
  if (!storedName) {
    storedName = randomFrom(sarcasticNames);
    sessionStorage.setItem("sarcastic_nickname", storedName);
  }
  return storedName;
}

// Update greeting with time-dependent greeting & nickname
function updateGreeting() {
  const now = new Date();
  const hour = now.getHours();
  let timeGreeting;

  if (hour >= 5 && hour < 12) timeGreeting = "Good Morning";
  else if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon";
  else if (hour >= 17 && hour < 21) timeGreeting = "Good Evening";
  else timeGreeting = "Burning Midnight Oil";

  const name = getOrSetNickname();
  greeting.innerText = `${timeGreeting}, ${name}!`;
}

// Update clock display (time/date only)
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

// Change button text to a random sarcastic phrase
function changeButtonText() {
  const newText = randomFrom(buttonTexts);
  motivationBtn.innerText = newText;
}

// Confetti explosion effect
function showConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti-container");
  document.body.appendChild(confettiContainer);

  let count = 50;
  while (count--) {
    const span = document.createElement("span");
    span.classList.add("confetti");
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = 3 + Math.random() * 2 + "s";
    span.textContent = randomFrom(confettiEmojis);
    confettiContainer.appendChild(span);
  }

  setTimeout(() => {
    confettiContainer.remove();
  }, 4000);
}

// Glitch effect for overload sarcasm mode
function glitchText(element) {
  const text = element.innerText;
  let glitchInterval = setInterval(() => {
    let glitched = "";
    for (let i = 0; i < text.length; i++) {
      if (Math.random() < 0.2) {
        // replace with random ASCII char
        glitched += String.fromCharCode(33 + Math.floor(Math.random() * 94));
      } else {
        glitched += text[i];
      }
    }
    element.innerText = glitched;
  }, 100);

  return glitchInterval;
}

// Restore normal text from stored string
function restoreText(element, text, glitchInterval) {
  clearInterval(glitchInterval);
  element.innerText = text;
}

// Update sarcasm meter progress and label
function updateMeter(clickCount) {
  const percent = Math.min((clickCount / maxClicks) * 100, 100);
  meter.value = percent;

  if (clickCount < 3) meterLabel.innerText = meterLabels[0];
  else if (clickCount < 6) meterLabel.innerText = meterLabels[1];
  else if (clickCount < 10) meterLabel.innerText = meterLabels[2];
  else if (clickCount < maxClicks) meterLabel.innerText = meterLabels[3];
  else meterLabel.innerText = meterLabels[4];
}

// Show “loading” with random message and delay
function showLoadingThen(callback) {
  loadingText.style.display = "block";
  loadingText.innerText = randomFrom(loadingMessages);
  dailyQuote.style.opacity = "0.5";
  motivationBtn.disabled = true;
  sorryBtn.disabled = true;
  personalRoastBtn.disabled = true;
  userInput.disabled = true;

  setTimeout(() => {
    loadingText.style.display = "none";
    dailyQuote.style.opacity = "1";
    motivationBtn.disabled = false;
    sorryBtn.disabled = false;
    personalRoastBtn.disabled = false;
    userInput.disabled = false;
    callback();
  }, 1600 + Math.random() * 800);
}

// Handle sarcasm fatigue visual effect
function applyFatigueEffect(clickCount) {
  if (clickCount > maxClicks) {
    const opacity = Math.max(1 - ((clickCount - maxClicks) * 0.08), 0.3);
    dailyQuote.style.color = `rgba(255, 148, 201, ${opacity})`;
    dailyQuote.style.fontSize = `${1.4 - (clickCount - maxClicks) * 0.05}rem`;
  } else {
    dailyQuote.style.color = "#ff94c9";
    dailyQuote.style.fontSize = "1.4rem";
  }
}

// Show “truth bomb” background flash
function flashTruthBomb() {
  document.body.style.backgroundColor = "#8b0000";
  setTimeout(() => {
    document.body.style.backgroundColor = "";
  }, 800);
}

// On button click: increase click count, generate harsher quote, change button text
function handleMotivationClick() {
  const today = new Date().toDateString();
  let clickCount = parseInt(localStorage.getItem("sarcastic_clicks_" + today)) || 0;

  clickCount++;
  localStorage.setItem("sarcastic_clicks_" + today, clickCount.toString());

  showLoadingThen(() => {
    let newQuote = generateSarcasticQuote(clickCount);

    // Play laugh or buzzer sound based on sarcasm level
    if (clickCount >= overloadStart) {
      buzzerSound.play();
      flashTruthBomb();
    } else {
      laughSound.play();
    }

    // Update meter & label
    updateMeter(clickCount);

    // Show confetti randomly on overload or truth bomb
    if (clickCount >= overloadStart && Math.random() < 0.4) {
      showConfetti();
    }

    // Show quote
    dailyQuote.innerText = newQuote;

    // Apply fatigue effect
    applyFatigueEffect(clickCount);

    // If overload, glitch text
    if (clickCount >= overloadStart) {
      if (window.glitchInterval) clearInterval(window.glitchInterval);
      window.glitchInterval = glitchText(dailyQuote);
    } else if (window.glitchInterval) {
      restoreText(dailyQuote, newQuote, window.glitchInterval);
      window.glitchInterval = null;
    }

    changeButtonText();

    // Show sorry button after 3 clicks
    if (clickCount >= 3) {
      sorryBtn.style.display = "inline-block";
    }
  });
}

// On sorry button click: show worse roast, reset meter a bit
function handleSorryClick() {
  const today = new Date().toDateString();
  let clickCount = parseInt(localStorage.getItem("sarcastic_clicks_" + today)) || 0;

  // Increase click count by 2 for worse roasts
  clickCount += 2;
  localStorage.setItem("sarcastic_clicks_" + today, clickCount.toString());

  showLoadingThen(() => {
    const newQuote = generateSarcasticQuote(clickCount);

    buzzerSound.play();
    flashTruthBomb();
    showConfetti();

    updateMeter(clickCount);
    applyFatigueEffect(clickCount);

    dailyQuote.innerText = newQuote;

    if (window.glitchInterval) clearInterval(window.glitchInterval);
    window.glitchInterval = glitchText(dailyQuote);

    changeButtonText();
  });
}

// Personalized roast button
function handlePersonalRoast() {
  const inputVal = userInput.value.trim();
  if (!inputVal) {
    alert("Please enter a name or phrase to roast!");
    return;
  }

  showLoadingThen(() => {
    const today = new Date().toDateString();
    let clickCount = parseInt(localStorage.getItem("sarcastic_clicks_" + today)) || 0;
    clickCount++;
    localStorage.setItem("sarcastic_clicks_" + today, clickCount.toString());

    const newQuote = generateSarcasticQuote(clickCount, inputVal);

    laughSound.play();
    updateMeter(clickCount);
    applyFatigueEffect(clickCount);

    dailyQuote.innerText = newQuote;

    if (window.glitchInterval) clearInterval(window.glitchInterval);
    if (clickCount >= overloadStart) {
      window.glitchInterval = glitchText(dailyQuote);
    }

    changeButtonText();
  });
}

// Show stored quote or generate new one on page load
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
  updateMeter(clickCount);
  applyFatigueEffect(clickCount);

  if (clickCount >= 3) {
    sorryBtn.style.display = "inline-block";
  }
}

// Periodic updates for greeting and clock (nickname fixed per session)
function update() {
  updateClock();
}
setInterval(update, 1000);

// Initial page load
updateGreeting();
updateClock();
showDailyQuote();

// Event listeners
motivationBtn.addEventListener("click", handleMotivationClick);
sorryBtn.addEventListener("click", handleSorryClick);
personalRoastBtn.addEventListener("click", handlePersonalRoast);
