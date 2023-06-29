import { ChatUser } from "@/assets/icon";

const UserChat = ({ val, projectData }) => {
  return (
    <>
      {val?.question && (
        <li className="reply">
          <div
            className="chat-field"
            style={{
              "border-color": projectData?.text_container,
            }}
          >
            <p style={{ color: projectData?.text_color }}>{val.question}</p>
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
              "border-color": projectData?.user_text_container,
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
                {val.answer}
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
    </>
  );
};
export default UserChat;
