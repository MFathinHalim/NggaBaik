// Deteksi perubahan URL setelah pencarian dikirim
let lastQuery = "";

const observer = new MutationObserver(() => {
  let searchParams = new URLSearchParams(window.location.search);
  let query = searchParams.get("q");

  if (query && query !== lastQuery) {
    lastQuery = query; // Simpan agar tidak dikirim berulang
    if(query === "nekopoi" || query.includes("judi")) {
        window.location.href = "https://www.youtube.com/watch?v=rQ9YQJ3JpWw";
    }

    // Kirim ke background.js
    chrome.runtime.sendMessage({ type: "logSearch", query });
  }
});

// Mulai observer untuk memantau perubahan di <title> atau <body>
observer.observe(document, { childList: true, subtree: true });
