let lastUrl = "";

const checkUrl = () => {
  let currentUrl = window.location.href;

  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    let searchParams = new URLSearchParams(window.location.search);
    let query = searchParams.get("q");
    
    if (query && (query === "nekopoi" || query.includes("judi")) || currentUrl.includes("nekopoi") || currentUrl.includes("judi")) {
      let confirmRedirect = confirm("Yakin mau membuka ini?");
      if (confirmRedirect) {
        window.location.href = "https://www.youtube.com/watch?v=rQ9YQJ3JpWw";
        chrome.runtime.sendMessage({ type: "logSearch", query, url: currentUrl });
      } else {
        window.location.href = "https://www.google.com";
      }
    }
  }
};

// Observer untuk mendeteksi perubahan DOM
const observer = new MutationObserver(checkUrl);
observer.observe(document, { childList: true, subtree: true });

// Cek URL secara berkala
setInterval(checkUrl, 1000);