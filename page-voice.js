function speakInjected(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";

  const voices = window.speechSynthesis.getVoices();

  function speak() {
    utterance.voice = voices.find((v) => v.lang.startsWith("id")) || voices[0];
    window.speechSynthesis.speak(utterance);
  }

  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      const newVoices = window.speechSynthesis.getVoices();
      utterance.voice =
        newVoices.find((v) => v.lang.startsWith("id")) || newVoices[0];
      window.speechSynthesis.speak(utterance);
    };
  } else {
    speak();
  }
}

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data && event.data.type === "SPEAK_TEXT") {
    speakInjected(event.data.text);
  }
});
