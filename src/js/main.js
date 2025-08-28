import { renderPieChart } from "./ui.js";

// Contoh data dummy
const labels = ["Kulkas", "AC", "Lampu", "TV"];
const data = [120000, 240000, 30000, 50000];

const ctx = document.getElementById("pieChart").getContext("2d");
renderPieChart(ctx, data, labels);
