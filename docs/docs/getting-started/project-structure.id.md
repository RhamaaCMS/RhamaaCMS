# Struktur Proyek

Memahami struktur proyek akan membantu Anda menavigasi dan menyesuaikan Wagtail News Template secara efektif.

## Gambaran Umum

```
myproject/
├── apps/                   # Aplikasi Django
├── fixtures/              # Data demo dan file media
├── media/                 # File yang diupload user
├── node/                  # Konfigurasi build frontend
├── project_name/          # Pengaturan proyek Django utama
├── static_compiled/       # Asset statis yang dikompilasi
├── static_src/           # File statis sumber
├── templates/            # Template HTML
├── utils/                # Utilitas bersama dan model dasar
├── manage.py             # Script manajemen Django
├── requirements.txt      # Dependencies Python
└── Makefile             # Perintah pengembangan
```

## Direktori Inti

### `/apps/`
Berisi aplikasi Django yang diorganisir berdasarkan fungsionalitas:

```
apps/
└── home/
    ├── __init__.py
    ├── models.py         # Model halaman
    ├── views.py          # View kustom (jika diperlukan)
    ├── urls.py           # Pola URL
    └── migrations/       # Migrasi database
```

**Fitur Utama:**
- Struktur app modular
- Penemuan URL otomatis
- Setiap app dapat memiliki namespace sendiri

### `/project_name/`
Konfigurasi proyek Django utama:

```
project_name/
├── __init__.py
├── settings/
│   ├── __init__.py
│   ├── base.py          # Pengaturan dasar
│   ├── dev.py           # Pengaturan pengembangan
│   └── production.py    # Pengaturan produksi
├── urls.py              # Konfigurasi URL utama
└── wsgi.py              # Aplikasi WSGI
```

### `/utils/`
Utilitas bersama dan fungsionalitas dasar:

```
utils/
├── models.py            # Model halaman dasar dan pengaturan
├── blocks.py            # Blok StreamField Wagtail
├── cache.py             # Utilitas caching
├── images/              # Model gambar kustom
├── navigation/          # Utilitas navigasi
├── templatetags/        # Tag template kustom
└── management/          # Perintah manajemen kustom
```

**Komponen Utama:**
- `BasePage` - Fondasi untuk semua tipe halaman
- `ListingFields` - Fungsionalitas listing yang dapat digunakan kembali
- Blok kustom untuk pembuatan konten
- Optimasi SEO dan performa

### `/templates/`
Template HTML yang diorganisir berdasarkan fungsionalitas:

```
templates/
├── base.html            # Template dasar
├── base_page.html       # Template halaman dasar
├── 404.html             # Halaman error
├── 500.html
├── components/          # Komponen yang dapat digunakan kembali
│   ├── card.html
│   ├── hero.html
│   └── listing.html
└── navigation/          # Komponen navigasi
    ├── main_nav.html
    └── footer.html
```

### `/static_src/` dan `/static_compiled/`
Manajemen asset frontend:

```
static_src/              # File sumber
├── sass/
│   ├── main.scss        # Stylesheet utama
│   ├── components/      # Style komponen
│   └── utilities/       # Kelas utilitas
├── javascript/
│   ├── main.js          # JavaScript utama
│   └── components/      # Komponen JS
├── images/              # Gambar sumber
└── fonts/               # Font web

static_compiled/         # Asset yang dibangun (auto-generated)
├── css/
├── js/
├── images/
└── fonts/
```

### `/node/`
Konfigurasi build frontend:

```
node/
├── package.json         # Dependencies Node.js
├── esbuild.js          # Konfigurasi bundler JavaScript
├── postcss.config.js   # Konfigurasi PostCSS
└── tailwind.config.js  # Konfigurasi Tailwind CSS
```

## File Konfigurasi

### `Makefile`
Shortcut pengembangan:

```makefile
init: load-data start    # Inisialisasi proyek
start:                   # Jalankan development server
load-data:              # Setup database dengan data demo
dump-data:              # Export data saat ini
reset-db:               # Reset database
```

### `requirements.txt`
Dependencies Python dengan batasan versi:

```txt
django>=4.2,<5.2        # Framework Django
wagtail>=6.4            # Wagtail CMS
wagtail-seo>=3.1.1      # Optimasi SEO
dj-database-url         # Parsing URL database
psycopg[binary]         # Adapter PostgreSQL
whitenoise              # Serving file statis
gunicorn==23.0.0        # Server WSGI
django-storages[s3]     # Dukungan cloud storage
wagtail-storages        # Integrasi storage Wagtail
```

### `fly.toml`
Konfigurasi deployment Fly.io dengan pengaturan yang dioptimalkan untuk Wagtail.

### `Dockerfile`
Build Docker multi-stage untuk containerization yang efisien.

## Pola Desain Utama

### 1. Auto-Discovery App
`urls.py` utama secara otomatis menemukan dan menyertakan URL dari semua app di direktori `/apps/`:

```python
def import_app_urls(folder_path):
    """Secara otomatis menemukan dan menyertakan URL dari semua app Django"""
    # Implementasi di project_name/urls.py
```

### 2. Pewarisan Model Dasar
Semua model halaman mewarisi dari `BasePage` yang menyediakan:
- Optimasi SEO
- Fungsionalitas listing
- Halaman terkait
- Optimasi performa

### 3. Organisasi Settings
Settings dibagi menjadi file spesifik lingkungan:
- `base.py` - Pengaturan umum
- `dev.py` - Override pengembangan
- `production.py` - Optimasi produksi

### 4. Pipeline Asset Statis
Proses build frontend yang efisien:
1. File sumber di `/static_src/`
2. Proses build via tools Node.js
3. Asset yang dikompilasi di `/static_compiled/`
4. Django collectstatic untuk deployment

## Titik Kustomisasi

### Menambah App Baru
1. Buat app di direktori `/apps/`
2. Tambahkan models, views, templates
3. URL secara otomatis ditemukan

### Memperluas Model Dasar
```python
from utils.models import BasePage

class MyCustomPage(BasePage):
    # Field kustom Anda
    pass
```

### Menambah Blok Baru
```python
from utils.blocks import LinkStreamBlock

class MyCustomBlock(blocks.StructBlock):
    # Definisi blok Anda
    pass
```

### Template Kustom
- Override template dasar di direktori `templates/` app Anda
- Gunakan pewarisan template untuk konsistensi
- Manfaatkan sistem komponen

## Langkah Selanjutnya

- [Konfigurasi pengaturan Anda](../configuration/settings.md)
- [Pelajari tentang model dan tipe konten](../development/models.md)
- [Jelajahi sistem blok](../development/blocks.md)