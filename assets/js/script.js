const playlist = [
  {
    src: "./assets/music/khong-the-say.mp3",
    title: "Không thể say",
    singer: "HIEUTHUHAI",
    img: "./assets/img/hieuthuhai-1.jpg"
  },
  {
    src: "./assets/music/them-bao-nhieu-lau.mp3",
    title: "Thêm Bao Nhiêu Lâu",
    singer: "Đạt G",
    img: "./assets/img/datg.jpg"
  },
  {
    src: "./assets/music/dung-lo-anh-doi-ma.mp3",
    title: "Đừng Lo Anh Đợi Mà",
    singer: "Mr. Siro",
    img: "./assets/img/mrsiro.jpg"
  },
  {
    src: "./assets/music/co-nhu-khong-co.mp3",
    title: "Có Như Không Có",
    singer: "Hiền Hồ, Đạt G",
    img: "./assets/img/hienho-datg.jpg"
  },
  {
    src: "./assets/music/danh-mat-em.mp3",
    title: "Đánh Mất Em",
    singer: "Quang Đăng Trần",
    img: "./assets/img/quangdangtran.jpg"
  },
  {
    src: "./assets/music/bong-hoa-dep-nhat.mp3",
    title: "Bông Hoa Đẹp Nhất",
    singer: "Quân A.P",
    img: "./assets/img/quanap.jpg"
  },
  {
    src: "./assets/music/mat-ket-noi.mp3",
    title: "Mất Kết Nối",
    singer: "Dương DOMIC",
    img: "./assets/img/duongdomic.jpg"
  },
  {
    src: "./assets/music/co-tat-ca-nhung-thieu-anh.mp3",
    title: "Có Tất Cả Nhưng Thiếu Anh",
    singer: "Erik",
    img: "./assets/img/erik.jpg"
  },
  {
    src: "./assets/music/anh-thuong-em-nhat-ma.mp3",
    title: "Anh Thương Em Nhất Mà",
    singer: "Lã., Log, TiB",
    img: "./assets/img/anhthuongemnhatma.jpg"
  }
];

