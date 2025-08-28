import Chart from "chart.js/auto";

// Fungsi untuk render Pie Chart konsumsi listrik
export function renderPieChart(ctx, data, labels) {
  return new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#60A5FA",
            "#FBBF24",
            "#34D399",
            "#F87171",
            "#A78BFA",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Kontribusi Biaya Tiap Perangkat" },
      },
    },
  });
}
