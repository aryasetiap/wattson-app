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

// Render device cards yang sudah dipilih
export function renderSelectedDeviceCards(devices, onRemove, onDurationChange) {
  const container = document.getElementById("selectedDevices");
  container.innerHTML = "";
  devices.forEach((device) => {
    const card = document.createElement("div");
    card.className =
      "card flex flex-row items-center gap-3 border border-gray-200 shadow hover:shadow-lg transition relative";
    card.innerHTML = `
      <img src="${device.icon}" alt="${
      device.name
    }" class="w-10 h-10 object-contain" />
      <div class="flex flex-col flex-1">
        <span class="font-semibold text-gray-700 text-sm">${device.name}</span>
        <span class="text-xs text-gray-400">${device.category}</span>
        <span class="text-xs text-green-600">${device.watt}W</span>
        <label class="mt-2 text-xs text-gray-500">Durasi: <span class="font-bold" id="duration-${
          device.id
        }">${device.hours ?? 8}</span> jam/hari</label>
        <input type="range" min="1" max="24" value="${
          device.hours ?? 8
        }" class="w-full accent-blue-600" id="slider-${device.id}" />
      </div>
      <button class="absolute top-2 right-2 text-red-400 hover:text-red-600 text-lg font-bold" title="Hapus">&times;</button>
    `;
    card.querySelector("button").onclick = () => onRemove(device);
    const slider = card.querySelector(`#slider-${device.id}`);
    slider.oninput = (e) => {
      card.querySelector(`#duration-${device.id}`).textContent = e.target.value;
      onDurationChange(device, Number(e.target.value));
    };
    container.appendChild(card);
  });
}
