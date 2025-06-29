document.getElementById("saveBtn").addEventListener("click", () => {
  const email = document.getElementById("parentEmail").value.trim();
  if (!email || !email.includes("@")) {
    alert("Email tidak valid!");
    return;
  }

  chrome.storage.local.set({ parentEmail: email }, () => {
    alert("Email orang tua telah disimpan!");
  });
});

chrome.storage.local.get("parentEmail", (data) => {
  if (data.parentEmail) {
    document.getElementById("parentEmail").value = data.parentEmail;
  }
});
