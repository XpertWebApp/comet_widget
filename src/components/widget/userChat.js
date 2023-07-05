import { ChatUser } from "@/assets/icon";
import moment from "moment";
import { Typewriter } from "react-simple-typewriter";

const UserChat = ({ val, projectData, bottomRef }) => {
  return (
    <>
      {val?.sender == "member" ||
      val?.sender == "bot" ||
      val?.sender == "admin" ? (
        <li className="reply">
          <div
            className="chat-field"
            style={{
              borderColor: projectData?.text_container,
            }}
          >
            <p style={{ color: projectData?.text_color }}>
              <Typewriter
                words={[val?.message]}
                typeSpeed={20}
                delaySpeed={10}
              />
            </p>
            <span className="time">
              {moment(val.createdAt).format("HH:mm A")}
            </span>
          </div>
        </li>
      ) : (
        ""
      )}
      {val?.sender == "user" ? (
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
                  words={[val?.message]}
                  typeSpeed={20}
                  delaySpeed={10}
                />
              </p>
              <span className="time">
                {moment(val.createdAt).format("HH:mm A")}
              </span>
            </div>
          </div>
        </li>
      ) : (
        ""
      )}
    </>
  );
};
export default UserChat;
