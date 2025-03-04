let lastUrl = "";

const checkUrl = async () => {
  let currentUrl = window.location.href;

  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    let searchParams = new URLSearchParams(window.location.search);
    let query = searchParams.get("q");
    if(!query) {
      query = currentUrl
    }
    // Kirim permintaan ke background.js untuk fetch API
    chrome.runtime.sendMessage({ type: "checkQuery", query }, (response) => {
      if (response && response.answer.toLowerCase() === "n") {
        let confirmRedirect = confirm("Yakin mau membuka ini?");
        if (confirmRedirect) {
          window.location.href = "https://www.youtube.com/watch?v=rQ9YQJ3JpWw";
        } else {
          window.location.href = "https://www.google.com";
        }
      }
    });
  }
};

// Observer untuk mendeteksi perubahan URL
const observer = new MutationObserver(checkUrl);
observer.observe(document, { childList: true, subtree: true });

// Cek URL secara berkala
setInterval(checkUrl, 1000);
