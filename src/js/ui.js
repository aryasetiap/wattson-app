import Chart from "chart.js/auto";

// Fungsi untuk render Pie Chart konsumsi listrik
export function renderPieChart(ctx, data, labels, prevChart) {
  if (prevChart) {
    prevChart.destroy();
  }
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

// Render device gallery cards
export function renderDeviceGallery(devices, onSelect) {
  const gallery = document.getElementById("deviceGallery");
  gallery.innerHTML = "";
  devices.forEach((device) => {
    const card = document.createElement("button");
    card.className =
      "card flex flex-col items-center gap-2 border hover:border-blue-500 transition";
    card.innerHTML = `
      <img src="${device.icon}" alt="${device.name}" class="w-12 h-12 object-contain" />
      <span class="font-semibold text-gray-700 text-sm">${device.name}</span>
      <span class="text-xs text-gray-400">${device.category}</span>
    `;
    card.onclick = () => onSelect(device);
    gallery.appendChild(card);
  });
}
