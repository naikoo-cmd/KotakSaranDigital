// Setup database SQLite untuk Kotak Saran Digital
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../data/saran.db');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS saran (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		judul TEXT,
		isi TEXT,
		kategori TEXT,
		gambar TEXT,
		rating INTEGER,
		lokasi TEXT,
		tanggal TEXT,
		chapta TEXT
	)`);
});

module.exports = db;
