import { ChatUser } from "@/assets/icon";
import moment from "moment";
import { Typewriter } from "react-simple-typewriter";

const WelComeMessage = ({ projectData }) => {
  return (
    <>
      <li className="reply">
        <div
          className="chat-field"
          style={{
            borderColor: projectData?.user_text_container,
          }}
        >
          <p style={{ color: projectData?.text_color }}>
            <Typewriter
              words={["Hello! How may I assist you today?"]}
              typeSpeed={20}
              delaySpeed={10}
            />
          </p>
          <span className="time">{moment(new Date()).format("hh:mm A")}</span>
        </div>
      </li>
    </>
  );
};
export default WelComeMessage;
