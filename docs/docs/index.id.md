# Wagtail News Template

Template starter yang komprehensif untuk membangun website berita dan konten dengan [Wagtail CMS](https://wagtail.org). Template ini menyediakan fondasi yang solid dengan halaman, blok, optimasi SEO, dan setup siap deploy yang telah dikonfigurasi sebelumnya.

## ✨ Fitur

- **🚀 Setup Cepat**: Mulai dalam hitungan menit dengan pengaturan yang telah dikonfigurasi
- **📱 Desain Responsif**: Pendekatan mobile-first dengan Tailwind CSS
- **🔍 SEO Dioptimalkan**: Fitur SEO bawaan dengan wagtail-seo
- **⚡ Performa**: Query yang dioptimalkan, caching, dan penanganan file statis
- **🎨 Konten Fleksibel**: Sistem blok yang kaya untuk pembuatan konten
- **📊 Siap Analytics**: Integrasi mudah dengan layanan tracking
- **🐳 Dukungan Docker**: Pengembangan dan deployment dalam container
- **☁️ Siap Cloud**: Telah dikonfigurasi untuk Fly.io dan Divio Cloud

## 🎯 Sempurna Untuk

- Website berita
- Platform blog
- Sistem manajemen konten
- Website korporat
- Situs portofolio
- Situs dokumentasi

## 🛠️ Tech Stack

- **Backend**: Django + Wagtail CMS
- **Frontend**: Tailwind CSS + Alpine.js
- **Build Tools**: esbuild + PostCSS
- **Database**: PostgreSQL (produksi) / SQLite (pengembangan)
- **Storage**: Dukungan storage kompatibel S3
- **Deployment**: Docker, Fly.io, Divio Cloud

## 🚀 Memulai Cepat

```bash
# Buat virtual environment
python -m venv myproject/env
source myproject/env/bin/activate

# Install Wagtail
pip install wagtail

# Buat proyek dari template
wagtail start --template=https://github.com/rhamaa/RhamaaCMS/archive/refs/heads/main.zip myproject .

# Install dependencies
pip install -r requirements.txt

# Setup database dan load data demo
make load-data

# Jalankan development server
make start
```

Kunjungi `http://localhost:8000` untuk melihat situs Anda dan `http://localhost:8000/admin` untuk mengakses panel admin.

**Kredensial Admin Default:**
- Username: `rhamaa`
- Password: `admin`

!!! warning "Keamanan"
    Segera ubah kredensial admin default di produksi!

## 📚 Selanjutnya?

- [Panduan Instalasi](getting-started/installation.md) - Instruksi setup detail
- [Struktur Proyek](getting-started/project-structure.md) - Memahami codebase
- [Konfigurasi](configuration/settings.md) - Menyesuaikan setup Anda
- [Panduan Pengembangan](development/models.md) - Membangun tipe konten Anda

## 🤝 Kontribusi

Kami menyambut kontribusi! Silakan lihat [Panduan Kontribusi](contributing.md) untuk detail tentang cara memulai.

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](https://github.com/rhamaa/RhamaaCMS/blob/main/LICENSE) untuk detail.