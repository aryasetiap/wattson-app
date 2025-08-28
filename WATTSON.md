# 🟢 Blueprint Proyek: **Wattson** ⚡️

> **Panduan teknis & strategis Capstone Project "Wattson"**  
> _Menjamin pengembangan terarah, memenuhi kriteria, dan selesai tepat waktu._ 🚀

---

## 1️⃣ Ringkasan Proyek

**Nama Aplikasi:**  
**Wattson** (gabungan "Watt" + "Son/San" = "Teman Ahli Energimu")  
_Singkat, cerdas, mudah diingat._ 💡

**Narasi Utama:**

> _"Aksi Iklim Dimulai dari Stop Kontak di Rumah Anda."_ 🌱

**Masalah:**  
Masyarakat, khususnya di kota seperti Pekanbaru, menghadapi kenaikan biaya hidup (termasuk listrik).  
Kesulitan memahami konsumsi listrik harian dalam bentuk nominal (Rp) membuat upaya penghematan kurang efektif. 😕

**Solusi:**  
Wattson adalah **single-page application (SPA)** interaktif sebagai asisten energi personal. 🤖

- Hitung estimasi biaya listrik bulanan secara visual & real-time 📊
- Identifikasi perangkat paling boros 🔍
- Dapatkan rekomendasi penghematan praktis & personal 💬

**Target Output:**  
_Simple Application (sesuai brief HACKTIV8)_ ✅

---

## 2️⃣ Fitur Utama

| Fitur                                 | Deskripsi                                                                                       |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Input Perangkat Interaktif**        | Pilih perangkat dari galeri visual (ikon), muncul sebagai "kartu" dinamis, durasi via slider 🖱️ |
| **Kalkulasi & Visualisasi Real-time** | Mesin kalkulasi cerdas (total biaya & kWh instan), dasbor visual (Pie Chart interaktif) 📈      |
| **Rekomendasi Cerdas & Kontekstual**  | Analisis hasil, tips penghematan relevan & berdampak otomatis 💡                                |
| **Desain Responsif & Modern**         | Mobile-first dengan Tailwind CSS, optimal di berbagai ukuran layar 📱                           |

---

## 3️⃣ Alur Kerja Aplikasi (User Flow)

1. **Inisiasi:**  
   Pengguna membuka aplikasi, melihat halaman utama dengan satu tombol CTA: **+ Tambah Perangkat** ➕

2. **Seleksi Perangkat:**  
   Modal daftar perangkat elektronik (ikon), pilih perangkat yang ingin dihitung 🖼️

3. **Input Durasi:**  
   Kartu perangkat muncul, slider interaktif untuk durasi pemakaian (jam/hari) ⏱️

4. **Kalkulasi & Visualisasi:**

   - Total estimasi biaya bulanan (Rp) 💸
   - Total konsumsi energi (kWh) ⚡️
   - Pie Chart kontribusi biaya tiap perangkat 🥧

5. **Rekomendasi Kontekstual:**  
   Area tips hemat energi relevan, fokus pada perangkat konsumsi tertinggi 📝

---

## 4️⃣ Tumpukan Teknologi

- **Bahasa Inti:** HTML5, CSS3, JavaScript (ES6+ Vanilla JS) 🧑‍💻
- **Styling:** Tailwind CSS (UI responsif & modern) 🎨
- **Visualisasi Data:** Chart.js (Pie Chart interaktif) 📊
- **Deployment:** Netlify / Vercel (langsung dari GitHub) 🚀
- **Alat Bantu:**
  - AI Assistant: IBM Granite 🤖
  - Version Control: Git & GitHub 🗂️
  - UI/UX Design (Opsional): Figma / Excalidraw 🖌️

---

## 5️⃣ Struktur Direktori Proyek

```plaintext
/wattson-app/
├── index.html           # File utama HTML
├── assets/
│   ├── css/
│   │   └── style.css   # CSS kustom (opsional)
│   ├── js/
│   │   ├── main.js     # Logika utama aplikasi
│   │   ├── calculator.js # Fungsi kalkulasi murni
│   │   └── ui.js       # Render komponen UI
│   ├── data/
│   │   └── devices.json # Dataset perangkat elektronik
│   └── icons/
│       ├── ac.svg
│       ├── tv.svg
│       └── ...         # Ikon perangkat lainnya
├── package.json         # (Opsional) Manajemen dependensi
└── README.md            # Dokumentasi lengkap proyek
```

---

## 6️⃣ Deskripsi File Penting

- **index.html:** Struktur dasar aplikasi & kontainer elemen dinamis 🏗️
- **main.js:** Inisialisasi, event listener, integrasi fungsi lain 🔗
- **calculator.js:** Pure functions untuk kalkulasi (tanpa manipulasi DOM) 🧮
- **ui.js:** Render/update UI (kartu perangkat, diagram, modal) 🖼️
- **devices.json:** Array objek perangkat elektronik (`id`, `nama`, `dayaWatt`, `pathIcon`) 📁

---

## 7️⃣ Rencana Pemanfaatan AI (IBM Granite)

| Area                                 | Prompt & Dampak                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Dataset (devices.json)**           | _"Generate a JSON array of 25 common household electronic devices in Indonesia..."_ <br> ➡️ Hemat waktu riset & standarisasi data 🕒 |
| **Logika Kalkulasi (calculator.js)** | _"Write a pure JavaScript function named 'calculateMonthlyCost'..."_ <br> ➡️ Fondasi kalkulasi bebas side effects                    |
| **Konten Rekomendasi**               | _"Write 5 short, practical energy-saving tips in Indonesian..."_ <br> ➡️ Konten berkualitas untuk fitur rekomendasi                  |

---

## 8️⃣ Rencana Eksekusi (Timeline 10 Hari) 📅

| Hari | Aktivitas Utama                                                                                            |
| ---- | ---------------------------------------------------------------------------------------------------------- |
| 1-2  | Inisialisasi repo, struktur direktori, generate devices.json & calculator.js, sketsa UI/UX, setup Tailwind |
| 3-6  | Fitur inti: tambah/hapus perangkat, kartu dengan slider, kalkulasi real-time, render Chart.js              |
| 7-8  | Penyempurnaan styling, transisi, animasi, responsif mobile, pengujian & perbaikan bug                      |
| 9-10 | Dokumentasi README.md, materi presentasi, deployment ke Netlify/Vercel, pengecekan akhir                   |

---

## 9️⃣ Metrik Keberhasilan Proyek 🏆

- **Fungsionalitas:** Semua fitur utama berjalan tanpa bug kritikal 🐞
- **Pengalaman Pengguna:** UI intuitif, mudah digunakan, memberikan "momen pencerahan" ✨
- **Kualitas Kode:** Terstruktur, mudah dibaca, best practice (pemisahan logika, UI, data) 📚
- **Dokumentasi:** README.md & presentasi menjelaskan tujuan, fitur, proses pengembangan (termasuk peran AI) secara komprehensif 📝

---

> **Wattson: Teman Ahli Energimu, Solusi Cerdas untuk Hemat Energi di Rumah!** 🌟
