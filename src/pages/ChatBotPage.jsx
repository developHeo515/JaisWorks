//기존 코드 보관
import React, { useState } from "react";
import axios from "axios";

function ChatBotPage() {
  const [messages, setMessages] = useState([]); // To store chat messages
  const [input, setInput] = useState(""); // To store user input
  const [isLoading, setIsLoading] = useState(false); // To show loading status

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to the chat
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput(""); // Clear input field
    setIsLoading(true);

    try {
      // Call the OpenAI API
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // or "gpt-4", depending on your access
          messages: [
            {
              role: "system",
              content:
                "너는 30년차 골프 전문가이고 유저에게 골프 자세를 코칭해주는 골프 강사야. 골프 논문이나 골프 자료들을 참고해서 유저의 질문에 대한 설명과 코칭을 진행하고 대답을 중학생 수준 이하의 사람들도 이해할 수 있게 수치적으로 대답해줘. ",
            },
            { role: "user", content: input },
          ],
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      // Get the bot's response from the API
      const botMessage = {
        sender: "bot",
        text: response.data.choices[0].message.content,
      };

      // Update messages with the bot's response
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error communicating with the OpenAI API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div key={index} style={styles[msg.sender]}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div style={styles.bot}>Typing...</div>}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={isLoading}
        />
        <button style={styles.button} onClick={handleSend} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  chatWindow: {
    width: "80%",
    height: "70vh",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    overflowY: "scroll",
    marginBottom: "20px",
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px",
    maxWidth: "80%",
  },
  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#e1e1e1",
    color: "#000",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px",
    maxWidth: "80%",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  input: {
    flexGrow: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ChatBotPage;
