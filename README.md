# Kotak Saran Digital (Anonymous Feedback Box)

Kotak Saran Digital adalah aplikasi web sederhana untuk menerima saran/feedback secara **anonim**. Cocok digunakan di kantor, sekolah, organisasi, hingga warung.
Silahkan kamu integrasikan dengan web mu atau kalau mau kamu ubah berdasarkan repo gabut ini juga ga masalah :D

## 🎯 Fitur Utama

- **Form Saran Tanpa Nama:** Siapa saja bisa mengirim saran tanpa login atau identitas.
- **Kategori Saran:** Pilih kategori seperti pelayanan, fasilitas, produk, dll.
- **Upload Gambar:** Bisa melampirkan gambar pendukung.
- **Rating Bintang:** Beri penilaian dengan bintang.
- **Lokasi/Departemen:** Tambahkan lokasi atau departemen terkait.
- **Tanggal:** Pilih tanggal pengiriman saran.
- **Dashboard Admin:** Admin bisa login, melihat, memfilter, dan mengekspor data saran.
- **Export CSV/Excel:** Data saran bisa diunduh untuk analisis lebih lanjut.
- **Pagination & Pencarian:** Dashboard admin mendukung pencarian dan navigasi halaman.

## 🛠️ Teknologi

- **Frontend:** HTML, TailwindCSS, Animate.css
- **Backend:** Node.js, Express
- **Database:** SQLite (ringan, tanpa server)
- **Export:** CSV/Excel

## 🚀 Cara Install & Jalankan

1. **Clone repo:**
   ```bash
   git clone https://github.com/USERNAME/kotak-saran-digital.git
   cd kotak-saran-digital
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Jalankan server:**
   ```bash
   npm start
   ```
   Server berjalan di `http://localhost:3000`

4. **Akses aplikasi:**
   - **Form Saran:** `http://localhost:3000/`
   - **Dashboard Admin:** `http://localhost:3000/admin.html`
     - Username: `admin`
     - Password: `admin123`

## 📦 Struktur Folder

```
kotak-saran-digital/
├── public/
│   ├── index.html         # Form saran
│   ├── admin.html         # Dashboard admin
│   └── uploads/           # File gambar upload (tidak di-push ke git)
├── src/
│   ├── server.js          # Backend utama
│   ├── db.js              # Setup database
│   ├── seed_dummy.js      # Script data dummy
│   └── cek_tanggal.js     # Cek data di database
├── data/
│   └── saran.db           # Database SQLite (tidak di-push ke git)
├── package.json
├── .gitignore
└── README.md
```

## 💡 Kontribusi

Pull request dan saran pengembangan sangat diterima!  
Silakan fork, modifikasi, dan kirim PR.
