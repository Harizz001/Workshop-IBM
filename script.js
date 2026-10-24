/* ==========================================================
   ONBOARDING BUDDY SYSTEM — script.js
   Vanilla JavaScript · Semua interaksi tanpa page refresh
   ========================================================== */

'use strict';

// ══════════════════════════════════════════════════════════════
// 1. DATA LAYER
// ══════════════════════════════════════════════════════════════

/**
 * Daftar tugas checklist onboarding awal.
 * Setiap item: { id, text, completed }
 */
let checklistData = [
  { id: 1, text: 'Setup Email Perusahaan',         completed: false },
  { id: 2, text: 'Akses & Setup Slack',             completed: false },
  { id: 3, text: 'Meet & Greet dengan Buddy',       completed: false },
  { id: 4, text: 'Baca SOP Kerja Harian',           completed: false },
  { id: 5, text: 'Isi Form Data Karyawan (HR)',     completed: false },
  { id: 6, text: 'Setup Akun Jira / Trello',        completed: false },
  { id: 7, text: 'Ikuti Orientasi Virtual Tim',     completed: false },
  { id: 8, text: 'Review Kebijakan Cuti & Lembur',  completed: false },
];

/** Auto-increment ID untuk task baru */
let nextTaskId = checklistData.length + 1;

// ──────────────────────────────────────────────────────────────

/**
 * Resource / SOP Cards data.
 * Setiap item: { id, icon, title, desc, tag, accent, category }
 * category: 'sop' | 'tools' | 'hr'  — digunakan oleh filter tab
 */
const resourceData = [
  {
    id: 1,
    icon: '📋',
    title: 'SOP Kerja Harian',
    desc: 'Panduan standar operasional harian mulai dari absensi, standar komunikasi, hingga alur pelaporan pekerjaan.',
    tag: 'SOP Utama',
    accent: 'accent-blue',
    category: 'sop',
    keywords: 'sop kerja harian absensi komunikasi pelaporan',
  },
  {
    id: 2,
    icon: '🛠️',
    title: 'Akses Tools & Sistem',
    desc: 'Cara mendapatkan akses ke Slack, Jira, Google Workspace, VPN, dan tools internal perusahaan lainnya.',
    tag: 'IT & Tools',
    accent: 'accent-teal',
    category: 'tools',
    keywords: 'tools sistem slack jira google workspace vpn akses',
  },
  {
    id: 3,
    icon: '📞',
    title: 'Kontak HR & Support',
    desc: 'Daftar kontak penting: HR Generalist, IT Helpdesk, Office Manager, dan Buddy Onboarding kamu.',
    tag: 'Kontak Penting',
    accent: 'accent-indigo',
    category: 'hr',
    keywords: 'kontak hr support helpdesk office manager buddy',
  },
  {
    id: 4,
    icon: '🏖️',
    title: 'Kebijakan Cuti & Benefit',
    desc: 'Informasi lengkap tentang jatah cuti tahunan, cuti sakit, remote working, tunjangan, dan benefit karyawan.',
    tag: 'HR Policy',
    accent: 'accent-orange',
    category: 'hr',
    keywords: 'cuti benefit tunjangan remote working sakit tahunan kebijakan',
  },
  {
    id: 5,
    icon: '🤝',
    title: 'Budaya & Nilai Perusahaan',
    desc: 'Kenali misi, visi, nilai inti, kode etik, dan budaya kerja yang membentuk lingkungan perusahaan.',
    tag: 'Kultur',
    accent: 'accent-blue',
    category: 'sop',
    keywords: 'budaya nilai perusahaan misi visi kode etik kultur',
  },
  {
    id: 6,
    icon: '🎓',
    title: 'Program Pelatihan & L&D',
    desc: 'Panduan program learning & development, platform e-learning, dan alur pengajuan training eksternal.',
    tag: 'Learning',
    accent: 'accent-teal',
    category: 'hr',
    keywords: 'pelatihan training learning development elearning l&d',
  },
];

