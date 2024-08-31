//기존 코드 보관
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function ChatBotPage() {
  const [messages, setMessages] = useState([]); // To store chat messages
  const [input, setInput] = useState(""); // To store user input
  const [isLoading, setIsLoading] = useState(false); // To show loading status
  // Step 1: angle_json 데이터를 저장할 상태 변수 생성
  const [angleJson, setAngleJson] = useState(null);

  // Step 2: API에서 데이터를 가져오는 함수
  const getApi = async () => {
    try {
      // 첫 번째 API 호출로 URL을 가져옴
      const res = await axios.get(
        `https://golfposeserver.store/get_json_data/`
      );
      const jsonUrl = res.data[0].angle_json; // URL을 추출

      console.log(jsonUrl); // URL을 콘솔에 출력

      // 두 번째 API 호출로 실제 JSON 데이터를 가져옴
      const jsonResponse = await axios.get(jsonUrl);
      setAngleJson(jsonResponse.data); // 가져온 JSON 데이터를 상태에 저장
      console.log(JSON.stringify(jsonResponse.data, null, 2));
      // console.log(angleJson);
    } catch (error) {
      console.log("백엔드호출실패 ChatBotPage.jsx");
      console.log(error); // 오류 발생 시 출력
    }
  };

  // 컴포넌트가 마운트될 때 getApi 호출
  useEffect(() => {
    getApi();
  }, []);

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
              content: `
                너는 30년차 골프 전문가이고 유저에게 골프 자세를 코칭해주는 골프 강사야. 
                골프 논문이나 골프 자료들을 참고해서 유저의 질문에 대한 설명과 코칭을 
                진행하고 대답을 중학생 수준 이하의 사람들도 이해할 수 있게 수치적으로 대답해줘.

                그리고 추가로 답변에 ${angleJson} 이 데이터에서
                left_Leg, left_arm, right_arm, right_leg 데이터들의 2D_list를 참고하여
                분석한 결과를 항상 답변해줘
                `,
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
      {/* Step 5: 저장된 angle_json 데이터를 화면에 표시 */}
      {/* <div>   
        {angleJson ? (
          <pre>{JSON.stringify(angleJson, null, 2)}</pre> // JSON 데이터를 보기 좋게 출력
        ) : (
          <p>Loading data...</p> // 데이터 로딩 중 표시할 텍스트
        )}
      </div> */}

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
