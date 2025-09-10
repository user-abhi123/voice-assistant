document.addEventListener("DOMContentLoaded", () => {
  const responseText = document.getElementById("response")?.innerText;
  const form = document.getElementById("command-form");
  const input = document.getElementById("command-input");
  const chatBox = document.getElementById("chat-box");
  const micButton = document.getElementById("mic-button");

  // Voice output
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  // Handle response triggers
  const handleResponse = (text) => {
    if (text === "trigger_open_youtube") {
      window.open("https://www.youtube.com", "_blank");
      speak("Opening YouTube");
    } else if (text === "trigger_open_google") {
      window.open("https://www.google.com", "_blank");
      speak("Opening Google");
    } else if (text.startsWith("trigger_search:")) {
      const query = text.split(":")[1];
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
      speak(`Searching Google for ${query}`);
    } else {
      speak(text);
    }

    const bubble = document.createElement("div");
    bubble.className = "response";
    bubble.innerText = text;
    chatBox.appendChild(bubble);
  };

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const command = input.value;
    const userBubble = document.createElement("div");
    userBubble.className = "user";
    userBubble.innerText = command;
    chatBox.appendChild(userBubble);

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

  // Voice input
  micButton.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
      input.value = event.results[0][0].transcript;
      form.requestSubmit();
    };
    recognition.start();
  });
});