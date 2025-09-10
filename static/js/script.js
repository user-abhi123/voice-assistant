document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("command-form");
  const input = document.getElementById("command-input");
  const chatBox = document.getElementById("chat-box");
  const micButton = document.getElementById("mic-button");

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const addChatBubble = (role, message) => {
    const bubble = document.createElement("div");
    bubble.className = role;
    bubble.innerText = message;
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  const handleResponse = (raw) => {
    const [text, trigger] = raw.split("|");
    addChatBubble("assistant", text);
    speak(text);

    if (trigger === "trigger_open_youtube") {
      window.open("https://www.youtube.com", "_blank");
    } else if (trigger === "trigger_open_google") {
      window.open("https://www.google.com", "_blank");
    } else if (trigger?.startsWith("trigger_search:")) {
      const query = trigger.split(":")[1];
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const command = input.value;
    addChatBubble("user", command);

    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `command=${encodeURIComponent(command)}`
    });
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const response = doc.getElementById("response")?.innerText;
    handleResponse(response);
    input.value = "";
  });

  micButton.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
      input.value = event.results[0][0].transcript;
      form.requestSubmit();
    };
    recognition.start();
  });
});