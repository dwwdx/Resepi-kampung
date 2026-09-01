/* ==========================================================
   RESEPI KAMPUNG — Engine
   Baca data.js, render kad, kendalikan nav/carian/filter.
   Anda tak perlu ubah fail ini bila tambah resepi.
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 1. HELPERS ---------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const BULAN = ['Januari','Februari','Mac','April','Mei','Jun',
                 'Julai','Ogos','September','Oktober','November','Disember'];

  function tarikhBM(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return esc(iso);
    return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
  }

  function gambar(item, i = 0) {
    if (item && item.img) return item.img;
    const g = (typeof TETAPAN !== 'undefined' && TETAPAN.gambarGanti) || [];
    return g.length ? g[i % g.length] : '';
  }

  const namaKategori = (slug) => {
    const semua = [].concat(
      typeof KATEGORI !== 'undefined' ? KATEGORI : [],
      typeof KATEGORI_ARTIKEL !== 'undefined' ? KATEGORI_ARTIKEL : []
    );
    const k = semua.find((x) => x.slug === slug);
    return k ? k.nama : (slug || '');
  };

  const initial = (nama) => (nama || 'R').trim().charAt(0).toUpperCase();
  const qs = (k) => new URLSearchParams(location.search).get(k) || '';

  const dataResepi  = () => (typeof RESEPI  !== 'undefined' ? RESEPI  : []);
  const dataArtikel = () => (typeof ARTIKEL !== 'undefined' ? ARTIKEL : []);

  function susunTarikh(arr) {
    return arr.slice().sort((a, b) => String(b.tarikh || '').localeCompare(String(a.tarikh || '')));
  }

  /* ---------- 2. IKON (inline SVG) ---------- */
  const I = {
    jam:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    orang:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    kalendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',
    api:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4.4 0 7-2.8 7-6.5 0-4-3-6.5-4.5-10C13 8 12 9.5 10.5 10 9 8.5 9 6 9 6c-2 2-4 4.4-4 9.5C5 19.2 7.6 22 12 22Z"/></svg>',
    pinggan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>',
    anak:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    buku:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',
    kosong: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18M5 11V9a7 7 0 0 1 14 0v2"/><path d="M4 11v2a8 8 0 0 0 16 0v-2"/><path d="M12 19v3M8 22h8"/></svg>',
    main:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
  };

  /* ---------- 3. RENDER: KAD RESEPI ---------- */
  function kadResepi(r, i, opsi) {
    opsi = opsi || {};
    const kelas = 'card reveal' + (opsi.feat ? ' card--feat' : '') +
                  (opsi.delay ? ' reveal-d' + opsi.delay : '');
    const badge = r.pilihan ? 'Pilihan Editor' : (r.trending ? 'Trending' : '');

    return `
      <article class="${kelas}">
        <div class="card-media">
          ${badge ? `<span class="badge badge--float">${esc(badge)}</span>` : ''}
          <img src="${esc(gambar(r, i))}" alt="${esc(r.tajuk)}" loading="lazy" decoding="async">
        </div>
        <div class="card-body">
          <span class="badge">${esc(namaKategori(r.kategori))}</span>
          <h3 class="card-title">${esc(r.tajuk)}</h3>
          ${r.ringkasan ? `<p class="card-excerpt">${esc(r.ringkasan)}</p>` : ''}
          <div class="card-meta">
            ${r.masa ? `<span class="m">${I.jam}${esc(r.masa)}</span><span class="sep"></span>` : ''}
            ${r.hidangan ? `<span class="m">${I.orang}${esc(r.hidangan)}</span><span class="sep"></span>` : ''}
            ${r.kesukaran ? `<span class="m">${I.api}${esc(r.kesukaran)}</span>` : ''}
          </div>
        </div>
        <a class="card-link" href="resepi-detail.html?r=${encodeURIComponent(r.slug)}">
          <span class="sr-only">Baca ${esc(r.tajuk)}</span>
        </a>
      </article>`;
  }

  /* ---------- 4. RENDER: KAD ARTIKEL ---------- */
  function kadArtikel(a, i, opsi) {
    opsi = opsi || {};
    const kelas = 'card reveal' + (opsi.feat ? ' card--feat' : '') +
                  (opsi.delay ? ' reveal-d' + opsi.delay : '');
    return `
      <article class="${kelas}">
        <div class="card-media">
          <img src="${esc(gambar(a, i))}" alt="${esc(a.tajuk)}" loading="lazy" decoding="async">
        </div>
        <div class="card-body">
          <span class="badge badge--kunyit">${esc(namaKategori(a.kategori))}</span>
          <h3 class="card-title">${esc(a.tajuk)}</h3>
          ${a.ringkasan ? `<p class="card-excerpt">${esc(a.ringkasan)}</p>` : ''}
          <div class="card-meta">
            ${a.penulis ? `<span class="m">${I.orang}${esc(a.penulis)}</span><span class="sep"></span>` : ''}
            ${a.tarikh ? `<span class="m">${I.kalendar}${tarikhBM(a.tarikh)}</span>` : ''}
            ${a.bacaan ? `<span class="sep"></span><span class="m">${I.jam}${esc(a.bacaan)}</span>` : ''}
          </div>
        </div>
        <a class="card-link" href="artikel-detail.html?a=${encodeURIComponent(a.slug)}">
          <span class="sr-only">Baca ${esc(a.tajuk)}</span>
        </a>
      </article>`;
  }

  /* ---------- 5. RENDER: KAD MENDATAR (sidebar) ---------- */
  function kadMendatar(item, i, jenis, nombor) {
    const url = jenis === 'artikel'
      ? `artikel-detail.html?a=${encodeURIComponent(item.slug)}`
      : `resepi-detail.html?r=${encodeURIComponent(item.slug)}`;
    return `
      <a class="card-h" href="${esc(url)}">
        <div class="card-h-media">
          ${nombor ? `<span class="card-h-num">${nombor}</span>` : ''}
          <img src="${esc(gambar(item, i))}" alt="${esc(item.tajuk)}" loading="lazy" decoding="async">
        </div>
        <div class="card-h-body">
          <h4>${esc(item.tajuk)}</h4>
          <small>${item.tarikh ? tarikhBM(item.tarikh) : esc(namaKategori(item.kategori))}</small>
        </div>
      </a>`;
  }

  /* ---------- 6. EMPTY STATE ---------- */
  function kosong(tajuk, teks, tunjukTag) {
    const tags = tunjukTag
      ? `<div class="empty-tags">${(typeof KATEGORI !== 'undefined' ? KATEGORI : [])
          .slice(0, 6)
          .map((k) => `<span class="chip">${esc(k.nama)}</span>`).join('')}</div>`
      : '';
    return `
      <div class="empty">
        <div class="empty-icon">${I.kosong}</div>
        <h3>${esc(tajuk)}</h3>
        <p>${esc(teks)}</p>
        ${tags}
      </div>`;
  }

  function kadSkeleton(n) {
    let out = '';
    for (let i = 0; i < n; i++) {
      out += `<div class="skel reveal reveal-d${(i % 5) + 1}">
        <div class="skel-media"></div>
        <div class="skel-body">
          <div class="skel-line w40"></div>
          <div class="skel-line"></div>
          <div class="skel-line w80"></div>
          <div class="skel-line w55"></div>
        </div>
      </div>`;
    }
    return out;
  }

  /* ---------- 7. HEADER: scroll, burger, dropdown mobile ---------- */
  function initHeader() {
    const header = $('.site-header');
    const burger = $('#burger');
    const menu   = $('#mobileMenu');
    const toTop  = $('#toTop');

    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle('scrolled', y > 8);
      if (toTop) toTop.classList.toggle('show', y > 520);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger && menu) {
      burger.addEventListener('click', () => {
        const buka = menu.classList.toggle('open');
        burger.classList.toggle('open', buka);
        burger.setAttribute('aria-expanded', String(buka));
        document.body.classList.toggle('locked', buka);
      });
    }

    // Accordion dalam mobile menu
    $$('.m-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sub = btn.nextElementSibling;
        const buka = btn.classList.toggle('open');
        if (sub) sub.classList.toggle('open', buka);
        btn.setAttribute('aria-expanded', String(buka));
      });
    });

    if (toTop) {
      toTop.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Tanda link aktif
    const kini = location.pathname.split('/').pop() || 'index.html';
    $$('.nav-menu a, .mobile-menu a').forEach((a) => {
      const href = (a.getAttribute('href') || '').split('?')[0];
      if (href && href === kini) a.classList.add('active');
    });
  }

  /* ---------- 8. CARIAN ---------- */
  function initCarian() {
    const overlay = $('#searchOverlay');
    const input   = $('#searchInput');
    const hasil   = $('#searchResults');
    const hint    = $('#searchHint');
    if (!overlay) return;

    const buka = () => {
      overlay.classList.add('open');
      document.body.classList.add('locked');
      setTimeout(() => input && input.focus(), 90);
    };
    const tutup = () => {
      overlay.classList.remove('open');
      document.body.classList.remove('locked');
    };

    $$('[data-search-open]').forEach((b) => b.addEventListener('click', buka));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) tutup(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') tutup();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); buka(); }
    });

    if (!input || !hasil) return;

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) {
        hasil.innerHTML = '';
        if (hint) hint.classList.remove('hide');
        return;
      }
      if (hint) hint.classList.add('hide');

      const padan = (x) =>
        String(x.tajuk || '').toLowerCase().includes(q) ||
        String(x.ringkasan || '').toLowerCase().includes(q) ||
        (x.tag || []).some((t) => String(t).toLowerCase().includes(q));

      const r = dataResepi().filter(padan).slice(0, 5)
        .map((x, i) => ({ x, i, jenis: 'resepi' }));
      const a = dataArtikel().filter(padan).slice(0, 3)
        .map((x, i) => ({ x, i, jenis: 'artikel' }));
      const semua = r.concat(a);

      if (!semua.length) {
        hasil.innerHTML = `<p style="padding:18px;text-align:center;color:var(--teks-3);font-size:.9rem">
          Tiada hasil untuk "${esc(input.value)}". Resepi sedang dikemas kini.</p>`;
        return;
      }

      hasil.innerHTML = semua.map(({ x, i, jenis }) => {
        const url = jenis === 'artikel'
          ? `artikel-detail.html?a=${encodeURIComponent(x.slug)}`
          : `resepi-detail.html?r=${encodeURIComponent(x.slug)}`;
        return `<a href="${esc(url)}">
          <img src="${esc(gambar(x, i))}" alt="">
          <span><b>${esc(x.tajuk)}</b><small>${esc(namaKategori(x.kategori))}</small></span>
        </a>`;
      }).join('');
    });
  }

  /* ---------- 9. REVEAL ON SCROLL ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- 10. RENDER HALAMAN UTAMA ---------- */
  function renderUtama() {
    const resepi  = susunTarikh(dataResepi());
    const artikel = susunTarikh(dataArtikel());

    // Statistik hero
    const setStat = (sel, nilai) => { const el = $(sel); if (el) el.textContent = nilai; };
    setStat('#statResepi', resepi.length);
    setStat('#statArtikel', artikel.length);
    setStat('#statKategori', (typeof KATEGORI !== 'undefined' ? KATEGORI : []).length);

    // Grid resepi terbaru
    const gridBaru = $('#gridTerbaru');
    if (gridBaru) {
      if (resepi.length) {
        gridBaru.innerHTML = resepi.slice(0, 6)
          .map((r, i) => kadResepi(r, i, { delay: (i % 5) + 1 })).join('');
      } else {
        gridBaru.innerHTML = kadSkeleton(3);
        const nota = $('#notaTerbaru');
        if (nota) nota.classList.remove('hide');
      }
    }

    // Kategori
    const gridKat = $('#gridKategori');
    if (gridKat && typeof KATEGORI !== 'undefined') {
      gridKat.innerHTML = KATEGORI.map((k, i) => {
        const bil = resepi.filter((r) => r.kategori === k.slug).length;
        return `
          <a class="kat-card reveal reveal-d${(i % 5) + 1}" href="resepi.html?kategori=${encodeURIComponent(k.slug)}">
            <span class="kat-card-count">${bil} resepi</span>
            <img src="${esc(k.img)}" alt="${esc(k.nama)}" loading="lazy" decoding="async">
            <div class="kat-card-body">
              <h3>${esc(k.nama)}</h3>
              <p>${esc(k.desc)} ${I.anak}</p>
            </div>
          </a>`;
      }).join('');
    }

    // Trending sidebar
    const listTrend = $('#listTrending');
    if (listTrend) {
      const trend = resepi.filter((r) => r.trending);
      const guna = (trend.length ? trend : resepi).slice(0, 5);
      listTrend.innerHTML = guna.length
        ? guna.map((r, i) => kadMendatar(r, i, 'resepi', i + 1)).join('')
        : `<p style="color:var(--teks-3);font-size:.88rem;padding:6px 4px">
             Resepi trending akan muncul di sini sebaik sahaja resepi ditambah.</p>`;
    }

    // Kategori sidebar
    const katSide = $('#sidebarKategori');
    if (katSide && typeof KATEGORI !== 'undefined') {
      katSide.innerHTML = KATEGORI.map((k) => {
        const bil = resepi.filter((r) => r.kategori === k.slug).length;
        return `<a href="resepi.html?kategori=${encodeURIComponent(k.slug)}">
          ${esc(k.nama)}<span>${bil}</span></a>`;
      }).join('');
    }

    // Tag sidebar
    const tagSide = $('#sidebarTag');
    if (tagSide) {
      const dariResepi = [...new Set(resepi.flatMap((r) => r.tag || []))];
      const senarai = dariResepi.length ? dariResepi
        : (typeof TAG_POPULAR !== 'undefined' ? TAG_POPULAR : []);
      tagSide.innerHTML = senarai.slice(0, 14)
        .map((t) => `<a href="resepi.html?tag=${encodeURIComponent(t)}">${esc(t)}</a>`).join('');
    }

    // Artikel terbaru
    const gridArt = $('#gridArtikel');
    if (gridArt) {
      if (artikel.length) {
        gridArt.innerHTML = artikel.slice(0, 3)
          .map((a, i) => kadArtikel(a, i, { delay: (i % 3) + 1 })).join('');
      } else {
        gridArt.innerHTML = kadSkeleton(3);
        const nota = $('#notaArtikel');
        if (nota) nota.classList.remove('hide');
      }
    }

    // Video
    const gridVid = $('#gridVideo');
    if (gridVid) {
      const vids = (typeof VIDEO !== 'undefined' ? VIDEO : []);
      if (vids.length) {
        gridVid.innerHTML = vids.slice(0, 3).map((v, i) => `
          <a class="video-card reveal reveal-d${i + 1}"
             href="https://www.youtube.com/watch?v=${esc(v.id)}" target="_blank" rel="noopener">
            <img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="${esc(v.tajuk)}" loading="lazy">
            <span class="video-play">${I.main}</span>
            <div class="video-info"><h4>${esc(v.tajuk)}</h4>
              ${v.tempoh ? `<small>${esc(v.tempoh)}</small>` : ''}</div>
          </a>`).join('');
      } else {
        const sec = $('#secVideo');
        if (sec) sec.classList.add('hide');
      }
    }
  }

  /* ---------- 11. RENDER SENARAI (resepi.html / artikel.html) ---------- */
  function renderSenarai(jenis) {
    const grid = $('#gridSenarai');
    if (!grid) return;

    const semua = susunTarikh(jenis === 'artikel' ? dataArtikel() : dataResepi());
    const kats = jenis === 'artikel'
      ? (typeof KATEGORI_ARTIKEL !== 'undefined' ? KATEGORI_ARTIKEL : [])
      : (typeof KATEGORI !== 'undefined' ? KATEGORI : []);

    let katAktif = qs('kategori');
    const tagAktif = qs('tag');

    // Bina chip filter
    const bar = $('#filterBar');
    if (bar) {
      bar.innerHTML =
        `<button class="chip${katAktif ? '' : ' active'}" data-kat="">Semua</button>` +
        kats.map((k) => {
          const bil = semua.filter((x) => x.kategori === k.slug).length;
          return `<button class="chip${katAktif === k.slug ? ' active' : ''}" data-kat="${esc(k.slug)}">
            ${esc(k.nama)}${bil ? ` (${bil})` : ''}</button>`;
        }).join('') +
        `<span class="filter-count" id="filterCount"></span>`;
    }

    function papar() {
      let senarai = semua;
      if (katAktif) senarai = senarai.filter((x) => x.kategori === katAktif);
      if (tagAktif) senarai = senarai.filter((x) =>
        (x.tag || []).some((t) => String(t).toLowerCase() === tagAktif.toLowerCase()));

      const kira = $('#filterCount');
      if (kira) {
        kira.textContent = senarai.length
          ? `${senarai.length} ${jenis === 'artikel' ? 'artikel' : 'resepi'}`
          : '';
      }

      if (!senarai.length) {
        const label = jenis === 'artikel' ? 'artikel' : 'resepi';
        grid.className = '';
        grid.innerHTML = kosong(
          `Belum ada ${label} lagi`,
          katAktif
            ? `Tiada ${label} dalam kategori "${namaKategori(katAktif)}" buat masa ini. Kandungan sedang disiapkan dan akan ditambah tidak lama lagi.`
            : `Kandungan sedang disiapkan. Semua ${label} akan dipaparkan di sini sebaik sahaja ia ditambah.`,
          !katAktif
        );
        return;
      }

      grid.className = 'grid g-3';
      grid.innerHTML = senarai.map((x, i) =>
        jenis === 'artikel'
          ? kadArtikel(x, i, { delay: (i % 5) + 1 })
          : kadResepi(x, i, { delay: (i % 5) + 1 })
      ).join('');
      initReveal();
    }

    if (bar) {
      bar.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        katAktif = chip.dataset.kat || '';
        $$('.chip', bar).forEach((c) => c.classList.toggle('active', c === chip));
        const u = new URL(location.href);
        katAktif ? u.searchParams.set('kategori', katAktif) : u.searchParams.delete('kategori');
        history.replaceState(null, '', u);
        papar();
      });
    }

    // Tajuk halaman ikut kategori
    if (katAktif) {
      const h = $('#senaraiTajuk');
      if (h) h.textContent = namaKategori(katAktif);
      const c = $('#crumbAktif');
      if (c) c.textContent = namaKategori(katAktif);
    }
    if (tagAktif) {
      const h = $('#senaraiTajuk');
      if (h) h.textContent = `Tag: ${tagAktif}`;
    }

    papar();
  }

  /* ---------- 12. RENDER DETAIL ---------- */
  function renderDetail(jenis) {
    const wrap = $('#detailWrap');
    if (!wrap) return;

    const slug = qs(jenis === 'artikel' ? 'a' : 'r');
    const semua = jenis === 'artikel' ? dataArtikel() : dataResepi();
    const item = semua.find((x) => x.slug === slug);

    if (!item) {
      wrap.innerHTML = kosong(
        'Kandungan belum tersedia',
        jenis === 'artikel'
          ? 'Artikel ini belum ditambah. Sila kembali ke senarai artikel.'
          : 'Resepi ini belum ditambah. Sila kembali ke senarai resepi.',
        false
      ) + `<div class="center-btn">
              <a class="btn btn--primary" href="${jenis === 'artikel' ? 'artikel.html' : 'resepi.html'}">
                Lihat semua ${jenis === 'artikel' ? 'artikel' : 'resepi'}</a>
            </div>`;
      return;
    }

    document.title = `${item.tajuk} — Resepi Kampung`;
    const bcTajuk = $('#crumbAktif');
    if (bcTajuk) bcTajuk.textContent = item.tajuk;
    const hTajuk = $('#detailTajuk');
    if (hTajuk) hTajuk.textContent = item.tajuk;
    const hKat = $('#detailKategori');
    if (hKat) hKat.textContent = namaKategori(item.kategori);
    const hRing = $('#detailRingkasan');
    if (hRing && item.ringkasan) hRing.textContent = item.ringkasan;

    let html = `
      <div class="byline">
        <span class="byline-av">${esc(initial(item.penulis))}</span>
        <div class="byline-info">
          <b>${esc(item.penulis || 'Resepi Kampung')}</b>
          <small>${item.tarikh ? tarikhBM(item.tarikh) : ''}
            ${item.bacaan ? ` · ${esc(item.bacaan)} bacaan` : ''}</small>
        </div>
      </div>
      <img src="${esc(gambar(item, 0))}" alt="${esc(item.tajuk)}"
           style="border-radius:var(--r-lg);width:100%;aspect-ratio:16/9;object-fit:cover">`;

    if (jenis === 'resepi') {
      html += `
        <div class="resepi-meta">
          ${item.masa ? `<div>${I.jam}<small>Masa</small><b>${esc(item.masa)}</b></div>` : ''}
          ${item.hidangan ? `<div>${I.orang}<small>Hidangan</small><b>${esc(item.hidangan)}</b></div>` : ''}
          ${item.kesukaran ? `<div>${I.api}<small>Kesukaran</small><b>${esc(item.kesukaran)}</b></div>` : ''}
          ${item.kategori ? `<div>${I.pinggan}<small>Kategori</small><b>${esc(namaKategori(item.kategori))}</b></div>` : ''}
        </div>
        <div class="prose">`;
      if (item.bahan && item.bahan.length) {
        html += `<h2>Bahan-Bahan</h2><ul>${
          item.bahan.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`;
      }
      if (item.langkah && item.langkah.length) {
        html += `<h2>Cara Membuat</h2><ol>${
          item.langkah.map((l) => `<li>${esc(l)}</li>`).join('')}</ol>`;
      }
      if (item.petua) html += `<h2>Petua</h2><blockquote>${esc(item.petua)}</blockquote>`;
      html += `</div>`;
    } else {
      html += `<div class="prose">${item.kandungan || `<p>${esc(item.ringkasan || '')}</p>`}</div>`;
    }

    if (item.tag && item.tag.length) {
      html += `<div class="tag-cloud mt-6">${item.tag.map((t) =>
        `<a href="resepi.html?tag=${encodeURIComponent(t)}">#${esc(t)}</a>`).join('')}</div>`;
    }

    wrap.innerHTML = html;

    // Berkaitan
    const berk = $('#listBerkaitan');
    if (berk) {
      const lain = semua.filter((x) => x.slug !== item.slug && x.kategori === item.kategori)
        .concat(semua.filter((x) => x.slug !== item.slug && x.kategori !== item.kategori))
        .slice(0, 4);
      berk.innerHTML = lain.length
        ? lain.map((x, i) => kadMendatar(x, i, jenis)).join('')
        : `<p style="color:var(--teks-3);font-size:.88rem;padding:6px 4px">Belum ada kandungan berkaitan.</p>`;
    }

    initReveal();
  }

  /* ---------- 13. NEWSLETTER (demo, tiada backend) ---------- */
  function initBorang() {
    $$('form[data-demo]').forEach((f) => {
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = f.querySelector('button[type=submit]');
        if (!btn) return;
        const asal = btn.textContent;
        btn.textContent = 'Terima kasih!';
        btn.disabled = true;
        f.reset();
        setTimeout(() => { btn.textContent = asal; btn.disabled = false; }, 2600);
      });
    });
  }

  /* ---------- 14. BOOT ---------- */
  let sudahBoot = false;
  function boot() {
    if (sudahBoot) return;
    sudahBoot = true;
    initHeader();
    initCarian();
    initBorang();

    const halaman = document.body.dataset.page;
    if (halaman === 'utama')          renderUtama();
    else if (halaman === 'resepi')    renderSenarai('resepi');
    else if (halaman === 'artikel')   renderSenarai('artikel');
    else if (halaman === 'resepi-detail')  renderDetail('resepi');
    else if (halaman === 'artikel-detail') renderDetail('artikel');

    // Tahun footer
    $$('[data-tahun]').forEach((el) => { el.textContent = new Date().getFullYear(); });

    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
