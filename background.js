// background.js

// NOTE: EmailJS tidak bisa langsung dipakai di background.js karena tidak bisa inject <script> tag
// Jadi kita kirim pesan ke popup.js (yang bisa load script dan punya DOM access)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "logSearch") {
    chrome.storage.local.get({ searches: [] }, (data) => {
      let searches = data.searches;
      searches.push({
        query: message.query,
        time: new Date().toLocaleString(),
      });
      console.log("Search logged:", searches);
      chrome.storage.local.set({ searches });
    });
  }

  if (message.type === "sendAlertEmail") {
    // Forward ke popup untuk ngirim email
    chrome.runtime.sendMessage({
      type: "openPopupToSendEmail",
      data: {
        to_email: message.to_email,
        query: message.query,
        waktu: message.waktu,
      },
    });
  }

  if (message.type === "checkQuery") {
    (async () => {
      const openRouterKey =
        "Bearer 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";
      const prompt = `Bersikaplah seolah-olah kamu pengenal situs atau kueri. Jika aman untuk usia 13 tahun ke atas atau hanya sekedar nama orang, maka katakan '[y]',Jika berisiko hanya sebatas dengan orang asing atau apalah yang penting lebih besar resiko amannya ataupun hanya perbedaan konteks, maka katakan '[a], Jika tidak aman seperti judi ataupun konten yang sudah pasti butuh diatas 18 tahun, maka katakan '[n]'. Jangan lupa berikan apa hukuman dari orang tua (seperti hp disita dan lain-lain) dan alasannya dalam bahasa Indonesia dan secara super singkat.\nthis is the input: ${message.query}\nanswer?.`;

      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: openRouterKey,
            },
            body: JSON.stringify({
              model: "meta-llama/llama-3-8b-instruct",
              messages: [
                {
                  role: "system",
                  content: "Kamu adalah AI pengklasifikasi kueri anak-anak",
                },
                { role: "user", content: prompt },
              ],
            }),
          }
        );

        const data = await response.json();
        const answer =
          data.choices?.[0]?.message?.content || "Tidak ada jawaban";
        console.log("OpenRouter GPT response:", data);
        sendResponse({ answer });
      } catch (err) {
        console.error("OpenRouter GPT error:", err);
        sendResponse({ answer: "error" });
      }
    })();

    return true;
  }

  if (message.type === "checkInput") {
    (async () => {
      const openRouterKey =
        "Bearer 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";

      try {
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: openRouterKey,
            },
            body: JSON.stringify({
              model: "meta-llama/llama-3-8b-instruct",
              messages: [
                {
                  role: "system",
                  content:
                    "Kamu adalah AI sensor input teks dari anak-anak. Jawab '[n]' jika tidak pantas, '[y]' jika aman.",
                },
                {
                  role: "user",
                  content: message.prompt,
                },
              ],
            }),
          }
        );

        const data = await response.json();
        const answer =
          data.choices?.[0]?.message?.content || "Tidak ada jawaban";
        console.log("OpenRouter input check response:", data);
        sendResponse({ answer });
      } catch (err) {
        console.error("OpenRouter error (checkInput):", err);
        sendResponse({ answer: "error" });
      }
    })();

    return true;
  }
});

chrome.runtime.setUninstallURL("https://www.youtube.com/watch?v=rQ9YQJ3JpWw");

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("settings.html"),
  });
});