/** Kategori aktif saat ini untuk filter resource cards */
let activeCategoryFilter = 'all';

// ──────────────────────────────────────────────────────────────

/**
 * Knowledge Base untuk AI Buddy Chatbot.
 * Format: array of { keywords: [], answer: string }
 */
const knowledgeBase = [
  {
    keywords: ['cuti', 'liburan', 'annual leave', 'izin', 'jatah cuti'],
    answer: 'Karyawan berhak atas **12 hari cuti tahunan** setelah 3 bulan masa kerja. Pengajuan cuti dilakukan minimal 3 hari sebelumnya melalui sistem HR (HRIS). Untuk informasi lengkap, cek kartu "Kebijakan Cuti & Benefit" di bagian Resource. 🏖️',
  },
  {
    keywords: ['slack', 'setup slack', 'akses slack', 'channel'],
    answer: 'Untuk akses Slack: 1️⃣ Install Slack dari slack.com. 2️⃣ Daftar dengan email perusahaan (@company.com). 3️⃣ Join channel #general, #onboarding, dan channel divisi kamu. Butuh bantuan? Hubungi IT Helpdesk di ext. 1234. 💬',
  },
  {
    keywords: ['email', 'setup email', 'akun email', 'gmail', 'google workspace'],
    answer: 'Email perusahaan menggunakan **Google Workspace**. Akun sudah disiapkan IT sebelum hari pertama. Login di mail.google.com dengan format nama.belakang@company.com. Password awal akan dikirim ke email pribadi. 📧',
  },
  {
    keywords: ['jira', 'trello', 'project management', 'task', 'tugas'],
    answer: 'Perusahaan menggunakan **Jira** untuk manajemen proyek. Akses diberikan oleh Team Lead dalam 2 hari kerja pertama. Ikuti panduan "Getting Started with Jira" di Confluence atau tanya Tech Lead kamu. 📊',
  },
  {
    keywords: ['absensi', 'presensi', 'masuk kerja', 'jam kerja', 'check in'],
    answer: 'Jam kerja standar adalah **Senin–Jumat, 08.00–17.00 WIB**. Absensi dilakukan via aplikasi HRIS (scan QR Code di lobby atau app mobile). WFH bisa dilakukan max 2 hari/minggu sesuai persetujuan atasan. ⏰',
  },
  {
    keywords: ['hr', 'human resource', 'kontak hr', 'siapa hr', 'helpdesk'],
    answer: 'Kontak HR:\n• **HR Generalist**: Budi Santoso – budi.s@company.com\n• **IT Helpdesk**: helpdesk@company.com / ext. 1234\n• **Office Manager**: Sari Dewi – sari.d@company.com\n• **Buddy Onboarding**: Dilihat di portal karyawan 👥',
  },
  {
    keywords: ['vpn', 'remote', 'work from home', 'wfh', 'remote access'],
    answer: 'Untuk WFH, kamu memerlukan **VPN perusahaan** (Cisco AnyConnect). Installer dan panduan setup bisa didownload di portal IT internal. Request akses VPN ke helpdesk@company.com dengan menyertakan ID Karyawan. 🔒',
  },
  {
    keywords: ['gaji', 'payroll', 'slip gaji', 'paycheck', 'tunjangan'],
    answer: 'Gaji dibayarkan setiap **tanggal 25** setiap bulan. Slip gaji dapat diakses di portal HRIS bagian "Payroll". Untuk pertanyaan terkait gaji/tunjangan, hubungi HR Finance di finance.hr@company.com. 💰',
  },
  {
    keywords: ['pelatihan', 'training', 'learning', 'kursus', 'sertifikasi', 'l&d'],
    answer: 'Program L&D tersedia melalui platform **Coursera for Business** dan pelatihan internal bulanan. Pengajuan training eksternal/sertifikasi dilakukan via form L&D di portal HR, disetujui manager dan HR. 🎓',
  },
  {
    keywords: ['buddy', 'onboarding buddy', 'mentor', 'siapa buddy'],
    answer: 'Onboarding Buddy kamu sudah ditentukan dan akan menghubungimu di hari pertama via Slack 👋. Buddy bertugas membantumu selama 3 bulan pertama — jangan sungkan bertanya apa saja! Cek nama Buddy-mu di portal karyawan. 🤝',
  },
  {
    keywords: ['sop', 'standar operasional', 'prosedur', 'panduan kerja'],
    answer: 'SOP lengkap tersedia di **Confluence** (akses via akun Google Workspace). SOP utama: Komunikasi Harian, Pelaporan Pekerjaan, Eskalasi Issue, dan Meeting Etiquette. Cek juga kartu "SOP Kerja Harian" di bagian Resource. 📋',
  },
  {
    keywords: ['halo', 'hai', 'hi', 'hello', 'selamat'],
    answer: 'Halo! 👋 Selamat datang di keluarga besar perusahaan! Saya AI Buddy, siap membantu kamu menavigasi proses onboarding. Kamu bisa tanya seputar SOP, tools, cuti, HR, atau hal lain yang ingin kamu ketahui. Apa yang bisa saya bantu? 😊',
  },
  {
    keywords: ['terima kasih', 'thanks', 'thank you', 'makasih'],
    answer: 'Sama-sama! 😊 Jangan ragu untuk bertanya lagi jika ada hal lain yang perlu diketahui. Semangat ya, onboarding-mu pasti berjalan lancar! 🚀',
  },
];

