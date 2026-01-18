let points = 0;
let energy = 100;
let lastRefill = Date.now();

const pointsEl = document.getElementById('points');
const energyEl = document.getElementById('energy');
const tapBtn = document.getElementById('tapBtn');
const noEnergyBox = document.getElementById('noEnergy');
const watchAdBtn = document.getElementById('watchAdBtn');
const cooldownText = document.getElementById('cooldownText');
const adArea = document.getElementById('adArea');
const closeAdBtn = document.getElementById('closeAdBtn');

function updateUI() {
  pointsEl.textContent = points;
  energyEl.textContent = energy;

  if (energy <= 0) {
    tapBtn.disabled = true;
    noEnergyBox.classList.remove('hidden');
  } else {
    tapBtn.disabled = false;
    noEnergyBox.classList.add('hidden');
  }
}

tapBtn.addEventListener('click', () => {
  if (energy > 0) {
    points += 1;
    energy -= 1;
    updateUI();
  }
});

watchAdBtn.addEventListener('click', () => {
  // Qui inserirai il codice Monetag reale
  adArea.classList.remove('hidden');
  noEnergyBox.classList.add('hidden');
});

closeAdBtn.addEventListener('click', () => {
  // Simulazione: dopo la "pubblicità", ricarichiamo energia
  energy = 100;
  lastRefill = Date.now();
  adArea.classList.add('hidden');
  updateUI();
});

// (Opzionale) Ricarica automatica dopo 1 ora
setInterval(() => {
  const now = Date.now();
  const diff = now - lastRefill;
  const oneHour = 60 * 60 * 1000;

  if (energy <= 0 && diff >= oneHour) {
    energy = 100;
    lastRefill = now;
    updateUI();
  } else if (energy <= 0) {
    const remaining = oneHour - diff;
    const minutes = Math.ceil(remaining / 60000);
    cooldownText.textContent = `Puoi ricaricare tra circa ${minutes} minuti.`;
  }
}, 10000);

updateUI();
