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
  renderSelectedDeviceCards(selectedDevices, handleDeviceRemove);
}

function handleDeviceSelect(device) {
  // Tambahkan perangkat ke daftar terpilih (tanpa duplikat)
  if (!selectedDevices.some((d) => d.id === device.id)) {
    selectedDevices.push(device);
    updateChart();
    renderSelectedDeviceCards(selectedDevices, handleDeviceRemove);
  }
  showModal(false);
}

function updateChart() {
  const labels = selectedDevices.map((d) => d.name);
  const hours = 8;
  const tariff = 1500;
  const data = selectedDevices.map((d) => {
    const kwh = calculateKwh(d.watt, hours);
    return calculateCost(kwh, tariff);
  });
  const ctx = document.getElementById("pieChart").getContext("2d");
  chartInstance = renderPieChart(ctx, data, labels, chartInstance);
  renderSelectedDeviceCards(selectedDevices, handleDeviceRemove);
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
