# Wattson App ⚡️

> **Capstone Project: Code Generations and Optimization with IBM Granite Student Developer Initiative**

## Overview

Wattson adalah aplikasi kalkulator jejak energi rumah tangga yang interaktif, membantu masyarakat memahami konsumsi listrik dan biaya secara visual serta mendapatkan rekomendasi hemat energi berbasis data aktual.

## Features

- Pilih perangkat elektronik dari gallery
- Input durasi pemakaian harian
- Kalkulasi otomatis konsumsi listrik (kWh) dan biaya (Rp)
- Visualisasi kontribusi biaya tiap perangkat (Pie Chart)
- Rekomendasi hemat energi otomatis (AI/IBM Granite)
- UI modern, responsif, mobile-first

## Technologies Used

- **Vite**: Build tool & dev server (cepat, modern)
- **Tailwind CSS**: Styling utility-first, responsif
- **JavaScript**: Logic & interaksi
- **Chart.js**: Visualisasi data interaktif
- **IBM Granite**: AI code generation & smart tips
- **Netlify/Vercel**: Deployment SPA

## Setup

1. Clone repo:  
   `git clone https://github.com/arya/wattson-app.git`
2. Install dependencies:  
   `npm install`
3. Jalankan development server:  
   `npm run dev`
4. Buka di browser:  
   `http://localhost:5173`

## AI Support (IBM Granite)

Wattson memanfaatkan IBM Granite untuk:

- Generate data perangkat elektronik (devices.json)
- Membantu pembuatan fungsi kalkulasi
- Menyusun tips hemat energi secara otomatis

**Contoh Prompt & Hasil:**

- Prompt: "Generate a JSON array of 25 common household electronic devices in Indonesia..."
- Hasil: Data perangkat siap pakai di devices.json
- Prompt: "Generate JavaScript function to calculate daily electricity cost..."
- Hasil: Fungsi kalkulasi di calculator.js

## Cara Pakai

1. Pilih perangkat elektronik yang digunakan.
2. Input durasi pemakaian harian.
3. Lihat hasil kalkulasi dan visualisasi.
4. Ikuti rekomendasi hemat energi dari AI.

---

> Untuk detail teknis dan blueprint, lihat [WATTSON.md](./WATTSON.md)
