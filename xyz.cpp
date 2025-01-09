#include <iostream>
#include <map>
#include <string>
#include <algorithm>
#include <ctime>

using namespace std;

class SimpleChatBot {
private:
    map<string, string> responses;

public:
    SimpleChatBot() {
        responses["hello"] = "Hi there! How can I help you today?";
        responses["hi"] = "Hi there! How can I help you today?";
        responses["about you"] = "I am Noah, a chatbot. Made by Kajal Mantapurwar and Kashish Dhoke. I have limited information, and I hope I can assist you well. For more information, you can ask 'what you can do'.";
        responses["how are you"] = "I'm just a bot, but I'm here to assist you!";
        responses["bye"] = "Goodbye! Come back soon!";
        responses["what you can do"] = "I can tell you the time, tell jokes, give you riddles, and more!";
        responses["tell me a joke"] = "Why don't skeletons fight each other? They don't have the guts!";
        responses["motivate me"] = "Believe in yourself! Every day is a new opportunity!";
        responses["whats the time"] = "Fetching time...";
        responses["tell me time"] = "Fetching time...";
        responses["assistant mode"] = "Assistant mode activated! You can calculate, solve riddles, and more!";
        responses["exit assistant mode"] = "Exiting assistant mode. Back to casual chat!";
    }

    // Get current time
    string getTime() {
        time_t now = time(0);
        tm *ltm = localtime(&now);

        // Format the time as YYYY-MM-DD HH:MM:SS (24-hour format)
        char buffer[80];
        strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", ltm);
        return string(buffer);
    }

    // Function for solving a riddle
    string solveRiddle() {
        return "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?"; // Classic riddle
    }

    // Function to check answer to the riddle
    bool checkRiddleAnswer(string answer) {
        transform(answer.begin(), answer.end(), answer.begin(), ::tolower);  // Make answer case-insensitive

        if (answer == "echo") {
            return true;  // Correct answer
        }
        return false;  // Incorrect answer
    }

    void chat() {
        string user_input;
        bool in_assistant_mode = false;

        cout << "Hello! I'm Noah, your chatbot. How can I assist you today?" << endl;

        while (true) {
            cout << "You: ";
            getline(cin, user_input);

            // Convert to lowercase to make input case-insensitive
            transform(user_input.begin(), user_input.end(), user_input.begin(), ::tolower);

            // Check if in Assistant Mode
            if (in_assistant_mode) {
                if (user_input == "solve riddle") {
                    cout << "Bot: " << solveRiddle() << endl;  // Ask a riddle
                } else if (user_input == "exit assistant mode") {
                    cout << "Bot: " << responses["exit assistant mode"] << endl;
                    in_assistant_mode = false;
                } else {
                    cout << "Bot: Sorry, I didn't understand that. Try again!" << endl;
                }
            } else {
                if (responses.find(user_input) != responses.end()) {
                    if (user_input == "whats the time" || user_input == "tell me time") {
                        cout << "Bot: " << getTime() << endl;
                        cout << "Bot: By the way, did you know? You can activate 'Assistant Mode' for fun challenges and riddles! Just type 'assistant mode' to get started." << endl;
                    } else if (user_input == "hello" || user_input == "hi") {
                        cout << "Bot: " << responses[user_input] << endl;
                    } else if (user_input == "bye") {
                        cout << "Bot: Goodbye! Come back soon!" << endl;
                        break;
                    } else if (user_input == "assistant mode") {
                        cout << "Bot: " << responses[user_input] << endl;
                        in_assistant_mode = true;
                    } else {
                        cout << "Bot: " << responses[user_input] << endl;
                    }
                } else {
                    cout << "Bot: Hmm, I don't know how to respond to that. Could you try asking something else?" << endl;
                }
            }
        }
    }
};

int main() {
    SimpleChatBot bot;
    bot.chat();  // Start the chatbot
    return 0;    // Correct return statement at the end of main function
}