/** Pesan default jika pertanyaan tidak cocok dengan knowledge base */
const defaultReply =
  'Hmm, saya belum punya jawaban spesifik untuk itu. 🤔 Coba tanyakan ke HR Generalist di budi.s@company.com atau IT Helpdesk di ext. 1234. Saya juga terus belajar — pertanyaanmu sudah dicatat! 📝';

/** Saran pertanyaan cepat untuk quick suggestions */
const quickSuggestions = [
  'Cara akses Slack?',
  'Kebijakan cuti?',
  'Kontak HR?',
  'Setup email',
  'Jam kerja?',
];


// ══════════════════════════════════════════════════════════════
// 2. UTILITIES
// ══════════════════════════════════════════════════════════════

/** Format waktu HH:MM */
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

/** Escape HTML untuk mencegah XSS */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Parse markdown ringan: **bold** dan newline → <br>
 * Digunakan untuk render respons bot
 */
function parseMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}


// ══════════════════════════════════════════════════════════════
// 3. MODULE: PROGRESS BAR
// ══════════════════════════════════════════════════════════════

/** Update progress bar dan label berdasarkan state checklist saat ini */
function updateProgress() {
  const total     = checklistData.length;
  const completed = checklistData.filter(t => t.completed).length;
  const pct       = total === 0 ? 0 : Math.round((completed / total) * 100);

  const bar     = document.getElementById('progressBar');
  const label   = document.getElementById('progressLabel');
  const counter = document.getElementById('checklistCounter');

  bar.style.width      = pct + '%';
  label.textContent    = `${completed} / ${total} selesai`;
  counter.textContent  = `${completed}/${total}`;
}


// ══════════════════════════════════════════════════════════════
// 4. MODULE: ONBOARDING CHECKLIST (CRUD + Toggle)
// ══════════════════════════════════════════════════════════════

