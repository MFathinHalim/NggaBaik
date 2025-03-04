// popup.js
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get({ searches: [] }, (data) => {
      let logList = document.getElementById("logList");
      data.searches.forEach((entry) => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${entry.time}</strong>: <br />${entry.query}`;
        logList.appendChild(li);
      });
    });
  });