chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "logSearch") {
    chrome.storage.local.get({ searches: [] }, (data) => {
      let searches = data.searches;
      searches.push({
        query: message.query,
        time: new Date().toLocaleString(),
      });
      chrome.storage.local.set({ searches });
    });
  }

  if (message.type === "checkQuery") {
    (async () => {
      // Gunakan fungsi async agar bisa menangani await
      try {
        console.log(message.queryz);
        const rawPrompt = `Bersikaplah seolah-olah kamu pengenal situs atau kueri. Jika aman untuk usia 13 tahun ke atas atau hanya sekedar nama orang, maka katakan '[y]',Jika berisiko hanya sebatas dengan orang asing atau apalah yang penting lebih besar resiko amannya ataupun hanya perbedaan konteks, maka katakan '[a], Jika tidak aman seperti judi ataupun konten yang sudah pasti butuh diatas 18 tahun, maka katakan '[n]'. Jangan lupa berikan apa hukuman dari orang tua (seperti hp disita dan lain-lain) dan alasannya dalam bahasa Indonesia dan secara super singkat.\nthis is the input: ${message.query}\nanswer?.`;
        const apiurl = `https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(
          rawPrompt
        )}`;
        const response = await fetch(apiurl);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log(data.answer);
        sendResponse({ answer: data.answer });
      } catch (error) {
        console.error("Fetch error:", error);
        sendResponse({ answer: "error" });
      }
    })();

    return true; // Penting untuk memastikan sendResponse bisa dijalankan secara async
  }

  if (message.type === "checkInput") {
    console.log(message.prompt);
    const url = `https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(
      message.prompt
    )}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        sendResponse(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        sendResponse(null);
      });

    // Return true supaya sendResponse bisa async
    return true;
  }
});

chrome.runtime.setUninstallURL("https://www.youtube.com/watch?v=rQ9YQJ3JpWw");
