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

  {
    slug: 'nasi-kari-kambing',
    tajuk: 'Nasi Kari Kambing',
    ringkasan: 'Menu mudah tetapi sangat sedap, lengkap dengan air asam kerisik yang menyegarkan.',
    kategori: 'nasi-mi',
    img: 'images/resepi/nasi-kari-kambing.png',
    penulis: 'Resepi Kampung',
    tarikh: '2026-09-03',
    kesukaran: 'Mudah',
    trending: false,
    pilihan: false,
    tag: ['kambing', 'nasi', 'kari', 'air asam', 'mudah'],
    tiktok: 'https://vt.tiktok.com/ZSq1PjN43/',

    bahagianBahan: [
      {
        tajuk: 'Nasi Kari Kambing',
        bahan: [
          '1–2 sudu besar minyak sapi/butter',
          '3 ulas bawang putih',
          '½ biji bawang besar',
          'Halia',
          '3 sekawan',
          'Daun pandan',
          'Daun kari',
          '1 tin kecil kari kambing',
          '½ cawan susu cair',
          '2 cawan beras basmathi',
          '2½ cawan air',
          'Stok ayam atau kiub ayam',
          'Telur rebus',
          'Daun ketumbar'
        ]
      },
      {
        tajuk: 'Air Asam Kerisik',
        bahan: [
          '2–3 tangkai cili besar',
          '2 tangkai cili padi',
          'Belacan',
          '1 biji tomato (saiz kecil)',
          'Sedikit gula',
          'Garam & perasa',
          'Air asam jawa',
          '1–2 biji tomato',
          '1 biji bawang besar',
          'Cili padi mengikut citarasa',
          'Sedikit sos cili',
          '1–2 sudu besar kerisik',
          'Perahan limau nipis'
        ]
      }
    ],

    langkah: [
      'Untuk langkah penyediaan lengkap, sila rujuk video TikTok melalui butang di atas.'
    ],

    petua: 'Makan nasi ini begitu sahaja pun sudah cukup menyelerakan. Hidangkan bersama air asam kerisik untuk rasa yang lebih lengkap.'
  },

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

  {
    slug: '7-bahan-dapur-naikkan-rasa-masakan',
    tajuk: '7 Bahan Dapur Yang Boleh Membantu Naikkan Rasa Masakan',
    ringkasan: 'Kenali tujuh bahan dapur yang membantu menyerlahkan rasa, aroma dan tekstur masakan.',
    kategori: 'tips-petua',
    img: 'images/artikel/petua-di-dapur.jpeg',
    penulis: 'Resepi Kampung',
    bacaan: '4 minit',
    tag: ['bahan dapur', 'tips masakan', 'petua dapur'],
    kandungan: `
      <p>Masakan yang sedap bukan semata-mata bergantung pada banyaknya bahan yang digunakan. Cara memasak, keseimbangan rasa dan pemilihan bahan juga memainkan peranan penting.</p>
      <p>Selain garam, terdapat beberapa bahan dapur yang boleh membantu memberikan rasa, aroma atau tekstur yang lebih menarik pada hidangan. Namun, setiap bahan mempunyai fungsi yang berbeza dan penggunaannya perlu disesuaikan dengan jenis masakan.</p>
      <h2>1. Gula Melaka</h2>
      <p>Gula Melaka boleh digunakan untuk memberikan rasa manis serta aroma yang tersendiri. Ia sesuai dalam masakan yang memerlukan sedikit rasa manis seperti sambal, masakan berkuah dan sesetengah hidangan tradisional.</p>
      <p>Gunakan sedikit demi sedikit supaya rasa manis tidak mengatasi rasa utama masakan.</p>
      <h2>2. Garam</h2>
      <p>Garam bukan sekadar memberikan rasa masin. Dalam masakan, jumlah garam yang sesuai boleh membantu menyerlahkan rasa bahan-bahan lain.</p>
      <p>Untuk daging, garam juga boleh mempengaruhi tekstur dan kejuicinan apabila digunakan dengan teknik yang betul. Kaedah dan masa penggunaannya bergantung pada jenis hidangan.</p>
      <h2>3. Santan</h2>
      <p>Santan memberikan rasa lemak dan tekstur berkrim kepada masakan seperti masak lemak, kari dan beberapa jenis kuih.</p>
      <p>Ketika memasak hidangan bersantan, gunakan api yang sesuai dan kacau mengikut keperluan resipi. Elakkan memasak pada suhu terlalu tinggi untuk tempoh yang lama kerana santan boleh pecah dan menghasilkan kuah yang berminyak.</p>
      <h2>4. Asam Jawa</h2>
      <p>Asam jawa merupakan antara bahan yang biasa digunakan untuk memberikan rasa masam.</p>
      <p>Dalam masakan tertentu, rasa masam boleh membantu mengimbangi rasa manis, masin, pedas dan berlemak. Sebab itu ia sesuai digunakan dalam hidangan seperti asam pedas, sambal dan pelbagai jenis kuah.</p>
      <h2>5. Bawang Putih</h2>
      <p>Bawang putih boleh memberikan aroma dan rasa yang kuat kepada masakan. Ia sering digunakan sebagai bahan tumisan bersama bawang merah, halia atau bahan aromatik lain.</p>
      <p>Untuk mendapatkan aroma yang lebih harum, bawang putih boleh ditumis sehingga naik bau sebelum bahan-bahan lain dimasukkan.</p>
      <h2>6. Halia</h2>
      <p>Halia bukan sahaja menambahkan aroma, malah memberikan rasa pedas dan hangat yang tersendiri. Ia sesuai digunakan dalam sup, masakan berkuah, tumisan dan hidangan berasaskan ayam atau ikan.</p>
      <p>Jumlah yang digunakan boleh disesuaikan mengikut jenis masakan kerana rasa halia boleh menjadi agak kuat jika digunakan terlalu banyak.</p>
      <h2>7. Cuka</h2>
      <p>Cuka boleh digunakan dalam jumlah kecil untuk memberikan rasa masam dan membantu menyeimbangkan sesetengah hidangan.</p>
      <p>Ia boleh digunakan dalam masakan seperti sos, acar, sambal atau hidangan yang memerlukan sedikit rasa masam. Tambahkan sedikit demi sedikit sambil merasa supaya rasa akhir tidak terlalu masam.</p>
      <h2>Kesimpulan</h2>
      <p>Untuk menghasilkan masakan yang lebih sedap, tidak semestinya perlu menggunakan banyak bahan perasa. Yang penting ialah memahami fungsi setiap bahan dan menggunakannya dalam jumlah yang sesuai.</p>
      <p>Cuba tambah atau kurangkan sesuatu bahan secara berperingkat sambil merasa masakan. Dengan cara ini, lebih mudah untuk mendapatkan keseimbangan rasa yang sesuai dengan selera sendiri dan keluarga.</p>
      <p><strong>Tip kecil:</strong> Jangan takut untuk merasa masakan beberapa kali ketika memasak. Deria rasa kita ialah panduan paling berguna untuk menentukan sama ada hidangan memerlukan sedikit tambahan garam, rasa masam, manis atau bahan aromatik.</p>
    `
  }

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
