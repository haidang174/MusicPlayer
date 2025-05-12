document.addEventListener("DOMContentLoaded", function () {
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

      // Ẩn tất cả section
      Object.values(sections).forEach(id => {
        const section = document.getElementById(id);
        if (section) section.classList.add("hidden");
      });

      // Hiện section được chọn
      if (sections[selected]) {
        const section = document.getElementById(sections[selected]);
        if (section) section.classList.remove("hidden");
      }

      // Bỏ class active ở tất cả item
      navItems.forEach(nav => nav.parentElement.classList.remove("active"));

      // Thêm class active vào item được click
      this.parentElement.classList.add("active");
    });
  });
});

//Chuyển sáng/tối
document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector(".checkbox");

  checkbox.addEventListener("change", function () {
    const root = document.documentElement;
    const isLight = this.checked;

    root.style.setProperty("--dark-theme-color", getComputedStyle(root).getPropertyValue(isLight ? "--light-theme-color" : "--secondary-color"));
  });
});

// Music Player
document.addEventListener("DOMContentLoaded", function () {
  // Yêu thích
  const likeBtn = document.querySelector(".like-btn");

  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("active");
  });

  // Play - Pause
  const playPauseBtn = document.querySelector(".pause-play");

  playPauseBtn.addEventListener("click", function () {
    playPauseBtn.classList.toggle("active");
  });

  // Các nút khác
  const actionButtons = document.querySelectorAll(".player-actions .btn1");

  actionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  });

  // Thanh nhạc chạy
  const progressBar = document.querySelector(".progress-bar");

  // Hàm cập nhật màu thanh tiến trình
  function updateProgressBarColor(value) {
    const percentage = value;
    progressBar.style.background = `linear-gradient(to right, #f72585 0%, #f72585 ${percentage}%, var(--text-color) ${percentage}%, var(--text-color) 100%)`;
  }

  // Lắng nghe sự kiện input (kéo thanh)
  progressBar.addEventListener("input", function () {
    // Cập nhật màu khi người dùng kéo thanh
    updateProgressBarColor(this.value);

    // Lưu giá trị thanh tiến trình vào localStorage
    localStorage.setItem("progress", this.value);
  });

  // Kiểm tra xem có giá trị nào đã lưu trong localStorage không
  const savedProgress = localStorage.getItem("progress");
  if (savedProgress !== null) {
    progressBar.value = savedProgress; // Đặt lại giá trị thanh tiến trình
    updateProgressBarColor(savedProgress); // Cập nhật màu cho thanh tiến trình
  }

  // Thanh âm thanh
  const volumeBar = document.querySelector(".volume-bar");

  // Hàm cập nhật màu thanh tiến trình
  function updateVolumeBarColor(value) {
    const percentage = value;
    volumeBar.style.background = `linear-gradient(to right, #f72585 0%, #f72585 ${percentage}%, var(--text-color) ${percentage}%, var(--text-color) 100%)`;
  }

  // Lắng nghe sự kiện input (kéo thanh)
  volumeBar.addEventListener("input", function () {
    // Cập nhật màu khi người dùng kéo thanh
    updateVolumeBarColor(this.value);

    // Lưu giá trị thanh tiến trình vào localStorage
    localStorage.setItem("volume", this.value);
  });

  // Kiểm tra xem có giá trị nào đã lưu trong localStorage không
  const savedVolume = localStorage.getItem("volume");
  if (savedVolume !== null) {
    volumeBar.value = savedVolume; // Đặt lại giá trị thanh tiến trình
    updateVolumeBarColor(savedVolume); // Cập nhật màu cho thanh tiến trình
  }

  // Đóng mở Playlist
  const toggleBtn = document.getElementById("playlistToggle");
  const sidebar = document.getElementById("playlistSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  toggleBtn.addEventListener("click", () => {
    const isShown = sidebar.classList.toggle("show");
    toggleBtn.classList.toggle("active", isShown);
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show");
    toggleBtn.classList.remove("active");
  });
});
