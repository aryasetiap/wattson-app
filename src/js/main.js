/**
 * Wattson App Main JS
 * Mengelola kalkulasi konsumsi listrik, biaya, dan UI interaktif perangkat.
 * - Memuat data perangkat dari JSON
 * - Render kartu perangkat, gallery, dan chart kontribusi biaya
 * - Kalkulasi kWh dan biaya harian
 * - Navigasi smooth antar section
 */

import { initSidebarNav } from "./ui.js";
import Chart from "chart.js/auto";
import { calculateKwh, calculateCost } from "./calculator.js";

// Tarif listrik default (Rp/kWh)
const TARIFF = 2000;

// State perangkat terpilih
let selectedDevices = [
  { id: "device-014", hours: 8 }, // Laptop
  { id: "device-007", hours: 2 }, // Setrika
  { id: "device-022", hours: 3 }, // Playstation
  { id: "device-004", hours: 5 }, // TV
];

let devicesData = [];
let pieChart;

/**
 * Memuat data perangkat dari file JSON
 */
async function loadDevices() {
  const res = await fetch("devices.json"); // path relatif ke public/
  devicesData = await res.json();
}

/**
 * Render kartu perangkat yang dipilih, slider durasi, dan tombol hapus
 */
function renderDeviceCards() {
  const container = document.getElementById("deviceCardsContainer");
  container.innerHTML = "";
  const chartColors = [
    "#22c55e",
    "#fde68a",
    "#60a5fa",
    "#f87171",
    "#a3e635",
    "#34d399",
  ];
  selectedDevices.forEach((sel, idx) => {
    const device = devicesData.find((d) => d.id === sel.id);
    if (!device) return;
    const color = chartColors[idx % chartColors.length];
    const card = document.createElement("div");
    card.className =
      "relative flex items-center bg-[#22c55e] rounded-2xl shadow-md px-4 py-4 mb-5 max-w-[400px] mx-auto";
    card.innerHTML = `
      <span class="absolute -left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg" style="background:${color};"></span>
      <div class="flex items-center justify-center w-14 h-14 rounded-full bg-[#e6f9ee] mr-4 z-10">
        <img src="${device.icon}" alt="${device.name}" class="w-10 h-10" />
      </div>
      <div class="flex-1 flex flex-col justify-center z-10">
        <div class="font-extrabold text-white text-lg mb-0">${device.name}</div>
        <div class="text-xs text-[#e0f7fa] mb-1">${device.category}</div>
        <div class="text-xs text-white mb-2">Durasi: <span class="font-bold">${sel.hours} jam/hari</span></div>
        <div class="flex items-center gap-2">
          <input type="range" min="1" max="24" value="${sel.hours}" data-idx="${idx}" class="accent-[#fde68a] w-full h-2 rounded-full bg-white" style="appearance: none;" />
        </div>
      </div>
      <button class="ml-4 p-2 rounded-full bg-white hover:bg-[#e6f9ee] transition z-10 flex items-center justify-center" data-remove="${idx}">
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#22c55e" opacity="0.15"/>
          <path d="M6.5 6.5L13.5 13.5M13.5 6.5L6.5 13.5" stroke="#22c55e" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    `;
    container.appendChild(card);
  });

  // Event slider durasi
  container.querySelectorAll("input[type=range]").forEach((slider) => {
    slider.addEventListener("input", (e) => {
      const idx = +e.target.dataset.idx;
      selectedDevices[idx].hours = +e.target.value;
      renderDeviceCards();
      updateCalculations();
    });
  });

  // Event hapus perangkat
  container.querySelectorAll("button[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = +btn.dataset.remove;
      selectedDevices.splice(idx, 1);
      renderDeviceCards();
      updateCalculations();
    });
  });
}

/**
 * Kalkulasi total kWh, biaya, update chart, tabel kontribusi, rekomendasi, dan tips
 */
function updateCalculations() {
  let totalKwh = 0;
  let totalCost = 0;
  let deviceCosts = [];
  selectedDevices.forEach((sel) => {
    const device = devicesData.find((d) => d.id === sel.id);
    if (!device) return;
    const kwh = calculateKwh(device.watt, sel.hours);
    const cost = calculateCost(kwh, TARIFF);
    totalKwh += kwh;
    totalCost += cost;
    deviceCosts.push({ name: device.name, cost, kwh });
  });

  document.getElementById("totalKwh").textContent = `${totalKwh.toFixed(
    2
  )} kWh/hari`;
  document.getElementById("totalBiaya").textContent = `Rp ${Math.round(
    totalCost
  )}/hari`;

  // Update Pie Chart
  if (pieChart) pieChart.destroy();
  const ctx = document.getElementById("pieChart").getContext("2d");
  pieChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: deviceCosts.map((d) => d.name),
      datasets: [
        {
          data: deviceCosts.map((d) => Math.round(d.cost)),
          backgroundColor: [
            "#22c55e",
            "#fde68a",
            "#60a5fa",
            "#f87171",
            "#a3e635",
            "#34d399",
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: "50%",
      plugins: {
        legend: { display: false },
      },
    },
  });

  // Update tabel kontribusi biaya
  const tableBody = document.getElementById("contributionTableBody");
  if (tableBody) {
    tableBody.innerHTML = "";
    const sorted = [...deviceCosts].sort((a, b) => b.cost - a.cost);
    const total = deviceCosts.reduce((sum, d) => sum + d.cost, 0);
    sorted.forEach((d, i) => {
      tableBody.innerHTML += `
        <tr class="${i === 0 ? "bg-[#d1fae5] font-bold" : ""}">
          <td class="py-2 ${i === 0 ? "rounded-l-xl" : ""}">${d.name}</td>
          <td class="py-2">Rp ${Math.round(d.cost)}</td>
          <td class="py-2 ${i === 0 ? "rounded-r-xl" : ""}">${(
        (d.cost / total) *
        100
      ).toFixed(1)}%</td>
        </tr>
      `;
    });
  }

  // Update rekomendasi & tips
  const rekomList = document.getElementById("recommendationList");
  if (rekomList && deviceCosts.length) {
    const boros = deviceCosts.reduce((a, b) => (a.cost > b.cost ? a : b));
    rekomList.innerHTML = `
      <li>${boros.name} paling nguras dompet lo (Rp ${Math.round(
      boros.cost
    )}/hari). Coba dikurangin durasinya, biar makin hemat!</li>
      <li>Jangan lupa matiin ${
        deviceCosts[1]?.name || ""
      } kalo udah nggak dipake, lumayan hemat Rp ${Math.round(
      deviceCosts[1]?.cost || 0
    )}/hari.</li>
      <li>${
        deviceCosts[2]?.name || ""
      } juga, jangan dibiarkan nyala terus, bisa bikin tagihan naik Rp ${Math.round(
      deviceCosts[2]?.cost || 0
    )}/hari.</li>
    `;
  }
  const tipsList = document.getElementById("tipsList");
  if (tipsList && deviceCosts.length) {
    const boros = deviceCosts.reduce((a, b) => (a.cost > b.cost ? a : b));
    tipsList.innerHTML = `
      <li>Pake ${boros.name} seperlunya aja, jangan kebablasan!</li>
      <li>Durasi pemakaian dikurangin dikit, tagihan langsung turun, bro!</li>
    `;
  }
}

