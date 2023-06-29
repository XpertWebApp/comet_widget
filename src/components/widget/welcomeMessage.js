import { ChatUser } from "@/assets/icon";

const WelComeMessage = ({ projectData }) => {
  return (
    <>
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
            <p style={{ color: projectData?.text_color }}>
              {" "}
              Hello! How may I assist you today?{" "}
            </p>
            <span className="time" style={{ color: projectData?.text_color }}>
              10:06 am
            </span>
          </div>
        </div>
      </li>
    </>
  );
};
export default WelComeMessage;
