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

export function renderSummary(totalKwh, totalCost) {
  document.getElementById("totalKwh").textContent = `${totalKwh.toFixed(
    2
  )} kWh/hari`;
  document.getElementById(
    "totalCost"
  ).textContent = `Rp ${totalCost.toLocaleString("id-ID")}/hari`;
}

export function renderContributionTable(devices, costArr) {
  const totalCost = costArr.reduce((a, b) => a + b, 0);
  const tbody = document.getElementById("contributionBody");
  tbody.innerHTML = "";
  devices.forEach((device, i) => {
    const percent = totalCost > 0 ? (costArr[i] / totalCost) * 100 : 0;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-1">${device.name}</td>
      <td class="py-1 text-right text-yellow-700">Rp ${costArr[
        i
      ].toLocaleString("id-ID")}</td>
      <td class="py-1 text-right text-gray-500">${percent.toFixed(1)}%</td>
    `;
    tbody.appendChild(row);
  });
}

export function renderRecommendations(devices, costArr) {
  const list = document.getElementById("recommendationList");
  list.innerHTML = "";

  if (devices.length === 0) {
    list.innerHTML =
      "<li>Tambahkan perangkat untuk mendapatkan rekomendasi.</li>";
    return;
  }

  // Cari perangkat dengan biaya terbesar
  const maxCost = Math.max(...costArr);
  const borosIdx = costArr.findIndex((c) => c === maxCost);
  const borosDevice = devices[borosIdx];

  // Rekomendasi utama
  if (borosDevice) {
    list.innerHTML += `<li>
      <b>${
        borosDevice.name
      }</b> adalah perangkat paling boros (Rp ${maxCost.toLocaleString(
      "id-ID"
    )}/hari).
      Kurangi durasi penggunaan <b>${
        borosDevice.name
      }</b> 1 jam/hari untuk hemat energi.
    </li>`;
  }

  // Rekomendasi tambahan
  costArr.forEach((cost, i) => {
    if (cost > 0 && cost !== maxCost) {
      list.innerHTML += `<li>
        Matikan <b>${
          devices[i].name
        }</b> saat tidak digunakan untuk menghemat Rp ${cost.toLocaleString(
        "id-ID"
      )}/hari.
      </li>`;
    }
  });
}

export function renderContextualTips(devices, costArr) {
  const list = document.getElementById("tipsList");
  list.innerHTML = "";

  if (devices.length === 0) {
    list.innerHTML =
      "<li>Pilih perangkat untuk mendapatkan tips hemat energi.</li>";
    return;
  }

  devices.forEach((device, i) => {
    // Tips spesifik berdasarkan kategori dan watt
    if (device.category === "Pendingin" && device.watt >= 700) {
      list.innerHTML += `<li>
        Atur suhu <b>${device.name}</b> pada 24°C dan matikan saat tidak diperlukan.
      </li>`;
    }
    if (device.category === "Dapur" && device.watt >= 700) {
      list.innerHTML += `<li>
        Gunakan <b>${device.name}</b> hanya saat benar-benar diperlukan dan hindari membuka pintu terlalu sering.
      </li>`;
    }
    if (device.name.toLowerCase().includes("lampu")) {
      list.innerHTML += `<li>
        Gunakan <b>${device.name}</b> hanya di ruangan yang sedang digunakan dan matikan saat siang hari.
      </li>`;
    }
    if (device.category === "Gadget" && device.watt < 20) {
      list.innerHTML += `<li>
        Cabut <b>${device.name}</b> dari stop kontak setelah selesai digunakan untuk menghindari standby power.
      </li>`;
    }
    if (device.category === "Utilitas" && device.watt > 200) {
      list.innerHTML += `<li>
        Gunakan <b>${device.name}</b> pada jam hemat listrik (di luar jam 17.00-22.00).
      </li>`;
    }
    // Tips umum jika biaya perangkat > 5000/hari
    if (costArr[i] > 5000) {
      list.innerHTML += `<li>
        Kurangi durasi penggunaan <b>${device.name}</b> untuk menghemat biaya listrik.
      </li>`;
    }
  });

  // Jika tidak ada tips spesifik
  if (list.innerHTML.trim() === "") {
    list.innerHTML =
      "<li>Penggunaan perangkat sudah efisien. Pertahankan kebiasaan baik!</li>";
  }
}
