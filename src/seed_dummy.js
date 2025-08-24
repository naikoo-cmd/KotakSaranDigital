// Script untuk insert data dummy ke tabel saran
const db = require('./db');

for (let i = 1; i <= 30; i++) {
  db.run(
    'INSERT INTO saran (judul, isi, kategori, gambar, rating, lokasi, tanggal, chapta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      `Dummy ${i}`,
      `Ini isi dummy ke-${i}`,
      ['pelayanan','fasilitas','produk','lainnya'][i%4],
      '',
      (i%5)+1,
      `Departemen ${String.fromCharCode(65+(i%5))}`,
      `2025-08-${(i%28+1).toString().padStart(2,'0')}`,
      '5'
    ]
  );
}
console.log('30 dummy data inserted');
db.close();
