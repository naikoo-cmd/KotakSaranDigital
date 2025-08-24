// Express server setup untuk Kotak Saran Digital
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const db = require('./db');

// Dummy admin credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Setup upload gambar
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage });

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Endpoint login admin
app.post('/api/login', (req, res) => {
	const { username, password } = req.body;
	if (username === ADMIN_USER && password === ADMIN_PASS) {
		// Sederhana: tidak pakai session, cukup sukses
		return res.json({ success: true });
	}
	res.json({ success: false, error: 'Username/password salah.' });
});

// Endpoint submit saran
app.post('/api/saran', upload.single('gambar'), (req, res) => {
	const { judul, isi, kategori, rating, lokasi, tanggal, 'g-recaptcha-response': recaptchaToken } = req.body;
	// Validasi field lain
	if (!judul || !isi || !kategori || !rating || !lokasi || !tanggal) {
		return res.status(400).json({ error: 'Semua field wajib diisi.' });
	}
	let gambarPath = '';
	if (req.file) {
		gambarPath = '/uploads/' + req.file.filename;
	}
	db.run(
		'INSERT INTO saran (judul, isi, kategori, gambar, rating, lokasi, tanggal) VALUES (?, ?, ?, ?, ?, ?, ?)',
		[judul, isi, kategori, gambarPath, rating, lokasi, tanggal],
		function (err) {
			if (err) {
				console.error(err);
				return res.status(500).json({ error: 'Gagal menyimpan saran.' });
			}
			res.json({ success: true, id: this.lastID });
		}
	);
});

// Endpoint GET semua saran (dengan filter kategori dan tanggal)
app.get('/api/saran', (req, res) => {
	const kategori = req.query.kategori;
	const tanggal = req.query.tanggal;
	let sql = 'SELECT * FROM saran';
	let wheres = [];
	let params = [];
	if (kategori) {
		wheres.push('kategori = ?');
		params.push(kategori);
	}
		if (tanggal) {
			wheres.push('substr(tanggal, 1, 10) = ?');
			params.push(tanggal);
		}
	if (wheres.length) {
		sql += ' WHERE ' + wheres.join(' AND ');
	}
	db.all(sql, params, (err, rows) => {
		if (err) return res.status(500).json([]);
		res.json(rows);
	});
});

// Endpoint export CSV (dengan filter kategori dan tanggal)
app.get('/api/export', (req, res) => {
	const kategori = req.query.kategori;
	const tanggal = req.query.tanggal;
	let sql = 'SELECT * FROM saran';
	let wheres = [];
	let params = [];
	if (kategori) {
		wheres.push('kategori = ?');
		params.push(kategori);
	}
		if (tanggal) {
			wheres.push('substr(tanggal, 1, 10) = ?');
			params.push(tanggal);
		}
	if (wheres.length) {
		sql += ' WHERE ' + wheres.join(' AND ');
	}
	db.all(sql, params, (err, rows) => {
		if (err) return res.status(500).send('Error');
		// Convert to CSV
		const header = ['Judul','Isi','Kategori','Rating','Lokasi','Tanggal','Gambar'];
		const csv = [header.join(',')].concat(rows.map(s => [
			'"'+(s.judul||'')+'"',
			'"'+(s.isi||'')+'"',
			'"'+(s.kategori||'')+'"',
			s.rating||'',
			'"'+(s.lokasi||'')+'"',
			'"'+(s.tanggal||'')+'"',
			'"'+(s.gambar||'')+'"'
		].join(','))).join('\n');
		res.setHeader('Content-Type', 'text/csv');
		res.setHeader('Content-Disposition', 'attachment; filename="saran.csv"');
		res.send(csv);
	});
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
