# Instalasi

Panduan ini akan memandu Anda melalui setup Wagtail News Template di lingkungan pengembangan lokal Anda.

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Python 3.8+** - Periksa [panduan kompatibilitas Wagtail](https://docs.wagtail.org/en/stable/releases/upgrading.html#compatible-django-python-versions)
- **Node.js 16+** - Untuk build tools frontend
- **Git** - Untuk version control

### Periksa Versi Python

```bash
python --version
# Atau di beberapa sistem:
python3 --version
# Di Windows dengan Python Launcher:
py --version
```

## Instalasi Langkah demi Langkah

### 1. Buat Virtual Environment

Buat dan aktifkan virtual environment untuk mengisolasi dependencies proyek Anda:

=== "Linux/macOS"
    ```bash
    python -m venv myproject/env
    source myproject/env/bin/activate
    ```

=== "Windows (Command Prompt)"
    ```cmd
    python -m venv myproject\env
    myproject\env\Scripts\activate
    ```

=== "Windows (PowerShell)"
    ```powershell
    python -m venv myproject\env
    myproject\env\Scripts\Activate.ps1
    ```

### 2. Navigasi ke Direktori Proyek

```bash
cd myproject
```

### 3. Install Wagtail

```bash
pip install wagtail
```

### 4. Buat Proyek dari Template

```bash
wagtail start --template=https://github.com/rhamaa/RhamaaCMS/archive/refs/heads/main.zip myproject .
```

!!! tip "URL Template"
    URL template menunjuk ke versi terbaru. Anda juga dapat menentukan branch atau tag tertentu jika diperlukan.

### 5. Install Dependencies Python

```bash
pip install -r requirements.txt
```

### 6. Install Dependencies Node.js

```bash
cd node
npm install
# atau jika Anda lebih suka pnpm:
pnpm install
cd ..
```

### 7. Setup Database dan Load Data Demo

```bash
make load-data
```

Perintah ini akan:
- Membuat tabel cache
- Menjalankan migrasi database
- Memuat data demo awal
- Mengumpulkan file statis

### 8. Jalankan Development Server

```bash
make start
```

Situs Anda akan tersedia di:
- **Website**: http://localhost:8000
- **Panel Admin**: http://localhost:8000/admin

## Kredensial Default

Gunakan kredensial ini untuk masuk ke panel admin:

- **Username**: `rhamaa`
- **Password**: `admin`

!!! warning "Keamanan"
    Ubah kredensial ini segera, terutama sebelum deploy ke produksi!

## Verifikasi Instalasi

1. Kunjungi http://localhost:8000 - Anda harus melihat homepage
2. Kunjungi http://localhost:8000/admin - Anda harus melihat login admin Wagtail
3. Login dengan kredensial default
4. Jelajahi konten demo di panel admin

## Troubleshooting

### Masalah Umum

#### Kompatibilitas Versi Python
Jika Anda mengalami masalah versi Python:

```bash
# Periksa kompatibilitas Django dan Wagtail
pip list | grep -E "(Django|wagtail)"
```

#### Masalah Database
Jika Anda memiliki masalah database:

```bash
# Reset database
make reset-db
```

#### Masalah File Statis
Jika file statis tidak dimuat:

```bash
# Rebuild file statis
cd node
npm run build:prod
cd ..
python manage.py collectstatic --noinput
```

#### Masalah Permission (Linux/macOS)
Jika Anda mengalami masalah permission:

```bash
# Pastikan manage.py dapat dieksekusi
chmod +x manage.py
```

### Mendapatkan Bantuan

Jika Anda mengalami masalah yang tidak tercakup di sini:

1. Periksa [dokumentasi Wagtail](https://docs.wagtail.org/)
2. Cari [GitHub issues](https://github.com/rhamaa/RhamaaCMS/issues) yang ada
3. Buat issue baru dengan informasi error yang detail

## Langkah Selanjutnya

Sekarang setelah Anda menginstal template:

1. [Jelajahi struktur proyek](project-structure.md)
2. [Konfigurasi pengaturan Anda](../configuration/settings.md)
3. [Mulai mengembangkan tipe konten Anda](../development/models.md)