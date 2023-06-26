
import React from "react";
import { SendIcon,ChatUser } from "@/assets/icon";
import { Button, Form } from "react-bootstrap";
import DotsLoader from "@/components/Loader/DotsLoader";
import Image from "next/image";
import UserImg from "../../assets/img/chatuser.png"
const ChatWidget = () => {
  return (
    <>
      <div className="widgt-chat-box">
        <div className="chatbox">
          <div className="modal-dialog-scrollable">
            <div className="modal-content">
              <div className="msg-head">
                <h3>Hi, Ask Us A Question Here....</h3>
                <div className="chatuser-img">
                    <Image src={UserImg} alt="user-img"/>
                </div>
              </div>

              <div className="msg-body">
                <ul>
                  <li className="sender">
                    <div className="chat-field">
                      <span className="user-icon">
                        <ChatUser />
                      </span>
                      <div className="chating">
                        <p> Hey, Are you there? </p>
                        <span className="time">10:06 am</span>
                      </div>
                    </div>
                  </li>
                  <li className="sender">
                    <div className="chat-field">
                      <span className="user-icon">
                        <ChatUser />
                      </span>
                      <div className="chating">
                        <p> Hey, Are you there? </p>
                        <span className="time">10:16 am</span>
                      </div>
                    </div>
                  </li>
                  <li className="reply">
                    <div className="chat-field">
                      <p> Last Minute Festive Packages From </p>
                      <span className="time">10:20 am</span>
                    </div>
                  </li>
                  <li className="sender">
                    <div className="chat-field">
                      <span className="user-icon">
                        <ChatUser />
                      </span>
                      <div className="chating">
                        <p> Hey, Are you there? </p>
                        <span className="time">10:26 am</span>
                      </div>
                    </div>
                  </li>
                  <li className="sender">
                    <div className="chat-field">
                      <span className="user-icon">
                        <ChatUser />
                      </span>
                      <div className="chating">
                        <p> Hey, Are you there? </p>
                        <span className="time">10:32 am</span>
                      </div>
                    </div>
                  </li>
                  <li className="reply">
                    <div className="chat-field">
                      <p>From Superbreak</p>
                      <span className="time">10:35 am</span>
                    </div>
                  </li>

                  <li className="reply">
                    <div className="chat-field">
                      <p> Last Minute Festive Packages</p>
                      <span className="time">10:36 am</span>
                    </div>
                  </li>
                  <li className="reply">
                    <div className="chat-field">
                      <p>Last Minute Festive Packages From </p>
                      <span className="time">just now</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="send-box">
                <Form>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="message…"
                    placeholder="message…"
                  />
                <div className="dots-loader">
                      <DotsLoader />
                    </div>
                  <Button className="chatsend" type="button">
                    <SendIcon />
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatWidget;