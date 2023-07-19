import { ChatUser } from "@/assets/icon";
import moment from "moment";
import { Typewriter } from "react-simple-typewriter";

const WelComeMessage = ({ projectData }) => {
  return (
    <>
      <li className="request">
        <div
          className="chat-field"
          style={{
            borderColor: projectData?.user_text_container,
          }}
        >
          <p style={{ color: projectData?.text_color }}>
            <Typewriter
              words={[projectData?.message || "Please wait till we are connecting you with our agent!"]}
              typeSpeed={20}
              delaySpeed={10}
            />
          </p>
        </div>
      </li>
    </>
  );
};
export default WelComeMessage;
