// Script untuk cek isi dan format tanggal di database SQLite
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/saran.db');

const db = new sqlite3.Database(dbPath);

db.all('SELECT id, judul, tanggal FROM saran', [], (err, rows) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }
  console.log('Isi tabel saran (id, judul, tanggal):');
  rows.forEach(row => {
    console.log(row);
  });
  db.close();
});
