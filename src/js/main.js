import { renderPieChart } from "./ui.js";
import { calculateKwh, calculateCost } from "./calculator.js";

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
  // Asumsi durasi 8 jam/hari, tarif Rp1500/kWh
  const hours = 8;
  const tariff = 1500;
  const data = devices.slice(0, 4).map((d) => {
    const kwh = calculateKwh(d.watt, hours);
    return calculateCost(kwh, tariff);
  });
  const ctx = document.getElementById("pieChart").getContext("2d");
  renderPieChart(ctx, data, labels);
});
