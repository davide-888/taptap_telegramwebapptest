let adsWatched = 0;

const counter = document.getElementById("counter");
const watchAdBtn = document.getElementById("watchAdBtn");
const adBox = document.getElementById("adBox");
const closeAdBtn = document.getElementById("closeAdBtn");

watchAdBtn.addEventListener("click", () => {
  adBox.classList.remove("hidden");
});

closeAdBtn.addEventListener("click", () => {
  adBox.classList.add("hidden");
  adsWatched++;
  counter.textContent = "Pubblicità guardate: " + adsWatched;
});
