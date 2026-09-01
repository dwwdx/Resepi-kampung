# Panduan Tambah Resepi — Resepi Kampung

Struktur laman sudah siap sepenuhnya. Untuk tambah resepi, anda **hanya perlu
edit satu fail sahaja**: `js/data.js`

Tak perlu sentuh HTML atau CSS. Semua halaman akan terisi automatik.

---

## 1. Tambah Resepi

Buka `js/data.js`, cari bahagian `const RESEPI = [`, dan tambah resepi
di dalamnya. Letak resepi **terbaru di atas**.

```js
const RESEPI = [

  {
    slug:      'ayam-masak-merah',
    tajuk:     'Ayam Masak Merah Berempah',
    ringkasan: 'Kuah pekat, ayam lembut meresap rempah.',
    kategori:  'lauk-kampung',
    img:       'images/resepi/ayam-masak-merah.webp',
    penulis:   'Mak Cik Timah',
    tarikh:    '2026-08-31',
    masa:      '45 minit',
    hidangan:  '4 orang',
    kesukaran: 'Sederhana',
    trending:  true,
    pilihan:   false,
    tag:       ['ayam', 'berempah', 'raya'],

    bahan: [
      '1 ekor ayam, potong 12 bahagian',
      '5 biji bawang merah, dikisar',
      '3 ulas bawang putih, dikisar',
      '2 sudu besar cili boh',
      '1 cawan santan',
      'Garam dan gula secukup rasa'
    ],

    langkah: [
      'Panaskan minyak, tumis bahan kisar hingga naik bau dan pecah minyak.',
      'Masukkan cili boh, kacau selama 5 minit hingga warna gelap.',
      'Masukkan ayam, kacau rata dan biarkan 10 minit.',
      'Tuang santan, perlahankan api dan biar 20 minit hingga kuah pekat.',
      'Perasakan dengan garam dan gula. Hidang panas dengan nasi putih.'
    ],

    petua: 'Tumis cili boh sampai betul-betul pecah minyak — ini kunci kuah pekat cantik.'
  },

];
```

### Penjelasan setiap medan

| Medan | Wajib | Penjelasan |
|---|---|---|
| `slug` | Ya | Nama untuk URL. Huruf kecil, guna `-`, tiada ruang. Contoh: `nasi-lemak-kampung` |
| `tajuk` | Ya | Tajuk resepi yang dipaparkan |
| `ringkasan` | Tidak | Satu ayat pendek untuk kad. Kalau kosong, kad tetap cantik |
| `kategori` | Ya | Guna `slug` dari senarai `KATEGORI` (lihat bawah) |
| `img` | Tidak | Laluan gambar. Kalau kosong, gambar sementara digunakan automatik |
| `penulis` | Tidak | Nama penyumbang resepi |
| `tarikh` | Ya | Format `YYYY-MM-DD`. Digunakan untuk susunan terbaru |
| `masa` | Tidak | Contoh: `'45 minit'`, `'1 jam 30 minit'` |
| `hidangan` | Tidak | Contoh: `'4 orang'`, `'20 biji'` |
| `kesukaran` | Tidak | `'Mudah'`, `'Sederhana'` atau `'Sukar'` |
| `trending` | Tidak | `true` = muncul dalam widget "Resepi Trending" |
| `pilihan` | Tidak | `true` = dapat lencana "Pilihan Editor" |
| `tag` | Tidak | Senarai tag untuk carian. Contoh: `['ayam', 'santan']` |
| `bahan` | Ya | Senarai bahan. **Satu bahan satu baris** dalam array |
| `langkah` | Ya | Senarai langkah. Auto-bernombor 1, 2, 3… |
| `petua` | Tidak | Tips tambahan. Dipaparkan dalam kotak kuning |

---

## 2. Tambah Artikel

Sama caranya, tapi dalam `const ARTIKEL = [`:

```js
const ARTIKEL = [

  {
    slug:      'cara-simpan-sayur',
    tajuk:     'Cara Simpan Sayur Supaya Tahan 2 Minggu',
    ringkasan: 'Rahsia simpan sayur dalam peti sejuk tanpa cepat rosak.',
    kategori:  'tips-petua',
    img:       'images/artikel/simpan-sayur.webp',
    penulis:   'Aimi',
    tarikh:    '2026-08-31',
    bacaan:    '4 minit',
    tag:       ['sayur', 'penyimpanan'],

    kandungan: `
      <p>Sayur cepat rosak sebab lembapan berlebihan dalam peti sejuk.</p>

      <h2>Bungkus dengan tuala kertas</h2>
      <p>Tuala kertas menyerap lembapan berlebihan.</p>

      <h2>Pisahkan buah dari sayur</h2>
      <ul>
        <li>Pisang dan epal keluarkan gas etilena</li>
        <li>Gas ini mempercepatkan sayur menjadi kuning</li>
      </ul>

      <blockquote>Jangan basuh sayur sebelum simpan — basuh masa nak guna.</blockquote>
    `
  },

];
```

