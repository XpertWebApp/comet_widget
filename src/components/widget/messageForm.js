import { Button, Form } from "react-bootstrap";
import { SendIcon } from "@/assets/icon";

const MessageForm = ({
  message,
  loader,
  ipAddress,
  loading,
  handleSubmit,
  error,
  handleMessageChange,
  projectData,
  ratingBox, api_key
}) => {
  return (
    <>
      <div className="send-box">
        <Form
          onSubmit={
            ratingBox
              ? (e) => {
                e.preventDefault();
              }
              : loading
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
            disabled={!api_key || (loader && !ipAddress) ? true : false}
            value={message}
            onChange={handleMessageChange}
            style={{ color: projectData?.text_input }}
          />
          <Button
            className="chatsend"
            disabled={!api_key || (loader && !ipAddress) ? true : false}
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
