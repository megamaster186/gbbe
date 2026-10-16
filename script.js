// Gallery cards open a small message modal. Replace the emojis with your own photos if you like.
const modal = document.getElementById("photoModal");
const modalCaption = document.getElementById("modalCaption");
const modalEmoji = document.getElementById("modalEmoji");
const photoEmojis = ["🌤️", "🌿", "🌷", "🌅", "🎧", "✨"];

document.querySelectorAll(".photo-card").forEach((card, index) => {
  card.addEventListener("click", () => {
    modalCaption.textContent = card.dataset.caption || "A little moment ♡";
    modalEmoji.textContent = photoEmojis[index % photoEmojis.length];
    modal.hidden = false;
  });
});

function closeModal() { modal.hidden = true; }
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOkay").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });

// Interactive question.
const answerResult = document.getElementById("answerResult");
document.querySelectorAll(".answer-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".answer-button").forEach((other) => other.classList.remove("selected"));
    button.classList.add("selected");
    answerResult.textContent = `Excellent choice: ${button.dataset.answer} ♡`;
  });
});

// Hidden surprise.
document.getElementById("surpriseButton").addEventListener("click", () => {
  const result = document.getElementById("surpriseResult");
  result.hidden = false;
  document.getElementById("surpriseButton").textContent = "Surprise unlocked ✨";
  document.getElementById("surpriseButton").disabled = true;
});

// Letter reveal.
document.getElementById("letterButton").addEventListener("click", () => {
  const content = document.getElementById("letterContent");
  content.hidden = !content.hidden;
  document.getElementById("letterButton").textContent = content.hidden ? "Open the note ✉" : "Fold the note ♡";
  if (!content.hidden) content.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Gentle floating hearts when a visitor clicks the page.
const sparkleLayer = document.querySelector(".sparkle-layer");
document.addEventListener("click", (event) => {
  if (event.target.closest("button, a")) return;
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = ["♡", "✧", "♥"][Math.floor(Math.random() * 3)];
  heart.style.left = `${Math.min(96, Math.max(4, (event.clientX / window.innerWidth) * 100))}%`;
  heart.style.fontSize = `${14 + Math.random() * 16}px`;
  sparkleLayer.appendChild(heart);
  window.setTimeout(() => heart.remove(), 3300);
});

// Personalize the name shown in the heading by editing the text in index.html.
// The soundtrack links open YouTube search results in a new tab; no audio files are bundled.


// Local soundtrack: choose a track and continue automatically through the playlist.
const localPlayer = document.getElementById('localMusicPlayer');
const nowPlaying = document.getElementById('nowPlaying');
const trackButtons = [...document.querySelectorAll('.track-select[data-audio]')];
let currentTrackIndex = 0;

function selectTrack(index, shouldPlay = true) {
  if (!localPlayer || !trackButtons.length) return;
  currentTrackIndex = (index + trackButtons.length) % trackButtons.length;
  const button = trackButtons[currentTrackIndex];
  localPlayer.src = button.dataset.audio;
  localPlayer.load();
  if (nowPlaying) nowPlaying.textContent = `Now playing: ${button.dataset.title} ♡`;
  trackButtons.forEach((item, i) => {
    item.setAttribute('aria-pressed', String(i === currentTrackIndex));
    item.textContent = i === currentTrackIndex ? '♫' : '▶';
  });
  if (shouldPlay) {
    const playPromise = localPlayer.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        if (nowPlaying) nowPlaying.textContent = 'Tap play on the audio player to start your song. ♡';
      });
    }
  }
}

trackButtons.forEach((button, index) => {
  button.addEventListener('click', () => selectTrack(index, true));
});
if (localPlayer) {
  localPlayer.addEventListener('ended', () => selectTrack(currentTrackIndex + 1, true));
}