Untuk `kandungan`, guna HTML ringkas: `<p>`, `<h2>`, `<h3>`, `<ul><li>`,
`<ol><li>`, `<blockquote>`, `<strong>`, `<a href="">`.

Perhatian: guna tanda **backtick** (`` ` ``) untuk `kandungan`, bukan
tanda petik biasa — supaya boleh tulis berbilang baris.

---

## 3. Kategori Sedia Ada

Guna `slug` ini dalam medan `kategori` resepi:

| slug | Nama |
|---|---|
| `lauk-kampung` | Lauk Kampung |
| `kuih-tradisional` | Kuih Tradisional |
| `nasi-mi` | Nasi & Mi |
| `air-pencuci-mulut` | Air & Pencuci Mulut |
| `kek-biskut` | Kek & Biskut |
| `resepi-ringkas` | Resepi Ringkas |

Untuk artikel:

| slug | Nama |
|---|---|
| `tips-petua` | Tips & Petua |
| `informasi` | Informasi |
| `kesihatan` | Kesihatan |
| `bahan-dapur` | Bahan Dapur |

### Nak tukar atau tambah kategori?

Edit `const KATEGORI = [` dalam `js/data.js`. Setiap kategori perlu
`slug`, `nama`, `desc` dan `img`.

---

## 4. Tambah Gambar

Letakkan gambar dalam folder yang betul:

```
images/resepi/     ← gambar resepi
images/artikel/    ← gambar artikel
images/kategori/   ← gambar kategori (sudah ada 6)
```

**Saiz disyorkan:** 1000 × 660 piksel (nisbah 3:2), format `.webp` atau `.jpg`,
di bawah 200 KB.

Kalau resepi tiada gambar, sistem akan guna gambar sementara secara
automatik — jadi laman tetap kelihatan lengkap.

---

## 5. Tambah Video (pilihan)

Kalau ada video YouTube, isi dalam `const VIDEO = [`:

```js
const VIDEO = [
  { id: 'dQw4w9WgXcQ', tajuk: 'Cara Buat Rendang Tok', tempoh: '8:42' },
];
```

`id` adalah kod dalam URL YouTube: `youtube.com/watch?v=`**`dQw4w9WgXcQ`**

Kalau senarai kosong, seksyen video akan tersembunyi automatik.

---

## 6. Struktur Fail

```
resepi-kampung/
├── index.html              ← Laman utama
├── resepi.html             ← Senarai semua resepi + filter
├── resepi-detail.html      ← Templat paparan satu resepi
├── artikel.html            ← Senarai artikel + filter
├── artikel-detail.html     ← Templat paparan satu artikel
├── kategori.html           ← Semua kategori
├── kongsi.html             ← Borang kongsi resepi
├── tentang.html            ← Tentang kami
├── hubungi.html            ← Borang hubungi
├── privasi.html            ← Dasar privasi
├── terma.html              ← Terma penggunaan
├── 404.html                ← Halaman tak dijumpai
├── css/style.css           ← Semua reka bentuk
├── js/
│   ├── data.js             ← ★ EDIT SINI untuk tambah resepi
│   └── app.js              ← Enjin (tak perlu ubah)
└── images/                 ← Semua gambar
```

---

## 7. Perkara Yang Perlu Diingat

- **Koma di hujung:** setiap resepi mesti diasingkan dengan koma `,`
- **Tanda petik:** guna `'` untuk teks biasa, `` ` `` untuk `kandungan` HTML
- **Apostrof dalam teks:** kalau teks ada `'`, tulis `\'` atau guna `"`
  Contoh: `tajuk: "Ayam 'Golek' Kampung"`
- **Tarikh:** mesti format `YYYY-MM-DD`, contoh `2026-08-31`
- Kalau laman jadi kosong selepas edit, biasanya ada koma tertinggal atau
  tanda petik tak lengkap. Buka Developer Tools (F12) → tab Console untuk
  lihat mesej ralat.

---

## 8. Ciri Yang Sudah Berfungsi

- Carian langsung (tekan ikon cari atau `Ctrl + K`)
- Filter kategori pada halaman resepi dan artikel
- Widget resepi trending automatik
- Kiraan resepi setiap kategori automatik
- Susunan resepi terbaru di atas automatik
- Menu mudah alih (mobile) dengan accordion
- Tag popular dijana dari tag resepi
- Resepi berkaitan pada halaman detail
- Reka bentuk responsif telefon, tablet dan desktop
- Paparan cetak untuk resepi
