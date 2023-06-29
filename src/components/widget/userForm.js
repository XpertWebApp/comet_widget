import { Button, Form, FormGroup } from "react-bootstrap";
import { SendIcon } from "@/assets/icon";

const UserForm = ({ formData, handleChange, error, handleFormClick }) => {
  return (
    <>
      <li>
        <div className="sender-chat-form">
          <h3 className="heading">Let us Know how to contact you</h3>
          <div className="snd-chat-field">
            <FormGroup className="form-group">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              {error.first_name && (
                <span className="error">{error.first_name}</span>
              )}
            </FormGroup>
            <FormGroup className="form-group">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && <span className="error">{error.email}</span>}
            </FormGroup>
            <div className="chat-sendbtn">
              <Button className="sendchat" onClick={handleFormClick}>
                <SendIcon />
              </Button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
export default UserForm;
