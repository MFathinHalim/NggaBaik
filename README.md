# 🚫 NggaBaik - Chrome Extension

> 💻 Proyek ekstensi Chrome untuk memantau dan melindungi anak-anak saat berselancar di internet. Powered by AI & Email Notif!

## 📌 Fitur Utama

- 🧠 **AI Filtering** – Mendeteksi kueri & konten yang tidak layak menggunakan OpenRouter LLM.
- 🛑 **Peringatan Interaktif** – Tampilkan popup dengan suara peringatan dan animasi anime lucu (biar anak takut tapi chill 😅).
- 📧 **Email Alert** – Kirim email otomatis ke orang tua jika anak mengakses konten terlarang.
- 📜 **Riwayat Aktivitas** – Simpan semua kueri/aktivitas dalam storage dan bisa dilihat dari popup.
- 🔇 **Tersembunyi** – Ekstensi berjalan di background tanpa terlihat mencolok.

## 📦 Instalasi Manual

1. Clone repo ini atau download ZIP
2. Buka chrome://extensions/
3. Aktifkan developer mode
4. Klik load unpacked
5. Pilih folder hasil clone tadi

## 🛠️ Konfigurasi
Setelah di install, akan otomatis membuka page extension dan masukkan Email Orang Tua. Riwayat dan Email akan tersimpan di chrome.storage.local

## 🧠 Teknologi yang Dipakai
- ✅ Manifest v3

- 🧠 OpenRouter.ai API (LLM)

- 💌 EmailJS (untuk kirim email alert)

- 🎤 Text-to-Speech (untuk peringatan suara)

- 🎨 SweetAlert2 untuk tampilan peringatan interaktif

## 📁 Struktur Folder
```arduino
📦 nggabaik-extension/
├── background.js
├── content.js
├── popup.html
├── popup.js
├── settings.html
├── email-setup.js
├── page-voice.js
├── manifest.json
├── sweetalert2.min.js //tak perlu dibuka
└── style.css
```

## 🧪 Contoh Kasus
Jika anak mengetikkan atau mengunjungi web berbahaya (seperti PHub atau Judi Online), maka
1. Sistem AI mendeteksi url sebagai [n] (berbahaya)
2. Muncul popup peringatan + suara
3. Jika memilih melanjutkan akan mengirim email ke orang tua (dan ada sedikit hukuman dari saya untuk anak 👀
4. Riwayat atau ketikan berbahaya anak akan tersimpan di chrome local (cara mengakses: pilih logo ekstensi (seperti puzzle) di atas kanan, pilih NggaBaik)

## 🛡️ Catatan Keamanan
- Tidak mengirim data ke pihak ketiga selain EmailJS & OpenRouter
- Tidak menyimpan data secara permanen selain di local storage
- Semua request sensitif dilakukan via background & content script

## 👶 Target
> Dibuat untuk membantu orang tua mengawasi aktivitas online anak-anak tanpa mengganggu kenyamanan mereka.

## 🙌 Kontribusi
Pull request terbuka! Kalau kamu punya ide atau saran (fitur filter Youtube, blokir situs, log remote, ai yang lebih baik, dll), atau bahkan ingin membuat untuk aplikasi mobile silahkann.

##📫 Kontak
Made with ❤️ by [M.Fathin Halim](https://mfathinhalim.github.io/)
📧 halimfathin7@gmail.com
📧 baikngga@gmail.com

> "Karena kadang anak gak tahu mana yang NggaBaik."