document.addEventListener("DOMContentLoaded", function () {
  // =============== NAVIGATION ===============
  const navItems = document.querySelectorAll(".navbar-item a");
  const sections = {
    "Thư viện": "library",
    "Khám phá": "discover",
    "Bảng xếp hạng": "ranking",
    "Chủ đề & thể loại": "categories",
    "Nghe gần đây": "recent",
    "Bài hát yêu thích": "favorites",
    Playlist: "playlist",
    Album: "album"
  };

  navItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const selected = this.querySelector("span").textContent.trim();
      Object.values(sections).forEach(id => {
        const section = document.getElementById(id);
        if (section) section.classList.add("hidden");
      });
      if (sections[selected]) {
        const section = document.getElementById(sections[selected]);
        if (section) section.classList.remove("hidden");
      }
      navItems.forEach(nav => nav.parentElement.classList.remove("active"));
      this.parentElement.classList.add("active");
    });
  });

  // =============== THEME TOGGLE ===============
  const checkbox = document.querySelector(".checkbox");
  checkbox.addEventListener("change", function () {
    const root = document.documentElement;
    const isLight = this.checked;
    root.style.setProperty("--dark-theme-color", getComputedStyle(root).getPropertyValue(isLight ? "--light-theme-color" : "--secondary-color"));
  });

  // =============== MUSIC PLAYER CORE ===============
  const audio = document.getElementById("audio");
  const playPauseBtn = document.querySelector(".pause-play");
  const likeBtn = document.querySelector(".like-btn");
  const progressBar = document.querySelector(".progress-bar");
  const currentTime = document.querySelector(".current-time");
  const durationTime = document.querySelector(".duration");
  const volumeBar = document.querySelector(".volume-bar");
  const posterImg = document.querySelector(".music-player .poster img");
  const titleEl = document.querySelector(".music-player .description h3");
  const singerEl = document.querySelector(".music-player .description h5");
  const actionBtn = document.querySelector(".btn .btn1");

  // =============== ACTION BUTTONS ===============
  let currentIndex = 0;
  let isShuffle = false;
  let isRepeat = false;

  const btnNext = document.querySelector(".bx-last-page");
  const btnPrev = document.querySelector(".bx-first-page");
  const btnShuffle = document.querySelector(".bx-shuffle").parentElement;
  const btnRepeat = document.querySelector(".bx-repeat").parentElement;

  const toggleBtn = document.getElementById("playlistToggle");
  const sidebar = document.getElementById("playlistSidebar");

  const songItems = document.querySelectorAll(".item[data-src]");

  // =============== LIKE BUTTON ===============
  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("active");
  });

  btnShuffle.addEventListener("click", function () {
    btnShuffle.classList.toggle("active");
  });

  btnRepeat.addEventListener("click", function () {
    btnRepeat.classList.toggle("active");
  });

  // =============== PLAY / PAUSE BUTTON ===============
  playPauseBtn.addEventListener("click", function () {
    if (audio.src) {
      if (audio.paused) {
        audio.play();
        this.classList.add("active");
      } else {
        audio.pause();
        this.classList.remove("active");
      }
    }
  });

  // =============== LOAD METADATA ===============
  audio.addEventListener("loadedmetadata", () => {
    if (!isNaN(audio.duration)) {
      progressBar.max = audio.duration;
      progressBar.value = 0;
      durationTime.textContent = formatTime(audio.duration);
      updateProgressBarColor(0);
    }
  });

  // =============== UPDATE PROGRESS BAR ===============
  audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      const current = audio.currentTime;
      const total = audio.duration;
      const percent = (current / total) * 100;

      progressBar.value = current;
      currentTime.textContent = formatTime(current);
      updateProgressBarColor(percent);
    }
  });

  progressBar.addEventListener("input", function () {
    if (!isNaN(audio.duration) && audio.duration > 0) {
      const seekTime = parseFloat(this.value);
      audio.currentTime = seekTime;
      const percent = (seekTime / audio.duration) * 100;
      updateProgressBarColor(percent);
    }
  });

  function updateProgressBarColor(percent) {
    progressBar.style.background = `linear-gradient(to right, #f72585 0%, #f72585 ${percent}%, var(--text-color) ${percent}%, var(--text-color) 100%)`;
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  // =============== VOLUME BAR ===============
  const savedVolume = localStorage.getItem("volume");
  const initialVolume = savedVolume !== null ? savedVolume : 70;
  volumeBar.value = initialVolume;
  audio.volume = initialVolume / 100;
  updateVolumeBarColor(initialVolume);

  volumeBar.addEventListener("input", function () {
    const volume = this.value;
    audio.volume = volume / 100;
    updateVolumeBarColor(volume);
    localStorage.setItem("volume", volume);
  });

  function updateVolumeBarColor(value) {
    volumeBar.style.background = `linear-gradient(to right, #f72585 0%, #f72585 ${value}%, var(--text-color) ${value}%, var(--text-color) 100%)`;
  }

  // =============== PLAYLIST SIDEBAR ===============
  toggleBtn.addEventListener("click", () => {
    const isShown = sidebar.classList.toggle("show");
    toggleBtn.classList.toggle("active", isShown);
  });

  // =============== LOAD SONG ===============
  function loadSong(index) {
    const song = playlist[index];
    if (!song) return;

    audio.src = song.src;
    audio.load();

    titleEl.textContent = song.title;
    singerEl.textContent = song.singer;
    posterImg.src = song.img;

    audio
      .play()
      .then(() => {
        playPauseBtn.classList.add("active");
      })
      .catch(err => {
        console.error("Lỗi phát nhạc:", err);
      });
  }

  // =============== NEXT SONG ===============
  function playNext() {
    if (isShuffle) {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * playlist.length);
      } while (newIndex === currentIndex);
      currentIndex = newIndex;
    } else {
      currentIndex = (currentIndex + 1) % playlist.length;
    }
    loadSong(currentIndex);
  }

  // =============== PREVIOUS SONG ===============
  function playPrevious() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentIndex);
  }

  // =============== REPEAT SONG ===============
  audio.addEventListener("ended", () => {
    if (isRepeat) {
      audio.currentTime = 0;
      audio.play();
    } else {
      playNext();
    }
  });
  // =============== PLAY SONG WHEN CLICKED ===============
  btnNext.addEventListener("click", () => {
    playNext();
  });

  btnPrev.addEventListener("click", () => {
    playPrevious();
  });

  btnShuffle.addEventListener("click", () => {
    isShuffle = !isShuffle;
    btnShuffle.classList.toggle("active", isShuffle);
  });

  btnRepeat.addEventListener("click", () => {
    isRepeat = !isRepeat;
    btnRepeat.classList.toggle("active", isRepeat);
  });

  songItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      loadSong(currentIndex);
    });
  });

  // Nút chuyển tab
  const btnLyrics = document.querySelector(".btn-lyrics");
  const btnComment = document.querySelector(".btn-comment");
  const sectionLyrics = document.getElementById("lyrics");
  const sectionComment = document.getElementById("comment");

  // Mặc định: hiện lyrics
  sectionLyrics.classList.remove("hidden");
  sectionComment.classList.add("hidden");
  btnLyrics.classList.add("active");
  btnComment.classList.remove("active");

  btnLyrics.addEventListener("click", () => {
    sectionLyrics.classList.remove("hidden");
    sectionComment.classList.add("hidden");
    btnLyrics.classList.add("active");
    btnComment.classList.remove("active");
  });

  btnComment.addEventListener("click", () => {
    sectionLyrics.classList.add("hidden");
    sectionComment.classList.remove("hidden");
    btnLyrics.classList.remove("active");
    btnComment.classList.add("active");
  });

  const commentList = document.getElementById("commentList");
  const commentInput = document.getElementById("commentInput");
  const submitComment = document.getElementById("submitComment");

  submitComment.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if (text !== "") {
      const newComment = document.createElement("div");
      newComment.classList.add("comment-item");
      newComment.innerHTML = `<p><strong>Bạn:</strong> ${text}</p>`;
      commentList.appendChild(newComment);

      commentInput.value = "";
      commentList.scrollTop = commentList.scrollHeight; // Cuộn xuống cuối
    }
  });
});
