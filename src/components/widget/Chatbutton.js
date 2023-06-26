import React from "react";
import { Button } from "react-bootstrap";
import { BiSolidChat } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
const ChatButton = ({ HandleWidget, widgetshow }) => {
  return (
    <>
      <Button className="chatshowbtn" onClick={HandleWidget}>
        {widgetshow ? <MdOutlineClose /> : <BiSolidChat />}
      </Button>
    </>
  );
};
export default ChatButton;
