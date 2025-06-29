document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get({ searches: [] }, (data) => {
    console.log("Loaded search data from storage:", data);

    let logList = document.getElementById("logList");

    if (!data.searches || data.searches.length === 0) {
      logList.innerHTML = `<div class="text-center text-muted mt-4">
        <i class="bi bi-info-circle"></i> Belum ada log apa pun.
      </div>`;
      return;
    }

    // Biar urutan terbaru di atas
    data.searches.reverse().forEach((entry, index) => {
      const logCard = document.createElement("div");
      logCard.className = "mb-3 border shadow-sm";

      logCard.innerHTML = `
        <div class="card-body p-3">
          <h6 class="card-subtitle mb-2">
            <i class="bi bi-clock-history"></i> ${entry.time}
          </h6>
          <p class="card-text mb-0">
            <i class="bi bi-search"></i> <strong>${entry.query}</strong>
          </p>
        </div>
      `;

      logList.appendChild(logCard);
    });
  });
});