/**
 * Render gallery modal untuk memilih perangkat baru
 */
function renderDeviceGallery() {
  const galleryList = document.getElementById("deviceGalleryList");
  galleryList.innerHTML = "";
  const availableDevices = devicesData.filter(
    (d) => !selectedDevices.some((s) => s.id === d.id)
  );
  if (availableDevices.length === 0) {
    galleryList.innerHTML =
      '<div class="col-span-3 text-center text-gray-500 py-6">Semua perangkat sudah dipilih.</div>';
    return;
  }
  availableDevices.forEach((device) => {
    const item = document.createElement("button");
    item.className =
      "flex flex-col items-center bg-[#e6f9ee] rounded-xl p-3 shadow hover:bg-[#22c55e] hover:text-white transition cursor-pointer border-2 border-transparent hover:border-[#22c55e] focus:outline-none";
    item.innerHTML = `
      <img src="${device.icon}" alt="${device.name}" class="w-12 h-12 mb-2" />
      <span class="font-bold text-xs mb-1 text-[#222] group-hover:text-white">${device.name}</span>
      <span class="text-[10px] text-gray-500">${device.category}</span>
    `;
    item.addEventListener("click", () => {
      selectedDevices.push({ id: device.id, hours: 2 });
      renderDeviceCards();
      updateCalculations();
      closeDeviceGallery();
    });
    galleryList.appendChild(item);
  });
}

/**
 * Membuka modal gallery perangkat
 */
function openDeviceGallery() {
  document.getElementById("deviceGalleryModal").classList.remove("hidden");
  renderDeviceGallery();
}

/**
 * Menutup modal gallery perangkat
 */
function closeDeviceGallery() {
  document.getElementById("deviceGalleryModal").classList.add("hidden");
}

// Event buka gallery perangkat
document
  .getElementById("btnPilihBarang")
  .addEventListener("click", openDeviceGallery);

// Event tutup modal gallery
document
  .getElementById("closeGalleryBtn")
  .addEventListener("click", closeDeviceGallery);

// Tutup modal jika klik di luar area modal
document.getElementById("deviceGalleryModal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) closeDeviceGallery();
});

/**
 * Inisialisasi aplikasi saat DOM siap
 */
document.addEventListener("DOMContentLoaded", async () => {
  initSidebarNav();
  await loadDevices();
  renderDeviceCards();
  updateCalculations();
});

/**
 * Scroll smooth ke section tertentu
 * @param {string} id - ID section tujuan
 */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// Sidebar navigation
document.getElementById("navHome").onclick = (e) => {
  e.preventDefault();
  scrollToSection("homeSection");
};
document.getElementById("navAbout").onclick = (e) => {
  e.preventDefault();
  scrollToSection("aboutSection");
};
document.getElementById("navKalkulator").onclick = (e) => {
  e.preventDefault();
  scrollToSection("kalkulatorSection");
};
document.getElementById("navTips").onclick = (e) => {
  e.preventDefault();
  scrollToSection("tipsSection");
};
document.getElementById("navKontak").onclick = (e) => {
  e.preventDefault();
  scrollToSection("footerSection");
};

// Footer navigation
document.getElementById("footerHome").onclick = (e) => {
  e.preventDefault();
  scrollToSection("homeSection");
};
document.getElementById("footerAbout").onclick = (e) => {
  e.preventDefault();
  scrollToSection("aboutSection");
};
document.getElementById("footerKalkulator").onclick = (e) => {
  e.preventDefault();
  scrollToSection("kalkulatorSection");
};

// Button scroll ke kalkulator
const btnGazz = document.getElementById("btnGazz");
if (btnGazz) {
  btnGazz.onclick = (e) => {
    e.preventDefault();
    scrollToSection("kalkulatorSection");
  };
}

const btnCekSekarang = document.getElementById("btnCekSekarang");
if (btnCekSekarang) {
  btnCekSekarang.onclick = (e) => {
    e.preventDefault();
    scrollToSection("kalkulatorSection");
  };
}
