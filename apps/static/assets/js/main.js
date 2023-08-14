document.addEventListener("DOMContentLoaded", function () {
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const loader = document.getElementById("loader");
    const chatContainer = document.querySelector(".chat-container");
    const clearChatButton = document.getElementById("clear-chat");

    function formatResponse(responseText) {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const formattedText = responseText.replace(codeBlockRegex, (match, language, code) => {
          const languageClass = language ? 'language-' + language : '';
          return '<pre><code class="' + languageClass + '">' + code.trim() + '</code></pre>';
        });
        return formattedText;
      }
    function addMessage(message, className) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", className);

        const messageText = document.createElement("span");
        messageText.textContent = message;
        messageText.innerHTML = formatResponse(message); // Calls formatResponse with the 'message' parameter
        messageElement.appendChild(messageText);
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function addMessagewithDelay(message, className) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", className);

        const messageText = document.createElement("span");
        messageElement.appendChild(messageText);
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        const words = message.split(" ");
        let currentIndex = 0;

        function displayWordsSequentially() {
            if (currentIndex < words.length) {
                messageText.textContent += words[currentIndex] + " ";
                currentIndex++;
                setTimeout(displayWordsSequentially, 60);
            }
        }

        displayWordsSequentially();
    }

    chatForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, "user-message");
        chatInput.value = "";

        loader.style.display = "block";

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `user_input=${encodeURIComponent(userMessage)}`,
        });

        loader.style.display = "none";

        const data = await response.json();
        addMessagewithDelay(data.response, "bot-message");
    });

    clearChatButton.addEventListener("click", function () {
        chatContainer.innerHTML = "";
    });

    
});


