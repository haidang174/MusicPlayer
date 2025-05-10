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
