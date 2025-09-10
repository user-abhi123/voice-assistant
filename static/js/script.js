const output = document.getElementById("output");
const micButton = document.getElementById("mic-button");

function startListening() {
    micButton.classList.add("listening");
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN';
    recognition.start();

    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript;
        output.innerText = "🗣️ You said: " + command;
        fetch('/process', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({command})
        })
        .then(res => res.json())
        .then(data => {
            output.innerText += "\n🤖 Assistant: " + data.response;
            speak(data.response);
            micButton.classList.remove("listening");
        });
    };

    recognition.onerror = function() {
        output.innerText = "⚠️ Voice recognition failed. Try again.";
        micButton.classList.remove("listening");
    };
}

function speak(text) {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
}