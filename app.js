const tg = window.Telegram.WebApp;
tg.expand();

const initDataUnsafe = tg.initDataUnsafe;
const user = initDataUnsafe.user;

// 🔗 BACKEND ONLINE SU RENDER
const BACKEND_URL = "https://taptap-backend-zc5t.onrender.com";

const userInfoEl = document.getElementById('user-info');
const adsCountEl = document.getElementById('ads-count');
const leaderboardEl = document.getElementById('leaderboard');
const watchAdBtn = document.getElementById('watch-ad-btn');
const toastEl = document.getElementById('toast');

let currentTotalAds = 0;

// Mostra nome utente
userInfoEl.textContent = user
  ? `Welcome, ${user.first_name || 'Player'}!`
  : 'Welcome, Player!';

// Toast
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove('hidden');
  toastEl.classList.add('show');

  setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => toastEl.classList.add('hidden'), 250);
  }, 1800);
}

// Aggiorna contatore AD
function updateAdsCount(newCount, gained) {
  currentTotalAds = newCount;
  adsCountEl.textContent = newCount;

  const adWord = gained === 1 ? 'AD' : 'ADs';
  showToast(`You watched ${gained} ${adWord}!`);
}

// Leaderboard
function renderLeaderboard(list) {
  leaderboardEl.innerHTML = '';

  list.forEach((u, index) => {
    const li = document.createElement('li');

    const isMe = u.user_id === user.id;
    if (isMe) li.classList.add('me');

    const name =
      u.username ||
      u.first_name ||
      `Player #${String(u.user_id).slice(-4)}`;

    const left = document.createElement('span');
    left.textContent = `${index + 1}. ${name}`;

    const right = document.createElement('span');
    right.textContent = `${u.ads_watched} ADs`;

    li.appendChild(left);
    li.appendChild(right);
    leaderboardEl.appendChild(li);
  });
}

// Carica dati iniziali
async function loadInitialState() {
  const res = await fetch(`${BACKEND_URL}/api/me?user_id=${user.id}`);
  const data = await res.json();

  currentTotalAds = data.total_ads ?? 0;
  adsCountEl.textContent = currentTotalAds;

  renderLeaderboard(data.leaderboard || []);
}

loadInitialState();

// Bottone Watch AD
watchAdBtn.addEventListener('click', async () => {
  try {
    watchAdBtn.disabled = true;
    watchAdBtn.textContent = 'Loading AD...';

    // Monetag rewarded
    await show_10488283();

    const res = await fetch(`${BACKEND_URL}/api/ad-watched`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        username: user.username,
        first_name: user.first_name
      })
    });

    const data = await res.json();

    updateAdsCount(data.total_ads, data.gained);
    renderLeaderboard(data.leaderboard || []);
  } catch (err) {
    showToast('Something went wrong.');
  } finally {
    watchAdBtn.disabled = false;
    watchAdBtn.textContent = 'Watch AD';
  }
});
