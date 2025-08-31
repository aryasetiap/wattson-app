/**
 * Menghitung konsumsi listrik (kWh) berdasarkan watt dan jam pemakaian.
 * @param {number} watt - Daya perangkat dalam Watt.
 * @param {number} hours - Durasi pemakaian dalam jam.
 * @returns {number} Konsumsi listrik dalam kWh.
 */
export function calculateKwh(watt, hours) {
  return (watt * hours) / 1000;
}

/**
 * Menghitung estimasi biaya listrik (Rp) berdasarkan kWh dan tarif per kWh.
 * @param {number} kwh - Konsumsi listrik dalam kWh.
 * @param {number} tariff - Tarif listrik per kWh dalam Rupiah.
 * @returns {number} Estimasi biaya listrik dalam Rupiah.
 */
export function calculateCost(kwh, tariff) {
  return kwh * tariff;
}

/**
 * Unit test sederhana untuk fungsi kalkulasi listrik.
 * Jalankan di console browser atau Node.js untuk memastikan fungsi berjalan dengan benar.
 */
function testCalculator() {
  const kwh1 = calculateKwh(100, 24);
  const cost1 = calculateCost(kwh1, 1500);
  console.assert(kwh1 === 2.4, "Test kWh gagal");
  console.assert(cost1 === 3600, "Test cost gagal");

  const kwh2 = calculateKwh(800, 8);
  const cost2 = calculateCost(kwh2, 1500);
  console.assert(kwh2 === 6.4, "Test kWh AC gagal");
  console.assert(cost2 === 9600, "Test cost AC gagal");

  console.log("Semua unit test kalkulasi lolos!");
}

// testCalculator();
