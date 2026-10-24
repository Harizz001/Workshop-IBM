# 🚀 Onboarding Buddy System - Interactive AI & Knowledge Assistant for New Hires

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Built With](https://img.shields.io/badge/Built%20With-HTML%20%7C%20TailwindCSS%20%7C%20Vanilla%20JS-blue)
![AI-Powered](https://img.shields.io/badge/AI%20Assistant-IBM%20Bob-informational)

---

## 📌 Project Overview
**Onboarding Buddy System** adalah web platform interaktif yang dirancang untuk mempermudah dan mempercepat proses adaptasi karyawan baru (*new hires*) di perusahaan. Melalui pendampingan berbasis AI dan antarmuka *dashboard* yang intuitif, platform ini memungkinkan karyawan baru untuk mengakses informasi SOP, tugas harian, dan panduan kerja secara mandiri tanpa harus mengganggu efisiensi waktu tim HR maupun *buddy* pendamping.

Proyek ini dibangun sebagai bagian dari **Capstone Project IBM Workshop**, memanfaatkan **IBM Bob AI Agent** di VS Code melalui metode **3-Layer Prompt Architecture**.

---

## ✨ Key Features

1. **🎯 Welcome Hero & Progress Tracker**
   * Banner ucapan selamat datang yang interaktif.
   * *Progress bar* visual untuk memantau sejauh mana proses *onboarding* telah diselesaikan.

2. **🤖 AI Buddy Q&A Chatbot Widget**
   * Chatbot interaktif untuk menjawab pertanyaan umum seputar kebijakan perusahaan, jam kerja, fasilitas, dan prosedur cuti secara *real-time*.

3. **✅ Onboarding Checklist (Dynamic Tasks)**
   * Daftar tugas awal karyawan baru (seperti *Setup Email*, *Akses Slack*, *Meet & Greet*).
   * Fitur centang tugas selesai (*toggle complete*) dan penambahan tugas baru secara dinamis.

4. **📚 Resource & SOP Cards with Dynamic Filtering**
   * Kartu informasi cepat berisi SOP Kerja, Akses Tools, Kontak HR, dan Kebijakan Cuti.
   * Dilengkapi fitur **Live Search Bar** dan **Filter Kategori** (All, SOP, Tools, HR & Benefits) yang bekerja secara sinkron tanpa *refresh* halaman.

5. **📊 Interactive Status Badges**
   * Indikator visual kelengkapan modul (*Modul SOP*, *Akses Tools*, *Pengenalan Tim*).

---

## 🛠️ Tech Stack

* **Frontend:** HTML5 (Semantik), Tailwind CSS (via CDN), Vanilla JavaScript (ES6+)
* **Development Tools:** VS Code, Live Server
* **AI Coding Assistant:** IBM Bob (Agent Mode)

---

## 🧠 Prompt Architecture (IBM Bob)

Proyek ini dikembangkan menggunakan **3-Layer Prompt Architecture**:
* **Layer 1 (Role & Context):** Mengarahkan IBM Bob sebagai *Senior Frontend Engineer* yang membangun platform *Onboarding Buddy System*.
* **Layer 2 (Task & Requirements):** Menguraikan fitur-fitur spesifik seperti Chatbot, Onboarding Checklist, dan Resource Cards.
* **Layer 3 (Constraints & Output):** Menentukan aturan teknis (HTML/Tailwind/JS, responsif, skema warna *blue/teal*, modular 3 file terpisah).
* **Targeted Refinement (Iterasi):** Menambahkan filter kategori terintegrasi dan *widget status badges*.

---

## 📁 Project Structure

```text
├── index.html       # Struktur HTML utama dan tata letak UI
├── style.css        # Styling kustom tambahan & penyesuaian Tailwind
├── script.js        # Logika interaktif (Chatbot, Checklist CRUD, Search & Filtering)
└── README.md        # Dokumentasi proyek
```

---

## 🚀 Getting Started

1. **Clone Repositori ini:**
   ```bash
   git clone https://github.com/username-kamu/onboarding-buddy-system.git
   ```
2. **Buka folder proyek:**
   ```bash
   cd onboarding-buddy-system
   ```
3. **Jalankan Aplikasi:**
   * Klik kanan pada `index.html` dan pilih **Open with Live Server** di VS Code.
   * Atau cukup buka file `index.html` langsung dengan mengkliknya dua kali di file manager.

---

## 📸 Screenshots

*(Tambahkan screenshot tampilan web aplikasi dan interaksi IBM Bob kamu di sini)*

---

## 👤 Author & Acknowledgments
* **Developer:** [Nama Kamu]
* **Event:** IBM Workshop & Capstone Project
* **Special Thanks:** IBM Bob AI Assistant