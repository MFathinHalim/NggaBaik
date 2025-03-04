chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "logSearch") {
      chrome.storage.local.get({ searches: [] }, (data) => {
        let searches = data.searches;
        searches.push({ query: message.query, time: new Date().toLocaleString() });
        chrome.storage.local.set({ searches });
      });
    }
  });
chrome.runtime.setUninstallURL("https://www.youtube.com/watch?v=rQ9YQJ3JpWw");
