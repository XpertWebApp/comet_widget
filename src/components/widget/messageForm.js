import { Button, Form } from "react-bootstrap";
import { SendIcon } from "@/assets/icon";
import DotsLoader from "@/components/Loader/DotsLoader";

const MessageForm = ({
  message,
  loader,
  ipAddress,
  loading,
  handleSubmit,
  error,
  handleMessageChange,
  projectData,
  ratingBox
}) => {
  return (
    <>
      <div className="send-box">
        <Form
          onSubmit={
            loading && ratingBox
              ? (e) => {
                  e.preventDefault();
                }
              : handleSubmit
          }
        >
          <input
            type="text"
            className={
              error?.message ? "form-control messageError" : "form-control"
            }
            aria-label="message…"
            placeholder="message…"
            name="message"
            disabled={loader && !ipAddress ? true : false}
            value={message}
            onChange={handleMessageChange}
            style={{ color: projectData?.text_input }}
          />
          {/* <div className="dots-loader">{loading ? <DotsLoader /> : ""}</div> */}
          <Button
            className="chatsend"
            disabled={loader && !ipAddress ? true : false}
            type="submit"
          >
            <SendIcon text_button={projectData?.text_button} />
          </Button>
        </Form>
      </div>
    </>
  );
};
export default MessageForm;
