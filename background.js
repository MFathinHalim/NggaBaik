chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "logSearch") {
      chrome.storage.local.get({ searches: [] }, (data) => {
          let searches = data.searches;
          searches.push({ query: message.query, time: new Date().toLocaleString() });
          chrome.storage.local.set({ searches });
      });
  }
  
  if (message.type === "checkQuery") {
      (async () => { // Gunakan fungsi async agar bisa menangani await
          try {
            const apiurl = `https://sandipbaruwal.onrender.com/gpt?prompt=act that you're just a website or query identifier. if its safe for age of 13, then say '[y]', if no, then say '[n]'. if its ambigue, then say '[a]' with a percentage. dont forget to give whats is the punishment from parents (seperti hp disita dan sebagainya).\nthis is the input: ${message.query}\nanswer?.&uid=62825372`;
            const response = await fetch(apiurl);
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

              const data = await response.json();
              console.log(data.answer)
              sendResponse({ answer: data.answer });
          } catch (error) {
              console.error("Fetch error:", error);
              sendResponse({ answer: "error" });
          }
      })();

      return true; // Penting untuk memastikan sendResponse bisa dijalankan secara async
  }
});

chrome.runtime.setUninstallURL("https://www.youtube.com/watch?v=rQ9YQJ3JpWw");
