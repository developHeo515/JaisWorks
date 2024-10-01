//기존 코드 보관
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function ChatBotPage() {
  const [messages, setMessages] = useState([]); // To store chat messages
  const [input, setInput] = useState(""); // To store user input
  const [isLoading, setIsLoading] = useState(false); // To show loading status

  // Step 1: angle_json 데이터를 저장할 상태 변수 생성
  const [angleJson, setAngleJson] = useState(null);
  const [leftLeg, setLeftLeg] = useState(null);
  const [rightLeg, setRightLeg] = useState(null);
  const [leftArm, setLeftArm] = useState(null);
  const [rightArm, setRightArm] = useState(null);

  // Step 2: API에서 데이터를 가져오는 함수
  const getApi = async () => {
    try {
      // 첫 번째 API 호출로 URL을 가져옴
      const res = await axios.get(
        `https://golfposeserver.store/get_json_data/`
      );
      const jsonUrl = res.data[1].angle_json; // URL을 추출
      // console.log("Fetched JSON URL: ", jsonUrl); // URL을 콘솔에 출력

      // 두 번째 API 호출로 실제 JSON 데이터를 가져옴
      const jsonResponse = await axios.get(jsonUrl);
      const jsonData = jsonResponse.data;

      setAngleJson(jsonData); // 전체 데이터를 상태에 저장
      console.log("Fetched angle JSON: ", jsonData);

      // 부위 별로 데이터를 분리하고, 3D_list 키를 제외하고 저장
      const filter3DList = (data) => {
        if (data) {
          const filteredData = { ...data }; // 원본 데이터 복사
          ["A", "B", "C"].forEach((key) => {
            if (
              filteredData[key] &&
              filteredData[key].hasOwnProperty("3D_list")
            ) {
              delete filteredData[key]["3D_list"]; // 3D_list 제거
            }
          });

          // 2D_list 데이터를 소수점 3자리로 반올림
          const roundValues = (array) =>
            array.map((value) => Math.round(value * 1000) / 1000);

          // 각 부위의 2D_list를 반올림
          // console.log(filteredData["A"]["2D_list"]);
          filteredData["A"]["2D_list"] = roundValues(
            filteredData["A"]["2D_list"]
          );
          filteredData["B"]["2D_list"] = roundValues(
            filteredData["B"]["2D_list"]
          );
          filteredData["C"]["2D_list"] = roundValues(
            filteredData["C"]["2D_list"]
          );
          // console.log(filteredData);
          return filteredData;
        }
        return null;
      };

      const filteredLeftLeg = filter3DList(jsonData.left_leg);
      const filteredRightLeg = filter3DList(jsonData.right_leg);
      const filteredLeftArm = filter3DList(jsonData.left_arm);
      const filteredRightArm = filter3DList(jsonData.right_arm);

      // 부위별로 필터링 후 상태 저장
      setLeftLeg(filteredLeftLeg);
      setRightLeg(filteredRightLeg);
      setLeftArm(filteredLeftArm);
      setRightArm(filteredRightArm);

      // console.log("Filtered Left Leg: ", filteredLeftLeg);
      // console.log("Filtered Right Leg: ", filteredRightLeg);
      // console.log("Fetched angle JSON: ", jsonData);
    } catch (error) {
      console.log("JSON 데이터 가져오기 실패: ChatBotPage.jsx");
      console.log(error); // 오류 발생 시 출력
    }
  };

  // 컴포넌트가 마운트될 때 getApi 호출
  useEffect(() => {
    getApi();
  }, []);

  // useEffect(() => {
  //   console.log("LeftLeg: ", leftLeg);
  //   if (leftLeg != null) {
  //     console.log("LeftLeg 2D_list: ", leftLeg["A"]["2D_list"].length);
  //   }
  //   console.log("RightLeg: ", rightLeg);
  // }, [leftLeg, rightLeg]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to the chat
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput(""); // Clear input field
    setIsLoading(true);

    // API 호출 전에 angleJson이 로드되었는지 확인
    if (!angleJson) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "JSON 데이터가 아직 로드되지 않았습니다. 잠시 후 다시 시도해 주세요.",
        },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // API 키 가져오기
      if (!apiKey) {
        console.error("API 키가 설정되지 않았습니다.");
        return;
      }
      // Call the OpenAI API
      console.log(import.meta.env.VITE_OPENAI_API_KEY);

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          // model: "gpt-3.5-turbo", // or "gpt-4", depending on your access
          model: "gpt-4",
          messages: [
            {
              role: "system",
              // content: `
              //   너는 30년차 골프 전문가이고 유저에게 골프 자세를 코칭해주는 골프 강사야.
              //   골프 논문이나 골프 자료들을 참고해서 유저의 질문에 대한 설명과 코칭을
              //   진행하고 대답을 중학생 수준 이하의 사람들도 이해할 수 있게 수치적으로 대답해줘.
              //   답변할 때 항상 부가적으로 이 URL에서 json 데이터를 사용해: https://golfposeserver.store/get_angle_json_data/0/skeleton_angles.json/

              //   출력은 골프에 대한 설명을 간단하게 해주고 이후엔 json 데이터를 사용해 수치적 답변을 해줘

              //   다음은 예시 답변이야
              //   골프 포즈에는 팔꿈치와 다리 그리고 어깨를 적절하게 넓혀야합니다.
              //   다음은 json 데이터를 활용한 수치입니다.
              //   왼쪽다리(left_leg)
              //   - A points에서 2D데이터 각도는 평균적으로 n도입니다.
              //   - B points에서 2D데이터 각도는 평균적으로 n도입니다.
              //   - C points에서 2D데이터 각도는 평균적으로 n도입니다.
              //   - 각 2D_list의 길이는 n입니다.

              // 여기까지 예시 답변이야
              //   이때 2D데이터 각도는 각 A, B, C에 담긴 2D_list들의 각도 데이터 평균이야.
              //   2D_list의 길이는 2D_list배열의 길이야.
              // `,
              content: `
                너는 30년차 골프 전문가이고 유저에게 골프 자세를 코칭해주는 골프 강사야.
                골프 논문이나 골프 자료들을 참고해서 유저의 질문에 대한 설명과 코칭을
                진행하고 대답을 중학생 수준 이하의 사람들도 이해할 수 있게 수치적으로 대답해줘.

                추가적으로 대화할때 이 데이터를 참고해서 답변해줘 
                데이터를 참고할 때 각 A, B, C 키값 안에 2D_list배열 안에 들어 있는 데이터를 정확하게 봐줘
                각 A, B, C 키값 안에는 키에 해당하는 이름이 label에 적혀있어
                그리고 label에 적힌 관절에 대한 2D 각도들이 2D_list에 담겨 있으니 2D_list 안에 담긴 데이터를 전체적으로
                잘 확인하고 2D_list 배열의 전체 크기를 대답해줘 
                
                왼쪽 다리 데이터 = ${JSON.stringify(leftLeg)}
                왼쪽 다리 데이터 2D_list 배열 크기 = ${
                  leftLeg["A"]["2D_list"].length
                }

                오른쪽 다리 데이터 = ${JSON.stringify(rightLeg)}
                오른쪽 다리 데이터 2D_list 배열 크기 = ${
                  rightLeg["A"]["2D_list"].length
                }



                `,
            },
            { role: "user", content: input },
          ],
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
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
      console.error("OpenAI API와의 통신 오류:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "죄송합니다. 문제가 발생했습니다. 다시 시도해 주세요.",
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
