# Kontribusi

Kami menyambut kontribusi untuk Wagtail News Template! Panduan ini akan membantu Anda memulai berkontribusi pada proyek ini.

## Cara Berkontribusi

- **Laporan Bug**: Menemukan bug? Beri tahu kami!
- **Permintaan Fitur**: Punya ide untuk perbaikan?
- **Kontribusi Kode**: Kirim pull request dengan perbaikan atau fitur baru
- **Dokumentasi**: Bantu tingkatkan dokumentasi kami
- **Testing**: Bantu test fitur baru dan laporkan masalah

## Memulai

### 1. Fork dan Clone

```bash
# Fork repository di GitHub, kemudian clone fork Anda
git clone https://github.com/YOUR-USERNAME/RhamaaCMS.git
cd RhamaaCMS

# Tambahkan repository asli sebagai upstream
git remote add upstream https://github.com/rhamaa/RhamaaCMS.git
```

### 2. Setup Development Environment

```bash
# Buat virtual environment
python -m venv env
source env/bin/activate  # Di Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install development dependencies
pip install -r requirements-dev.txt  # Jika tersedia

# Setup pre-commit hooks (jika dikonfigurasi)
pre-commit install
```

### 3. Buat Branch

```bash
# Buat branch baru untuk fitur/perbaikan Anda
git checkout -b feature/nama-fitur-anda
# atau
git checkout -b fix/deskripsi-masalah
```

## Workflow Pengembangan

### Membuat Perubahan

1. **Buat perubahan Anda** di file yang sesuai
2. **Test perubahan Anda** secara menyeluruh
3. **Update dokumentasi** jika diperlukan
4. **Tambahkan test** untuk fungsionalitas baru
5. **Pastikan kualitas kode** mengikuti standar proyek

### Testing Perubahan

```bash
# Jalankan test suite
python manage.py test

# Test dengan data demo
make reset-db
make load-data
make start

# Test di environment yang berbeda
export DJANGO_SETTINGS_MODULE=project_name.settings.production
python manage.py check --deploy
```

### Kualitas Kode

Ikuti panduan ini:

- **Python Code Style**: Ikuti PEP 8
- **Django Best Practices**: Gunakan konvensi Django
- **Wagtail Patterns**: Ikuti best practices Wagtail
- **Comments**: Tambahkan komentar yang bermakna untuk logic yang kompleks
- **Docstrings**: Dokumentasikan fungsi dan kelas

### Perubahan Template

Ketika memodifikasi template:

1. **Test Template Generation**: Buat proyek baru dari template Anda
2. **Verifikasi Semua Fitur**: Pastikan semua fungsionalitas bekerja
3. **Update Fixtures**: Jalankan `make dump-data` jika Anda menambah konten demo
4. **Build Assets**: Jalankan `npm run build:prod` untuk perubahan frontend

## Panduan Kontribusi

### Laporan Bug

Ketika melaporkan bug, sertakan:

- **Deskripsi Jelas**: Apa yang terjadi vs apa yang Anda harapkan
- **Langkah Reproduksi**: Langkah detail untuk membuat ulang masalah
- **Environment**: Versi Python, OS, browser (jika relevan)
- **Pesan Error**: Pesan error lengkap dan stack traces
- **Screenshot**: Jika masalahnya visual

**Template Laporan Bug:**

```markdown
## Deskripsi Bug
Deskripsi singkat tentang bug.

## Langkah Reproduksi
1. Langkah satu
2. Langkah dua
3. Langkah tiga

## Perilaku yang Diharapkan
Apa yang seharusnya terjadi.

## Perilaku Aktual
Apa yang sebenarnya terjadi.

## Environment
- Versi Python:
- Versi Django:
- Versi Wagtail:
- OS:
- Browser (jika relevan):

## Konteks Tambahan
Informasi relevan lainnya.
```

### Permintaan Fitur

Untuk permintaan fitur, sertakan:

- **Use Case**: Mengapa fitur ini diperlukan?
- **Solusi yang Diusulkan**: Bagaimana seharusnya bekerja?
- **Alternatif**: Cara lain untuk menyelesaikan masalah
- **Ide Implementasi**: Pendekatan teknis (jika Anda punya ide)