/** Render ulang seluruh daftar checklist ke DOM */
function renderChecklist() {
  const ul = document.getElementById('checklistItems');
  ul.innerHTML = '';

  checklistData.forEach(task => {
    const li = document.createElement('li');
    li.className = `checklist-item${task.completed ? ' completed' : ''}`;
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
      <input
        type="checkbox"
        class="task-checkbox"
        id="task-${task.id}"
        ${task.completed ? 'checked' : ''}
        onchange="toggleTask(${task.id})"
        aria-label="${escapeHtml(task.text)}"
      />
      <label for="task-${task.id}" class="task-text">${escapeHtml(task.text)}</label>
      <button
        class="btn-delete-task"
        onclick="deleteTask(${task.id})"
        title="Hapus tugas"
        aria-label="Hapus tugas: ${escapeHtml(task.text)}"
      >✕</button>
    `;
    ul.appendChild(li);
  });

  updateProgress();
}

/** Toggle status selesai/belum selesai sebuah task */
function toggleTask(id) {
  const task = checklistData.find(t => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  renderChecklist();
}

/** Hapus task dari daftar */
function deleteTask(id) {
  checklistData = checklistData.filter(t => t.id !== id);
  renderChecklist();
}

/** Tambah task baru dari input */
function addTask() {
  const input = document.getElementById('newTaskInput');
  const text  = input.value.trim();
  if (!text) {
    input.focus();
    input.classList.add('ring-2', 'ring-red-400');
    setTimeout(() => input.classList.remove('ring-2', 'ring-red-400'), 1200);
    return;
  }
  checklistData.push({ id: nextTaskId++, text, completed: false });
  input.value = '';
  renderChecklist();
  // Scroll ke item baru
  const ul = document.getElementById('checklistItems');
  ul.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}


// ══════════════════════════════════════════════════════════════
// 5. MODULE: RESOURCE & SOP CARDS
// ══════════════════════════════════════════════════════════════

/** Render semua kartu resource ke dalam grid */
function renderResources() {
  const grid = document.getElementById('resourceGrid');
  grid.innerHTML = '';

  resourceData.forEach(res => {
    const card = document.createElement('article');
    card.className = `resource-card ${res.accent}`;
    card.setAttribute('role', 'listitem');
    card.setAttribute('data-keywords', res.keywords);
    card.setAttribute('data-category', res.category);
    card.setAttribute('data-id', res.id);
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-icon">${res.icon}</div>
      <h3>${escapeHtml(res.title)}</h3>
      <p>${escapeHtml(res.desc)}</p>
      <span class="card-tag">${escapeHtml(res.tag)}</span>
    `;
    // Klik kartu: isi chatbot dengan pertanyaan terkait
    card.addEventListener('click', () => askAboutResource(res.title));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') askAboutResource(res.title);
    });
    grid.appendChild(card);
  });

  // Terapkan filter yang sedang aktif setelah render
  applyResourceFilters();
}

/**
 * Set kategori aktif dan perbarui tombol filter tab.
 * @param {string} cat - 'all' | 'sop' | 'tools' | 'hr'
 */
function setCategoryFilter(cat) {
  activeCategoryFilter = cat;

  // Update aria-selected & class aktif pada semua tombol filter
  document.querySelectorAll('#categoryFilters .cat-filter-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-cat') === cat;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  applyResourceFilters();
}

/**
 * Terapkan kombinasi filter: search text + kategori aktif.
 * Dipanggil oleh filterResources() (search) maupun setCategoryFilter() (tab).
 */
function applyResourceFilters() {
  const query = document.getElementById('resourceSearch').value.trim().toLowerCase();
  const cards = document.querySelectorAll('#resourceGrid .resource-card');
  let visible = 0;

  cards.forEach(card => {
    const title    = card.querySelector('h3').textContent.toLowerCase();
    const desc     = card.querySelector('p').textContent.toLowerCase();
    const keywords = card.getAttribute('data-keywords') || '';
    const category = card.getAttribute('data-category') || '';

    const matchSearch   = !query || title.includes(query) || desc.includes(query) || keywords.includes(query);
    const matchCategory = activeCategoryFilter === 'all' || category === activeCategoryFilter;
    const match         = matchSearch && matchCategory;

    card.classList.toggle('hidden-card', !match);
    if (match) visible++;
  });

  document.getElementById('noResultMsg').classList.toggle('hidden', visible > 0);
}

