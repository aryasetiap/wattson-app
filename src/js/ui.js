/**
 * Inisialisasi navigasi sidebar.
 * Fungsi ini mengatur event listener untuk tombol hamburger dan tombol tutup sidebar.
 * Sidebar akan terbuka saat tombol hamburger diklik, dan tertutup saat tombol tutup atau area di luar sidebar diklik.
 */
export function initSidebarNav() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebarNav = document.getElementById("sidebarNav");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");

  hamburgerBtn.addEventListener("click", () => {
    sidebarNav.classList.replace("translate-x-full", "translate-x-0");
  });

  closeSidebarBtn.addEventListener("click", () => {
    sidebarNav.classList.replace("translate-x-0", "translate-x-full");
  });

  document.addEventListener("click", (e) => {
    const isSidebarOpen = sidebarNav.classList.contains("translate-x-0");
    const clickedOutside =
      !sidebarNav.contains(e.target) && !hamburgerBtn.contains(e.target);

    if (isSidebarOpen && clickedOutside) {
      sidebarNav.classList.replace("translate-x-0", "translate-x-full");
    }
  });
}
