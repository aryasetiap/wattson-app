import { renderPieChart } from "./ui.js";

// Load data perangkat dari devices.json
async function loadDevices() {
  const response = await fetch("/src/data/devices.json");
  const devices = await response.json();
  return devices;
}

// Contoh penggunaan: tampilkan nama perangkat di console
loadDevices().then((devices) => {
  console.log(
    "Daftar perangkat:",
    devices.map((d) => d.name)
  );
  // Contoh: ambil 4 perangkat pertama untuk chart
  const labels = devices.slice(0, 4).map((d) => d.name);
  const data = devices.slice(0, 4).map((d) => d.watt * 1000); // contoh kalkulasi
  const ctx = document.getElementById("pieChart").getContext("2d");
  renderPieChart(ctx, data, labels);
});
