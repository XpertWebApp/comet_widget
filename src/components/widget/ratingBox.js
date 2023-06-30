import { Button } from "react-bootstrap";

const RatingBox = ({
  chatcontinue,
  handleChatagent,
  renderStars,
  chatagent,
  handleChatcht,
  rating,
  handleChatWithAgent
}) => {
  return (
    <>
      <li>
        {chatcontinue && (
          <div className="chat-review">
            <div className="review-box">
              <h3>Does the 1-5 number rating question work with Comet?</h3>
              <div className="review-start" onClick={handleChatagent}>
                {renderStars()}
              </div>
              {/* <div className="review-update">
                <span>Really Unsatisfied</span>
                <span>Really Satisfied</span>
              </div> */}
            </div>
          </div>
        )}

        {rating <= 3 && chatagent && (
          <div className="chat-agent-field">
            <h3>Do You Wish to Continue or you want to chat with our agent?</h3>
            <div className="cnt-agnt-btn">
              <Button className="cntbtn" onClick={handleChatcht}>
                Continue
              </Button>
              <Button className="chtagentbtn" onClick={handleChatWithAgent}>Chat with Agent</Button>
            </div>
          </div>
        )}
      </li>
    </>
  );
};
export default RatingBox;
