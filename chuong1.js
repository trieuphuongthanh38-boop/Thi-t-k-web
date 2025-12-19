document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("chapterAudio");
  const playBtn = document.getElementById("aPlayBtn");
  const seek = document.getElementById("aSeek");
  const curEl = document.getElementById("aCur");
  const durEl = document.getElementById("aDur");
  const muteBtn = document.getElementById("aMuteBtn");
  const vol = document.getElementById("aVol");
  const settingBtn = document.getElementById("aSettingBtn");
  const settings = document.getElementById("aSettings");
  const speed = document.getElementById("aSpeed");

  if (!audio || !playBtn || !seek) return;

  const icon = (btn, cls) => {
    const i = btn.querySelector("i");
    if (!i) return;
    i.className = cls;
  };

  const fmt = (sec) => {
    if (!isFinite(sec)) return "00:00";
    sec = Math.max(0, sec);
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // metadata loaded => set duration + range max
  audio.addEventListener("loadedmetadata", () => {
    durEl.textContent = fmt(audio.duration);
    seek.max = String(audio.duration || 0);
  });

  // play / pause
  playBtn.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (e) {
        // autoplay policy / missing file will show in console
        console.error(e);
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => icon(playBtn, "fa-solid fa-pause"));
  audio.addEventListener("pause", () => icon(playBtn, "fa-solid fa-play"));
  audio.addEventListener("ended", () => icon(playBtn, "fa-solid fa-play"));

  // time update
  audio.addEventListener("timeupdate", () => {
    curEl.textContent = fmt(audio.currentTime);
    if (!seek.dragging) seek.value = String(audio.currentTime);
  });

  // seeking
  const startDrag = () => (seek.dragging = true);
  const endDrag = () => {
    seek.dragging = false;
    audio.currentTime = Number(seek.value || 0);
  };

  seek.addEventListener("pointerdown", startDrag);
  seek.addEventListener("pointerup", endDrag);
  seek.addEventListener("input", () => {
    // preview time while dragging
    curEl.textContent = fmt(Number(seek.value || 0));
  });
  // fallback for keyboard seek
  seek.addEventListener("change", () => {
    audio.currentTime = Number(seek.value || 0);
  });

  // volume
  vol.addEventListener("input", () => {
    audio.volume = Number(vol.value);
    audio.muted = (audio.volume === 0);
    icon(muteBtn, audio.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high");
  });

  // mute
  muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    icon(muteBtn, audio.muted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high");
  });

  // settings toggle
  settingBtn.addEventListener("click", () => {
    const isHidden = settings.hasAttribute("hidden");
    if (isHidden) settings.removeAttribute("hidden");
    else settings.setAttribute("hidden", "");
  });

  // playback speed
  speed.addEventListener("change", () => {
    audio.playbackRate = Number(speed.value);
  });

  // init defaults
  audio.volume = 1;
  audio.playbackRate = 1;
  curEl.textContent = "00:00";
  durEl.textContent = "00:00";
  icon(playBtn, "fa-solid fa-play");
  icon(muteBtn, "fa-solid fa-volume-high");
});
