document.addEventListener("DOMContentLoaded", () => {
  const btnMore = document.getElementById("btnMoreChapter");
  if (!btnMore) return;

  const batchSize = 3;

  function getHiddenRows() {
    return Array.from(document.querySelectorAll(".chapter-row.is-hidden"));
  }

  if (getHiddenRows().length === 0) btnMore.style.display = "none";

  btnMore.addEventListener("click", () => {
    const hidden = getHiddenRows();
    hidden.slice(0, batchSize).forEach(row => row.classList.remove("is-hidden"));

    if (getHiddenRows().length === 0) {
      btnMore.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const audioBtn = document.querySelector(".audio-btn");
  if (!audioBtn) return;

  const icon = audioBtn.querySelector("i");
  const audioSrc = audioBtn.dataset.audio;

  const audio = new Audio(audioSrc);
  let isPlaying = false;

  audioBtn.addEventListener("click", () => {
    if (!isPlaying) {
      audio.play();
      isPlaying = true;

      icon.classList.remove("fa-play");
      icon.classList.add("fa-pause");

      audioBtn.classList.add("playing");
    } else {
      // ❚❚ PAUSE
      audio.pause();
      isPlaying = false;

      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");

      audioBtn.classList.remove("playing");
    }
  });

  // Khi audio chạy hết → reset icon
  audio.addEventListener("ended", () => {
    isPlaying = false;
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    audioBtn.classList.remove("playing");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const sortBtn = document.getElementById("sortChapterBtn");
  const chapterList = document.querySelector(".chapter-list");

  if (!sortBtn || !chapterList) return;

  let isAsc = false; // false = 8→1 | true = 1→8

  // Lấy số chương từ text
  function getChapterNumber(row) {
    const text = row.querySelector(".part").textContent;
    const match = text.match(/Chương\s+(-?\d+)/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  sortBtn.addEventListener("click", () => {
    const rows = Array.from(chapterList.children);

    rows.sort((a, b) => {
      const numA = getChapterNumber(a);
      const numB = getChapterNumber(b);
      return isAsc ? numA - numB : numB - numA;
    });

    // Gắn lại DOM theo thứ tự mới
    rows.forEach(row => chapterList.appendChild(row));

    // Toggle trạng thái
    isAsc = !isAsc;

    // Đổi hướng icon (optional cho UX)
    const icon = sortBtn.querySelector("i");
    icon.classList.toggle("asc", isAsc);
  });
});
