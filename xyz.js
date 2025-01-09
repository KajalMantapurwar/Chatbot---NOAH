// Responses dictionary with added functionalities
const responses = {
    "hello": "Hi there! How can I help you today?",
    "hi": "Hi there! How can I help you today?",
    "about you": "I am Noah, a chatbot. I aim to assist you as best as I can!",
    "how are you": "I'm just a bot, but I'm here to help you!",
    "bye": "Goodbye! Come back soon!",
    "what you can do": "I can tell you the time, solve riddles, share jokes, and more!",
    "joke": "Why don't skeletons fight each other? They don't have the guts!",
    "motivate me": "Believe in yourself! Every day is a new opportunity!",
    "assistant mode": "Assistant mode activated! You can calculate, solve riddles, and more!...to exit assistant mode type :- {exit assistant mode}",
    "exit assistant mode": "Exiting assistant mode. Back to casual chat!",
    "riddle": "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
    "correct riddle answer": "Correct! The answer is 'Echo'. Well done!",
    "incorrect riddle answer": "Oops, that's not correct. The answer is 'Echo'. Try another challenge!",
    "time": `The current time is ${new Date().toLocaleTimeString()}.`,
};

// Flags and variables for dynamic responses
let inAssistantMode = false;
let awaitingRiddleAnswer = false;

// Add messages to the chat
function addMessage(message, sender) {
    const messagesDiv = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    const icon = document.createElement("img");
    icon.src = sender === "user"
        ? "https://img.freepik.com/premium-vector/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-web-user-symbol-neumorphic-ui-ux-white-user-interface-web-button-neumorphism-vector-eps-10_399089-2757.jpg?w=1480"
        : "https://i.pinimg.com/736x/0c/67/5a/0c675a8e1061478d2b7b21b330093444.jpg";
    icon.alt = sender;
    icon.className = "message-icon";

    const textDiv = document.createElement("div");
    textDiv.className = "text";
    textDiv.textContent = message;

    if (sender === "bot") {
        messageDiv.appendChild(icon);
        messageDiv.appendChild(textDiv);
        speakMessage(message); // Speak bot responses
    } else {
        messageDiv.appendChild(textDiv);
        messageDiv.appendChild(icon);
    }

    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Handle sending messages
function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim().toLowerCase(); // Convert to lowercase for case-insensitive matching
    if (userInput) {
        addMessage(userInput, "user"); // Display user message
        const botResponse = handleResponse(userInput);
        setTimeout(() => addMessage(botResponse, "bot"), 500);
        document.getElementById("userInput").value = ""; // Clear input
    }
}

// Handle dynamic responses
function handleResponse(input) {
    if (awaitingRiddleAnswer) {
        awaitingRiddleAnswer = false;
        if (input === "echo") {
            return responses["correct riddle answer"];
        } else {
            return responses["incorrect riddle answer"];
        }
    }

    if (input === "assistant mode") {
        inAssistantMode = true;
        return responses["assistant mode"];
    }

    if (input === "exit assistant mode") {
        inAssistantMode = false;
        return responses["exit assistant mode"];
    }

    if (inAssistantMode) {
        if (input === "solve riddle") {
            awaitingRiddleAnswer = true;
            return responses["riddle"];
        }
        return "In assistant mode, you can solve riddles or calculate expressions. Try 'solve riddle'.";
    }

    if (input.startsWith("calculate")) {
        let expression = input.replace("calculate", "").trim();
        try {
            let result = eval(expression);
            return `The result of ${expression} is ${result}`;
        } catch (error) {
            return "Oops! I couldn't understand that expression. Try again!";
        }
    }

    if (responses[input]) {
        return responses[input];
    } else {
        return "Sorry, I don't understand that command. Try typing 'joke', 'quiz', or 'calculate'.";
    }
}

// Text-to-Speech (TTS) for bot responses
function speakMessage(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
}

// Add event listeners
document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Initial bot greeting
window.onload = function () {
    setTimeout(() => addMessage("Hi there! I'm Noah, your voice-enabled chatbot. How can I assist you today?", "bot"), 500);
};
