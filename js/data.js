/* ==========================================================
   RESEPI KAMPUNG — FAIL DATA
   ==========================================================

   *** DI SINI TEMPAT ANDA TAMBAH RESEPI & ARTIKEL ***

   Sekarang senarai masih KOSONG. Web akan papar "belum ada
   resepi" secara automatik. Sebaik sahaja anda tambah data
   di bawah, semua halaman akan terisi sendiri:
     - Halaman utama (index.html)
     - Senarai resepi (resepi.html)
     - Senarai artikel (artikel.html)
     - Kategori, carian, trending, sidebar

   ========================================================== */


/* ----------------------------------------------------------
   1. KATEGORI RESEPI
   ----------------------------------------------------------
   Tukar / tambah kategori ikut kesesuaian anda.
   'slug' = nama ringkas untuk URL (huruf kecil, guna -)
   'img'  = gambar kategori dalam folder images/kategori/
   ---------------------------------------------------------- */
const KATEGORI = [
  {
    slug: 'lauk-kampung',
    nama: 'Lauk Kampung',
    desc: 'Ayam, daging, ikan & sayur untuk hidangan harian',
    img: 'images/kategori/lauk-kampung.webp'
  },
  {
    slug: 'kuih-tradisional',
    nama: 'Kuih Tradisional',
    desc: 'Kuih-muih warisan nenek yang tak pernah gagal',
    img: 'images/kategori/kuih-tradisional.webp'
  },
  {
    slug: 'nasi-mi',
    nama: 'Nasi & Mi',
    desc: 'Nasi lemak, nasi goreng, mi goreng & lebih lagi',
    img: 'images/kategori/nasi-mi.webp'
  },
  {
    slug: 'air-pencuci-mulut',
    nama: 'Air & Pencuci Mulut',
    desc: 'Minuman segar dan pemanis mulut selepas makan',
    img: 'images/kategori/air-pencuci-mulut.webp'
  },
  {
    slug: 'kek-biskut',
    nama: 'Kek & Biskut',
    desc: 'Kek lapis, bahulu, biskut raya & bakeri rumah',
    img: 'images/kategori/kek-biskut.webp'
  },
  {
    slug: 'resepi-ringkas',
    nama: 'Resepi Ringkas',
    desc: 'Cepat siap, bahan sedikit — sesuai untuk pemula',
    img: 'images/kategori/resepi-ringkas.webp'
  }
];


/* ----------------------------------------------------------
   2. KATEGORI ARTIKEL
   ---------------------------------------------------------- */
const KATEGORI_ARTIKEL = [
  { slug: 'tips-petua',  nama: 'Tips & Petua' },
  { slug: 'informasi',   nama: 'Informasi' },
  { slug: 'kesihatan',   nama: 'Kesihatan' },
  { slug: 'bahan-dapur', nama: 'Bahan Dapur' }
];


/* ----------------------------------------------------------
   3. SENARAI RESEPI   << TAMBAH RESEPI DI SINI >>
   ----------------------------------------------------------

   Salin templat di bawah, buang tanda komen, dan isikan.
   Letak resepi TERBARU di ATAS senarai.

   ┌─ TEMPLAT RESEPI ────────────────────────────────────────┐
   {
     slug:      'ayam-masak-merah',            // URL, huruf kecil, guna -
     tajuk:     'Ayam Masak Merah Berempah',
     ringkasan: 'Satu ayat pendek tentang resepi ini.',
     kategori:  'lauk-kampung',                // guna slug dari KATEGORI
     img:       'images/resepi/ayam-masak-merah.webp',
     penulis:   'Nama Anda',
     tarikh:    '2026-08-31',                  // format: YYYY-MM-DD
     masa:      '45 minit',                    // masa memasak
     hidangan:  '4 orang',
     kesukaran: 'Sederhana',                   // Mudah / Sederhana / Sukar
     trending:  false,                         // true = masuk 'Resepi Trending'
     pilihan:   false,                         // true = masuk 'Pilihan Editor'
     tag:       ['ayam', 'berempah', 'raya'],

     bahan: [
       '1 ekor ayam, potong 12 bahagian',
       '5 biji bawang merah, dikisar'
     ],

     langkah: [
       'Panaskan minyak, tumis bahan kisar hingga naik bau.',
       'Masukkan ayam, kacau rata dan tutup 20 minit.'
     ],

     petua: 'Tips tambahan (pilihan sahaja, boleh buang).'
   },
   └─────────────────────────────────────────────────────────┘
   ---------------------------------------------------------- */
const RESEPI = [

  // ┌──────────────────────────────────────────────┐
  // │  MASIH KOSONG — tambah resepi anda di sini   │
  // └──────────────────────────────────────────────┘

];


/* ----------------------------------------------------------
   4. SENARAI ARTIKEL   << TAMBAH ARTIKEL DI SINI >>
   ----------------------------------------------------------

   ┌─ TEMPLAT ARTIKEL ───────────────────────────────────────┐
   {
     slug:      'cara-simpan-sayur',
     tajuk:     'Cara Simpan Sayur Supaya Tahan Lama',
     ringkasan: 'Satu ayat pendek tentang artikel ini.',
     kategori:  'tips-petua',                 // slug dari KATEGORI_ARTIKEL
     img:       'images/artikel/simpan-sayur.webp',
     penulis:   'Nama Anda',
     tarikh:    '2026-08-31',
     bacaan:    '4 minit',                    // anggaran masa baca
     tag:       ['sayur', 'penyimpanan'],

     // Isi artikel — guna HTML ringkas
     kandungan: `
       <p>Perenggan pembuka artikel di sini.</p>
       <h2>Subtajuk Pertama</h2>
       <p>Penjelasan lanjut.</p>
       <ul>
         <li>Poin pertama</li>
         <li>Poin kedua</li>
       </ul>
     `
   },
   └─────────────────────────────────────────────────────────┘
   ---------------------------------------------------------- */
const ARTIKEL = [

  // ┌───────────────────────────────────────────────┐
  // │  MASIH KOSONG — tambah artikel anda di sini   │
  // └───────────────────────────────────────────────┘

];


/* ----------------------------------------------------------
   5. VIDEO (pilihan)
   ----------------------------------------------------------
   Kalau ada video YouTube, isikan id video di sini.
   { id: 'xxxxxxxxxxx', tajuk: 'Tajuk Video', tempoh: '5:24' }
   ---------------------------------------------------------- */
const VIDEO = [

  // Masih kosong

];


/* ----------------------------------------------------------
   6. TAG POPULAR (untuk sidebar & carian)
   ----------------------------------------------------------
   Kalau kosong, sistem akan kira sendiri dari tag resepi.
   ---------------------------------------------------------- */
const TAG_POPULAR = [
  'ayam', 'ikan', 'daging', 'sayur', 'sambal', 'kuih',
  'nasi', 'mi', 'santan', 'berempah', 'goreng', 'bakar',
  'mudah', 'jimat', 'raya'
];


/* ----------------------------------------------------------
   7. TETAPAN WEB
   ---------------------------------------------------------- */
const TETAPAN = {
  nama: 'Resepi Kampung',
  tagline: 'Warisan Dapur Nenek',
  deskripsi: 'Himpunan resepi masakan kampung Malaysia yang mudah diikuti — dari lauk harian hingga kuih tradisional warisan.',
  perPage: 9,           // berapa kad setiap halaman
  gambarGanti: [        // gambar sementara kalau resepi tiada gambar
    'images/placeholder-1.webp',
    'images/placeholder-2.webp',
    'images/placeholder-3.webp',
    'images/placeholder-4.webp'
  ]
};
