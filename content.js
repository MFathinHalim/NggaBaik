let lastUrl = "";

async function checkQuery(query) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "checkQuery", query }, (response) => {
      if (response && response.answer) {
        resolve(response.answer.toLowerCase().trim());
      } else {
        resolve(null);
      }
    });
  });
}

const checkUrl = async () => {
  let currentUrl = window.location.href;

  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    let searchParams = new URLSearchParams(window.location.search);
    let query = searchParams.get("q") || currentUrl;

    const queryResponse = await checkQuery(query); // Hanya panggil API sekali

    if (!queryResponse) return; // Jika tidak ada respons, hentikan proses

    if (queryResponse.startsWith("[n]")) {
      alert("Future: " + queryResponse.replace("[n] ", ""));
      let userInput = prompt("Ketik 'lanjut' jika tetap ingin membuka:");

      if (userInput && userInput.toLowerCase() === "lanjut") {
        window.location.href = "https://www.youtube.com/watch?v=rQ9YQJ3JpWw";
      } else {
        window.location.href = "https://www.google.com";
      }
    } else if (queryResponse.startsWith("[a]")) {
      console.log("hello");
    }
  }
};

// Observer untuk mendeteksi perubahan URL
const observer = new MutationObserver(checkUrl);
observer.observe(document, { childList: true, subtree: true });

// Panggil saat pertama kali halaman dimuat
checkUrl();
