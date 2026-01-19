watchAdBtn.addEventListener('click', async () => {
  try {
    watchAdBtn.disabled = true;
    watchAdBtn.textContent = 'Loading AD...';

    // --- Monetag Rewarded Interstitial ---
    await show_10488283(); 
    // Quando l'utente finisce l'ad, Monetag risolve la Promise

    // --- Aggiorna il backend ---
    const res = await fetch('/api/ad-watched', {
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
    console.error(err);
  } finally {
    watchAdBtn.disabled = false;
    watchAdBtn.textContent = 'Watch AD';
  }
});
