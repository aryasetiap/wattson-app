/**
 * Hitung konsumsi listrik (kWh) berdasarkan watt dan jam pemakaian.
 * @param {number} watt - Daya perangkat (Watt)
 * @param {number} hours - Durasi pemakaian (jam)
 * @returns {number} - Konsumsi listrik (kWh)
 */
export function calculateKwh(watt, hours) {
  return (watt * hours) / 1000;
}

/**
 * Hitung estimasi biaya listrik (Rp) berdasarkan kWh dan tarif per kWh.
 * @param {number} kwh - Konsumsi listrik (kWh)
 * @param {number} tariff - Tarif listrik per kWh (Rp)
 * @returns {number} - Estimasi biaya (Rp)
 */
export function calculateCost(kwh, tariff) {
  return kwh * tariff;
}

// Unit test (jalankan di console browser atau Node.js)
function testCalculator() {
  // Test 1: Kulkas 100W, 24 jam, tarif Rp1500/kWh
  const kwh = calculateKwh(100, 24); // 2.4 kWh
  const cost = calculateCost(kwh, 1500); // 3600
  console.assert(kwh === 2.4, "Test kWh gagal");
  console.assert(cost === 3600, "Test cost gagal");

  // Test 2: AC 800W, 8 jam, tarif Rp1500/kWh
  const kwh2 = calculateKwh(800, 8); // 6.4 kWh
  const cost2 = calculateCost(kwh2, 1500); // 9600
  console.assert(kwh2 === 6.4, "Test kWh AC gagal");
  console.assert(cost2 === 9600, "Test cost AC gagal");

  console.log("Semua unit test kalkulasi lolos!");
}

// Uncomment untuk menjalankan test
// testCalculator();
