import { ChatUser } from "@/assets/icon";
import moment from "moment";
import { Typewriter } from "react-simple-typewriter";

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
              <Typewriter
                words={["Hello! How may I assist you today?"]}
                typeSpeed={20}
                delaySpeed={10}
              />
            </p>
            <span className="time" style={{ color: projectData?.text_color }}>
              {moment(new Date()).format("hh:mm A")}
            </span>
          </div>
        </div>
      </li>
    </>
  );
};
export default WelComeMessage;
