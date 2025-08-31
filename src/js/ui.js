export function initSidebarNav() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebarNav = document.getElementById("sidebarNav");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");

  hamburgerBtn.addEventListener("click", () => {
    sidebarNav.classList.remove("translate-x-full");
    sidebarNav.classList.add("translate-x-0");
  });

  closeSidebarBtn.addEventListener("click", () => {
    sidebarNav.classList.remove("translate-x-0");
    sidebarNav.classList.add("translate-x-full");
  });

  // Optional: close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !sidebarNav.contains(e.target) &&
      !hamburgerBtn.contains(e.target) &&
      sidebarNav.classList.contains("translate-x-0")
    ) {
      sidebarNav.classList.remove("translate-x-0");
      sidebarNav.classList.add("translate-x-full");
    }
  });
}
