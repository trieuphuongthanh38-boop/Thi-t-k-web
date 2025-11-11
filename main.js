// Dark/Light toggle demo (chưa có yêu cầu nhưng mình để hook sẵn)
const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

// Bạn có thể tùy biến sau:
// - load data động
// - click "Xem Thêm" để append thêm item
const xemThemBtn = document.querySelector(".latest-more-btn");
if (xemThemBtn) {
    xemThemBtn.addEventListener("click", () => {
        alert("TODO: load thêm truyện mới cập nhật");
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const accountItem = document.querySelector(".nav-item.nav-account");
    if (!accountItem) return;

    accountItem.addEventListener("click", function (e) {
        e.stopPropagation();
        accountItem.classList.toggle("open");
    });

    document.addEventListener("click", function () {
        accountItem.classList.remove("open");
    });
});
