import {
  renderPieChart,
  renderDeviceGallery,
  renderSelectedDeviceCards,
} from "./ui.js";
import { calculateKwh, calculateCost } from "./calculator.js";

// Load data perangkat dari devices.json
async function loadDevices() {
  const response = await fetch("/src/data/devices.json");
  const devices = await response.json();
  return devices;
}

let selectedDevices = [];
let chartInstance = null; // Tambahkan ini

function showModal(show) {
  document
    .getElementById("deviceGalleryModal")
    .classList.toggle("hidden", !show);
}

function handleDeviceRemove(device) {
  selectedDevices = selectedDevices.filter((d) => d.id !== device.id);
  updateChart();
  renderSelectedDeviceCards(
    selectedDevices,
    handleDeviceRemove,
    handleDurationChange
  );
}

function handleDeviceSelect(device) {
  // Tambahkan perangkat ke daftar terpilih (tanpa duplikat)
  if (!selectedDevices.some((d) => d.id === device.id)) {
    selectedDevices.push({ ...device, hours: 8 }); // default 8 jam
    updateChart();
    renderSelectedDeviceCards(
      selectedDevices,
      handleDeviceRemove,
      handleDurationChange
    );
  }
  showModal(false);
}

function handleDurationChange(device, hours) {
  selectedDevices = selectedDevices.map((d) =>
    d.id === device.id ? { ...d, hours } : d
  );
  updateChart();
  renderSelectedDeviceCards(
    selectedDevices,
    handleDeviceRemove,
    handleDurationChange
  );
}

function updateChart() {
  const labels = selectedDevices.map((d) => d.name);
  const tariff = 1500;
  const data = selectedDevices.map((d) => {
    const kwh = calculateKwh(d.watt, d.hours ?? 8);
    return calculateCost(kwh, tariff);
  });
  const ctx = document.getElementById("pieChart").getContext("2d");
  chartInstance = renderPieChart(ctx, data, labels, chartInstance);
  renderSelectedDeviceCards(
    selectedDevices,
    handleDeviceRemove,
    handleDurationChange
  );
}

// Inisialisasi gallery dan event modal
loadDevices().then((devices) => {
  document.getElementById("openGalleryBtn").onclick = () => {
    renderDeviceGallery(devices, handleDeviceSelect);
    showModal(true);
  };
  document.getElementById("closeGalleryBtn").onclick = () => showModal(false);

  // Default: tampilkan chart kosong dan cards kosong
  updateChart();
});