/**
 * Filter kartu berdasarkan kata kunci dari search bar.
 * Sekarang mendelegasikan ke applyResourceFilters() agar tetap sinkron dengan tab.
 */
function filterResources() {
  applyResourceFilters();
}

/**
 * Ketika kartu diklik, pertanyaan terkait dikirim ke chatbot
 */
function askAboutResource(title) {
  const input = document.getElementById('chatInput');
  input.value = `Ceritakan tentang "${title}"`;
  // Scroll ke chatbot dan fokus
  document.getElementById('chatbot-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  sendMessage();
}


// ══════════════════════════════════════════════════════════════
// 6. MODULE: AI BUDDY CHATBOT
// ══════════════════════════════════════════════════════════════

/**
 * Tambah pesan ke area chat.
 * @param {string} text   - Teks pesan
 * @param {'user'|'bot'} role - Pengirim
 */
function appendMessage(text, role) {
  const container = document.getElementById('chatMessages');
  const wrapper   = document.createElement('div');
  const time      = getTime();

  if (role === 'user') {
    wrapper.className = 'chat-bubble-user';
    wrapper.innerHTML = `
      <div>
        <div class="bubble">${escapeHtml(text)}</div>
        <p class="chat-time">${time}</p>
      </div>`;
  } else {
    wrapper.className = 'chat-bubble-bot';
    wrapper.innerHTML = `
      <div class="avatar">🤖</div>
      <div>
        <div class="bubble">${parseMarkdown(text)}</div>
        <p class="chat-time">${time}</p>
      </div>`;
  }

  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

/** Tampilkan animasi "sedang mengetik" */
function showTypingIndicator() {
  const container = document.getElementById('chatMessages');
  const el = document.createElement('div');
  el.className = 'chat-bubble-bot typing-indicator';
  el.id = 'typingIndicator';
  el.innerHTML = `
    <div class="avatar">🤖</div>
    <div class="bubble">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>`;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

/** Hapus animasi "sedang mengetik" */
function removeTypingIndicator() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

/**
 * Cari jawaban dari knowledge base berdasarkan kata kunci.
 * @param {string} query - Pertanyaan pengguna (lowercase)
 * @returns {string} Jawaban atau defaultReply
 */
function getBotAnswer(query) {
  const lower = query.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return defaultReply;
}

/**
 * Handle pengiriman pesan dari user.
 * Mensimulasikan delay respons bot (0.8–1.4 detik) agar terasa natural.
 */
function sendMessage() {
  const input   = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;

  // Tampilkan pesan user
  appendMessage(message, 'user');
  input.value = '';

  // Sembunyikan quick suggestions setelah interaksi pertama
  document.getElementById('quickSuggestions').style.display = 'none';

  // Simulasi bot mengetik
  showTypingIndicator();
  const delay = 800 + Math.random() * 600; // 0.8–1.4 detik
  setTimeout(() => {
    removeTypingIndicator();
    const answer = getBotAnswer(message);
    appendMessage(answer, 'bot');
  }, delay);
}

/** Handle tombol Enter di input chat */
function handleChatKey(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

/** Render quick suggestion pills */
function renderSuggestions() {
  const container = document.getElementById('quickSuggestions');
  container.innerHTML = '';
  quickSuggestions.forEach(text => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-pill';
    btn.textContent = text;
    btn.setAttribute('aria-label', `Tanya: ${text}`);
    btn.addEventListener('click', () => {
      document.getElementById('chatInput').value = text;
      sendMessage();
    });
    container.appendChild(btn);
  });
}

/** Tampilkan pesan pembuka bot */
function initChatbot() {
  const greetings = [
    'Halo! 👋 Saya AI Buddy — asisten onboarding kamu.',
    'Tanya apapun seputar SOP, tools, cuti, HR, atau info perusahaan!',
    'Gunakan tombol saran di bawah atau ketik pertanyaanmu langsung. 💬',
  ];
  // Munculkan 3 pesan pembuka berurutan dengan jeda kecil
  greetings.forEach((msg, i) => {
    setTimeout(() => appendMessage(msg, 'bot'), i * 400);
  });
  renderSuggestions();
}


// ══════════════════════════════════════════════════════════════
// 7. INIT — Jalankan semua modul saat DOM siap
// ══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Render checklist & progress
  renderChecklist();

  // Render resource cards
  renderResources();

  // Inisialisasi chatbot
  initChatbot();

  // Tambah task via Enter pada input checklist
  document.getElementById('newTaskInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });

  // Personalisasi nama di hero (opsional: bisa diubah dari URL param ?name=)
  const params = new URLSearchParams(window.location.search);
  const name   = params.get('name');
  if (name) {
    document.getElementById('welcomeTitle').textContent = `Halo, ${name}! 🎉`;
  }
});


// ══════════════════════════════════════════════════════════════
// 8. MODULE: QUIZ / BADGE STATS
// ══════════════════════════════════════════════════════════════

/**
 * Bank soal kuis.
 * Setiap modul memiliki 3 pertanyaan dengan 4 pilihan (indeks jawaban benar: correctIndex).
 */
const quizBank = {
  sop: {
    title: 'Modul SOP',
    color: 'from-primary to-blue-600',
    questions: [
      {
        q: 'Berapa hari kerja standar karyawan dalam satu minggu?',
        options: ['3 hari', '4 hari', '5 hari', '6 hari'],
        correctIndex: 2,
      },
      {
        q: 'Melalui sistem apa absensi harian karyawan dilakukan?',
        options: ['Email HR', 'Aplikasi HRIS', 'Buku tamu fisik', 'Slack pesan langsung'],
        correctIndex: 1,
      },
      {
        q: 'Berapa hari minimal pengajuan cuti sebelum tanggal berlaku?',
        options: ['Hari yang sama', '1 hari sebelum', '3 hari sebelum', '1 minggu sebelum'],
        correctIndex: 2,
      },
    ],
  },
  tools: {
    title: 'Akses Tools',
    color: 'from-teal to-teal-light',
    questions: [
      {
        q: 'Platform project management yang digunakan perusahaan adalah?',
        options: ['Asana', 'Monday.com', 'Jira', 'Basecamp'],
        correctIndex: 2,
      },
      {
        q: 'Untuk WFH, tools keamanan jaringan apa yang wajib digunakan?',
        options: ['Firewall lokal', 'VPN Cisco AnyConnect', 'Proxy browser', 'Mode Incognito'],
        correctIndex: 1,
      },
      {
        q: 'Email perusahaan menggunakan layanan dari?',
        options: ['Microsoft 365', 'Zoho Mail', 'Google Workspace', 'Proton Mail'],
        correctIndex: 2,
      },
    ],
  },
  team: {
    title: 'Pengenalan Tim',
    color: 'from-indigo-600 to-purple-600',
    questions: [
      {
        q: 'Siapa yang bertugas membantumu selama 3 bulan pertama?',
        options: ['CEO', 'Onboarding Buddy', 'IT Helpdesk', 'Office Manager'],
        correctIndex: 1,
      },
      {
        q: 'Di channel Slack mana kamu harus bergabung pertama kali?',
        options: ['#random', '#general dan #onboarding', '#it-support', '#finance'],
        correctIndex: 1,
      },
      {
        q: 'Dokumen misi, visi, dan nilai perusahaan dapat ditemukan di?',
        options: ['Grup WhatsApp', 'Papan pengumuman lobby', 'Confluence (portal internal)', 'Email dari CEO'],
        correctIndex: 2,
      },
    ],
  },
};

/** State kuis yang sedang berjalan */
let quizState = {
  moduleKey:    null,   // 'sop' | 'tools' | 'team'
  currentIndex: 0,      // index pertanyaan aktif
  score:        0,      // jumlah jawaban benar
  answered:     false,  // apakah pertanyaan ini sudah dijawab
};

/** Simpan skor per modul (persist selama sesi) */
const quizScores = { sop: 0, tools: 0, team: 0 };
const quizDone   = { sop: false, tools: false, team: false };

// ──────────────────────────────────────────────────────────────

/** Buka modal kuis untuk modul tertentu */
function openQuiz(moduleKey) {
  const module = quizBank[moduleKey];
  if (!module) return;

  quizState = { moduleKey, currentIndex: 0, score: 0, answered: false };

  // Set header warna gradient sesuai modul
  document.querySelector('.quiz-modal-header').className =
    `quiz-modal-header bg-gradient-to-r ${module.color}`;
  document.getElementById('quizModalTitle').textContent = `🎯 Kuis: ${module.title}`;

  renderQuizQuestion();

  // Tampilkan modal
  const modal = document.getElementById('quizModal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/** Tutup modal kuis */
function closeQuiz() {
  document.getElementById('quizModal').classList.add('hidden');
  document.body.style.overflow = '';
}

/** Render pertanyaan aktif ke dalam modal */
function renderQuizQuestion() {
  const { moduleKey, currentIndex, score } = quizState;
  const module    = quizBank[moduleKey];
  const question  = module.questions[currentIndex];
  const total     = module.questions.length;

  document.getElementById('quizQuestionCounter').textContent =
    `Pertanyaan ${currentIndex + 1} dari ${total}`;
  document.getElementById('quizQuestion').textContent = question.q;
  document.getElementById('quizProgressText').textContent =
    `${score} benar sejauh ini`;

  // Reset feedback dan tombol lanjut
  const feedback = document.getElementById('quizFeedback');
  feedback.className = 'quiz-feedback hidden';
  feedback.textContent = '';
  document.getElementById('quizNextBtn').classList.add('hidden');

  // Render pilihan jawaban
  const optContainer = document.getElementById('quizOptions');
  optContainer.innerHTML = '';
  question.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.textContent = opt;
    btn.setAttribute('aria-label', `Pilihan ${i + 1}: ${opt}`);
    btn.addEventListener('click', () => selectAnswer(i));
    optContainer.appendChild(btn);
  });

  quizState.answered = false;
}

/**
 * Proses pilihan jawaban pengguna.
 * @param {number} selectedIndex - Indeks opsi yang dipilih
 */
function selectAnswer(selectedIndex) {
  if (quizState.answered) return; // Abaikan jika sudah menjawab
  quizState.answered = true;

  const { moduleKey, currentIndex } = quizState;
  const question    = quizBank[moduleKey].questions[currentIndex];
  const isCorrect   = selectedIndex === question.correctIndex;
  const optBtns     = document.querySelectorAll('#quizOptions .quiz-option-btn');
  const feedback    = document.getElementById('quizFeedback');

  if (isCorrect) quizState.score++;

  // Highlight semua opsi: benar = hijau, salah = merah, jawaban benar = hijau
  optBtns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === question.correctIndex) {
      btn.classList.add('quiz-opt-correct');
    } else if (i === selectedIndex && !isCorrect) {
      btn.classList.add('quiz-opt-wrong');
    }
  });

  // Tampilkan feedback
  feedback.className = `quiz-feedback ${isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-wrong'}`;
  feedback.textContent = isCorrect
    ? '✅ Benar! Jawaban tepat.'
    : `❌ Kurang tepat. Jawaban benar: "${question.options[question.correctIndex]}"`;

  // Update counter
  document.getElementById('quizProgressText').textContent =
    `${quizState.score} benar sejauh ini`;

  // Tentukan tombol aksi selanjutnya
  const nextBtn = document.getElementById('quizNextBtn');
  const isLast  = currentIndex === quizBank[moduleKey].questions.length - 1;
  nextBtn.textContent = isLast ? 'Lihat Hasil 🏆' : 'Lanjut →';
  nextBtn.classList.remove('hidden');
}

