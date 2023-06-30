import { ChatUser } from "@/assets/icon";
import { Typewriter } from "react-simple-typewriter";

const UserChat = ({ val, projectData, bottomRef }) => {
  return (
    <>
      {val?.question && (
        <li className="reply">
          <div
            className="chat-field"
            style={{
              borderColor: projectData?.text_container,
            }}
          >
            <p style={{ color: projectData?.text_color }}>
              <Typewriter
                words={[val?.question]}
                typeSpeed={20}
                delaySpeed={10}
              />
            </p>
            <span className="time" style={{ color: projectData?.text_color }}>
              {val?.resTime}
            </span>
          </div>
        </li>
      )}
      {val?.answer && (
        <li className="sender">
          <div
            className="chat-field"
            style={{
              borderColor: projectData?.user_text_container,
            }}
          >
            <span className="user-icon">
              <ChatUser />
            </span>
            <div className="chating">
              <p
                style={{
                  color: projectData?.text_color,
                }}
              >
                <Typewriter
                  words={[val?.answer]}
                  typeSpeed={20}
                  delaySpeed={10}
                />
              </p>
              <span
                className="time"
                style={{
                  color: projectData?.text_color,
                }}
              >
                {val?.messaTime}
              </span>
            </div>
          </div>
        </li>
      )}
      <div ref={bottomRef} />
    </>
  );
};
export default UserChat;
