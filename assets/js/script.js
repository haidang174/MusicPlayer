const navLinks = document.querySelectorAll(".nav-link");
const mainContent = document.getElementById("main-content");

const contentMap = {
  thu_vien: "<h2>Trang chủ</h2><p>Chào mừng bạn đến với trang chủ!</p>",
  kham_pha: "<h2>Nhạc</h2><p>Danh sách bài hát đang phát...</p>",
  bang_xep_hang: "<h2>Giới thiệu</h2><p>Ứng dụng nghe nhạc đơn giản.</p>"
};

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // ngăn chuyển trang

    // Đổi nội dung
    const key = link.getAttribute("data-content");
    mainContent.innerHTML = contentMap[key] || "<p>Không tìm thấy nội dung.</p>";

    // Làm nổi bật nav đang chọn
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

//Chuyển sáng/tối
const checkbox = document.querySelector(".checkbox");

checkbox.addEventListener("change", function () {
  const root = document.documentElement;
  const isLight = this.checked;

  root.style.setProperty("--dark-theme-color", getComputedStyle(root).getPropertyValue(isLight ? "--light-theme-color" : "--secondary-color"));
});

//Music player
document.addEventListener("DOMContentLoaded", function () {
  const likeBtn = document.querySelector(".like-btn");

  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const playPauseBtn = document.querySelector(".pause-play");

  playPauseBtn.addEventListener("click", function () {
    playPauseBtn.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
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

  const actionButtons = document.querySelectorAll(".player-actions .btn1");

  actionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  });

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

  // Gọi 1 lần khi trang load (nếu có giá trị đã lưu trong localStorage)
  if (savedProgress !== null) {
    updateProgressBarColor(savedProgress);
  }

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

  // Gọi 1 lần khi trang load (nếu có giá trị đã lưu trong localStorage)
  if (savedVolume !== null) {
    updateVolumeBarColor(savedVolume);
  }
});