/** Pindah ke pertanyaan berikutnya atau tampilkan hasil akhir */
function nextQuestion() {
  const { moduleKey, currentIndex } = quizState;
  const total = quizBank[moduleKey].questions.length;

  if (currentIndex < total - 1) {
    quizState.currentIndex++;
    renderQuizQuestion();
  } else {
    showQuizResult();
  }
}

/** Tampilkan layar hasil akhir kuis di dalam modal */
function showQuizResult() {
  const { moduleKey, score } = quizState;
  const total  = quizBank[moduleKey].questions.length;
  const pct    = Math.round((score / total) * 100);
  const passed = pct >= 67; // Lulus jika ≥ 2/3 benar

  // Simpan skor
  quizScores[moduleKey] = score;
  quizDone[moduleKey]   = true;

  // Update badge stats di dashboard
  updateQuizBadge(moduleKey, score, total, passed);

  // Render halaman hasil dalam modal
  document.getElementById('quizOptions').innerHTML  = '';
  document.getElementById('quizFeedback').className = 'quiz-feedback hidden';
  document.getElementById('quizNextBtn').classList.add('hidden');
  document.getElementById('quizQuestionCounter').textContent = 'Hasil Kuis';

  document.getElementById('quizQuestion').innerHTML = `
    <div class="text-center py-2">
      <div class="text-5xl mb-3">${passed ? '🏆' : '📘'}</div>
      <p class="text-xl font-extrabold ${passed ? 'text-teal' : 'text-primary'} mb-1">
        ${score} / ${total} Benar
      </p>
      <p class="text-gray-500 text-sm mb-3">${pct}% — ${passed ? 'Lulus! Kamu siap.' : 'Pelajari lagi materinya.'}</p>
      <button onclick="closeQuiz()" class="btn-primary px-6 py-2 rounded-lg text-sm font-semibold">
        Tutup
      </button>
    </div>
  `;
  document.getElementById('quizProgressText').textContent = `Skor akhir: ${score}/${total}`;
}

