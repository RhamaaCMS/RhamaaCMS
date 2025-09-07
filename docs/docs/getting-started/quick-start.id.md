# Memulai Cepat

Jalankan Wagtail News Template Anda hanya dalam beberapa menit dengan panduan yang disederhanakan ini.

## Pemeriksaan Prasyarat

Pastikan Anda telah menginstal tools yang diperlukan:

```bash
# Periksa versi Python (3.8+ diperlukan)
python --version

# Periksa apakah pip tersedia
pip --version

# Periksa apakah Node.js terinstal (opsional, untuk pengembangan frontend)
node --version
```

## Setup Satu Perintah

Untuk setup tercepat, gunakan perintah inisialisasi kami:

```bash
# Buat dan aktifkan virtual environment
python -m venv myproject/env
source myproject/env/bin/activate  # Di Windows: myproject\env\Scripts\activate

# Navigasi ke direktori proyek
cd myproject

# Install Wagtail dan buat proyek
pip install wagtail
wagtail start --template=https://github.com/rhamaa/RhamaaCMS/archive/refs/heads/main.zip myproject .

# Install dependencies dan setup
pip install -r requirements.txt
make init
```

Selesai! Situs Anda sekarang berjalan di http://localhost:8000

## Apa yang Baru Saja Terjadi?

Perintah `make init` menjalankan beberapa langkah:

1. **Setup Database**: Membuat database SQLite dengan tabel
2. **Migrasi**: Menerapkan semua migrasi database
3. **Data Demo**: Memuat konten dan halaman sampel
4. **File Statis**: Mengumpulkan dan mengkompilasi asset CSS/JS
5. **Start Server**: Meluncurkan development server

## Akses Situs Anda

- **Frontend**: http://localhost:8000
- **Panel Admin**: http://localhost:8000/admin
  - Username: `rhamaa`
  - Password: `admin`

## Jelajahi Konten Demo

Template dilengkapi dengan konten demo yang telah dimuat sebelumnya:

### Halaman
- **Homepage**: Halaman landing dengan bagian hero
- **Halaman About**: Halaman konten sampel
- **Halaman News/Blog**: Halaman artikel contoh

### Fitur Admin
- **Editor Halaman**: Editing konten kaya dengan blok
- **Perpustakaan Media**: Manajemen gambar dan dokumen
- **Pengaturan Situs**: Opsi konfigurasi global
- **Manajemen User**: Kontrol user admin

## Kustomisasi Cepat

### 1. Ubah Judul Situs
1. Pergi ke **Settings > Sites** di admin
2. Edit situs default
3. Update nama situs

### 2. Tambahkan Logo Anda
1. Pergi ke **Images** di admin
2. Upload gambar logo Anda
3. Update template untuk mereferensikan logo Anda

### 3. Kustomisasi Warna
Edit `node/tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#warna-anda',
        secondary: '#warna-sekunder-anda',
      }
    }
  }
}
```

Kemudian rebuild asset:
```bash
cd node
npm run build:prod
cd ..
```

### 4. Buat Halaman Pertama Anda
1. Pergi ke **Pages** di admin
2. Klik **Add child page** di bawah Home
3. Pilih tipe halaman
4. Isi konten dan publikasikan

## Workflow Pengembangan

### Pengembangan Harian
```bash
# Aktifkan virtual environment
source myproject/env/bin/activate

# Jalankan development server
make start
```

### Membuat Perubahan
- **Perubahan Python/Django**: Server auto-reload
- **Perubahan Template**: Refresh browser
- **Perubahan CSS/JS**: Jalankan `npm run build` di direktori `/node/`

### Perubahan Database
```bash
# Buat migrasi setelah perubahan model
python manage.py makemigrations

# Terapkan migrasi
python manage.py migrate
```

## Langkah Selanjutnya yang Umum

### 1. Buat Tipe Halaman Kustom
```python
# Di apps/home/models.py
from utils.models import BasePage
from wagtail.fields import RichTextField

class ArticlePage(BasePage):
    body = RichTextField()
    
    content_panels = BasePage.content_panels + [
        FieldPanel('body'),
    ]
```

### 2. Kustomisasi Template
Buat `templates/home/article_page.html`:

```html
{% extends "base_page.html" %}
{% load wagtailcore_tags %}

{% block content %}
    <article>
        <h1>{{ page.title }}</h1>
        <div class="content">
            {{ page.body|richtext }}
        </div>
    </article>
{% endblock %}
```

### 3. Tambahkan Styling Kustom
Edit `static_src/sass/main.scss`:

```scss
// Style kustom Anda
.my-custom-class {
    color: #333;
    font-size: 1.2rem;
}
```

## Troubleshooting

### Server Tidak Mau Start
```bash
# Periksa apakah port 8000 sedang digunakan
lsof -i :8000

# Gunakan port yang berbeda
python manage.py runserver 8001
```

### File Statis Tidak Dimuat
```bash
# Rebuild dan kumpulkan file statis
cd node
npm run build:prod
cd ..
python manage.py collectstatic --noinput
```

### Masalah Database
```bash
# Reset database dengan data demo segar
make reset-db
```

## Deployment Produksi

Ketika siap untuk deploy:

1. **Environment Variables**: Set `SECRET_KEY`, `DATABASE_URL`, dll.
2. **File Statis**: Konfigurasi cloud storage untuk file statis/media
3. **Database**: Gunakan PostgreSQL alih-alih SQLite
4. **Keamanan**: Update `ALLOWED_HOSTS` dan pengaturan keamanan lainnya

Lihat [panduan deployment](../deployment/flyio.md) kami untuk instruksi detail.

## Dapatkan Bantuan

- **Dokumentasi**: Lanjutkan membaca docs ini
- **Wagtail Docs**: https://docs.wagtail.org/
- **GitHub Issues**: https://github.com/rhamaa/RhamaaCMS/issues
- **Komunitas**: Komunitas Slack Wagtail

## Selanjutnya?

- [Pahami struktur proyek](project-structure.md)
- [Pelajari opsi konfigurasi](../configuration/settings.md)
- [Jelajahi pemodelan konten](../development/models.md)
- [Kustomisasi frontend](../development/frontend.md)