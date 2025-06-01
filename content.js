let lastUrl = "";
let warninginput = false;

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

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

      Swal.fire({
        title: "Peringatan!",
        text: message,
        imageUrl:
          "https://media.tenor.com/5ExGc8sRRAYAAAAj/mythikore-anime-girl.gif",
        showCancelButton: true,
        confirmButtonText: "Lanjut",
        cancelButtonText: "Kembali ke Google",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "https://www.youtube.com/watch?v=rQ9YQJ3JpWw";
          chrome.runtime.sendMessage({
            type: "logSearch",
            query,
            url: currentUrl,
          });
        } else {
          window.location.href = "https://www.google.com";
        }
      });
    } else if (queryResponse.startsWith("[a]")) {
      Swal.fire({
        title: "Peringatan!",
        text: "web ini kebanyakan digunakan aman, tapi memiliki resiko sedikit",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Lanjut",
        cancelButtonText: "Kembali ke Google",
      }).then((result) => {
        if (result.isConfirmed) {
          chrome.runtime.sendMessage({
            type: "logSearch",
            query,
            url: currentUrl,
          });
        } else {
          window.location.href = "https://www.google.com";
        }
      });
    }
  }
};
checkUrl();

function monitorInputField(field) {
  if (field.dataset.watched === "true") return; // ⚠️ sudah dipantau

  field.dataset.watched = "true"; // tandai sudah dipantau

  const checkInput = debounce(() => {
    if (warninginput) return;

    let text = "";

    if (field.isContentEditable) {
      text = field.innerText?.trim();
    } else {
      text = field.value?.trim();
    }

    if (!text || text.length < 4) return;

    const prompt = `cobalah cek apa yang diketik user ini baik untuk ketikan anak anak atau tidak ${text}. kalau jelek cukup jawan [n] aja tanpa tambahan apa apa`;

    chrome.runtime.sendMessage({ type: "checkInput", prompt }, (response) => {
      if (!response) return;

      const answer = response.answer?.replaceAll("\n", "").trim();
      console.log("Response:", response);
      if (answer === "[n]") {
        warninginput = true;

        Swal.fire({
          title: "Peringatan!",
          text: "JANGAN KETIK APA-APA YANG TIDAK PANTAS ATAU BERBAHAYA!",
          imageUrl:
            "https://media.tenor.com/5ExGc8sRRAYAAAAj/mythikore-anime.gif",
          showCancelButton: true,
          confirmButtonText: "Lanjut",
          cancelButtonText: "Kembali ke Google",
        }).then((result) => {
          if (result.isConfirmed) {
            chrome.runtime.sendMessage({
              type: "logSearch",
              query: text,
              url: window.location.hostname,
            });
          } else {
            window.location.href = "https://www.google.com";
          }
        });
      }
    });
  }, 500);

  if (field.isContentEditable) {
    field.addEventListener("keyup", checkInput);
    field.addEventListener("paste", checkInput);
  } else {
    field.addEventListener("input", checkInput);
  }
}

function scanInputs() {
  const fields = document.querySelectorAll(
    "input[type='text'], textarea, [contenteditable='true']"
  );
  fields.forEach(monitorInputField);
}

// Jalankan awal
scanInputs();

// Monitor DOM baru
const observerInputs = new MutationObserver(scanInputs);
observerInputs.observe(document.body, { childList: true, subtree: true });

// Monitor perubahan URL
const observerUrl = new MutationObserver(checkUrl);
observerUrl.observe(document.body, { childList: true, subtree: true });