/**
 * Update tampilan badge stats di dashboard setelah kuis selesai.
 * @param {string} key    - Module key: 'sop' | 'tools' | 'team'
 * @param {number} score  - Jumlah benar
 * @param {number} total  - Total soal
 * @param {boolean} passed - Apakah lulus
 */
function updateQuizBadge(key, score, total, passed) {
  const pct     = Math.round((score / total) * 100);
  const fillEl  = document.getElementById(`quizFill-${key}`);
  const scoreEl = document.getElementById(`quizScore-${key}`);
  const statEl  = document.getElementById(`quizStatus-${key}`);
  const cardEl  = document.getElementById(`quizCard-${key}`);

  if (fillEl)  fillEl.style.width = pct + '%';
  if (scoreEl) scoreEl.textContent = `${score} / ${total} benar`;

  if (statEl) {
    statEl.textContent = passed ? 'Lulus ✅' : 'Perlu Ulang 🔄';
    statEl.className   = `quiz-badge-status ${passed ? 'status-passed' : 'status-retry'}`;
  }

  if (cardEl) {
    cardEl.classList.toggle('quiz-card-passed', passed);
  }
}

/** Tutup modal jika klik di luar konten */
document.addEventListener('click', e => {
  const modal = document.getElementById('quizModal');
  if (modal && !modal.classList.contains('hidden') && e.target === modal) {
    closeQuiz();
  }
});

/** Tutup modal dengan tombol Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('quizModal');
    if (modal && !modal.classList.contains('hidden')) closeQuiz();
  }
});
