// popup.js
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get({ searches: [] }, (data) => {
      let logList = document.getElementById("logList");
      data.searches.forEach((entry) => {
        let li = document.createElement("li");
        li.textContent = `${entry.time}: ${entry.query}`;
        logList.appendChild(li);
      });
    });
  });