### Pull Requests

#### Sebelum Mengirim

- [ ] Kode mengikuti panduan style proyek
- [ ] Test berhasil secara lokal
- [ ] Fungsionalitas baru menyertakan test
- [ ] Dokumentasi diperbarui
- [ ] Pesan commit jelas dan deskriptif

#### Template Pull Request

```markdown
## Deskripsi
Deskripsi singkat perubahan.

## Tipe Perubahan
- [ ] Perbaikan bug
- [ ] Fitur baru
- [ ] Breaking change
- [ ] Update dokumentasi

## Testing
- [ ] Test berhasil
- [ ] Manual testing selesai
- [ ] Test baru ditambahkan (jika berlaku)

## Checklist
- [ ] Kode mengikuti panduan style
- [ ] Self-review selesai
- [ ] Dokumentasi diperbarui
- [ ] Tidak ada breaking changes (atau didokumentasikan dengan jelas)
```

#### Pesan Commit

Gunakan pesan commit yang jelas dan deskriptif:

```bash
# Baik
git commit -m "Add SEO meta tags to BasePage model"
git commit -m "Fix image upload validation in admin"
git commit -m "Update installation documentation"

# Hindari
git commit -m "Fix bug"
git commit -m "Update stuff"
git commit -m "WIP"
```

## Detail Setup Pengembangan

### Struktur Proyek untuk Kontributor

```
RhamaaCMS/
├── apps/                    # Aplikasi Django
├── fixtures/               # Data demo
├── node/                   # Frontend build tools
├── project_name/           # Proyek Django (variabel template)
├── static_src/            # Asset sumber
├── templates/             # Template HTML
├── utils/                 # Utilitas bersama
├── tests/                 # File test
├── docs/                  # Dokumentasi
├── .github/               # GitHub workflows
├── requirements.txt       # Dependencies Python
└── README.md             # README proyek
```

### Variabel Template

Ketika bekerja dengan file template, ingat:

- Gunakan `{{ project_name }}` untuk nama proyek Django
- Gunakan `{{ project_name|title }}` untuk nama tampilan
- Bungkus kode template Django dalam tag `{% verbatim %}` jika diperlukan

### Membangun Dokumentasi

```bash
# Install MkDocs
pip install mkdocs-material

# Serve dokumentasi secara lokal
cd docs
mkdocs serve

# Build dokumentasi
mkdocs build
```

### Pengembangan Frontend

```bash
# Install dependencies Node.js
cd node
npm install

# Development build (watch mode)
npm run build:dev

# Production build
npm run build:prod

# Lint JavaScript
npm run lint

# Format code
npm run format
```

## Proses Release

### Untuk Maintainer

1. **Update Version**: Update nomor versi di file yang relevan
2. **Update Changelog**: Dokumentasikan perubahan di CHANGELOG.md
3. **Test Release**: Buat proyek test dari template
4. **Tag Release**: Buat Git tag dengan nomor versi
5. **GitHub Release**: Buat release di GitHub dengan catatan

### Versioning

Kami mengikuti [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: Fitur baru (backward compatible)
- **PATCH**: Perbaikan bug (backward compatible)

## Panduan Komunitas

### Code of Conduct

- Bersikap hormat dan inklusif
- Sambut pendatang baru dan bantu mereka belajar
- Fokus pada feedback yang konstruktif
- Hormati sudut pandang dan pengalaman yang berbeda

### Mendapatkan Bantuan

- **GitHub Issues**: Untuk bug dan permintaan fitur
- **Discussions**: Untuk pertanyaan dan diskusi umum
- **Komunitas Wagtail**: Bergabung dengan komunitas Wagtail yang lebih luas

## Pengakuan

Kontributor akan diakui di:

- **README.md**: Bagian kontributor
- **Release Notes**: Kontribusi besar disorot
- **Dokumentasi**: Kredit penulis jika sesuai

## Pertanyaan?

Jika Anda punya pertanyaan tentang kontribusi:

1. Periksa issues dan diskusi yang ada
2. Buat diskusi baru untuk pertanyaan
3. Hubungi maintainer

Terima kasih telah berkontribusi pada Wagtail News Template! 🎉