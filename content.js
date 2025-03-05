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
  let url = new URL(window.location.href);
  let currentUrl = url.hostname;

  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    let searchParams = new URLSearchParams(window.location.search);
    let query = searchParams.get("q") ? searchParams.get("q") : currentUrl;

    const queryResponse = await checkQuery(query);
    if (!queryResponse) return;

    if (queryResponse.startsWith("[n]")) {
      let message = queryResponse.replace("[n] ", "").replace("\n", "");

      // Gunakan SweetAlert2 langsung dari ekstensi
      Swal.fire({
        title: "Peringatan!",
        text: message,
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Lanjut",
        cancelButtonText: "Kembali ke Google",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "https://www.youtube.com/watch?v=rQ9YQJ3JpWw";
          chrome.runtime.sendMessage({ type: "logSearch", query, url: currentUrl });
        } else {
          window.location.href = "https://www.google.com";
        }
      });
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
