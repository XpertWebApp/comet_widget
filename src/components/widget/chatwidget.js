import React, { useEffect, useState } from "react";
import { SendIcon, ChatUser } from "@/assets/icon";
import { Button, Form, FormGroup } from "react-bootstrap";
import DotsLoader from "@/components/Loader/DotsLoader";
import Image from "next/image";
import UserImg from "../../assets/img/chatuser.png";
import { get, post } from "@/pages/api/apis";
import axios from "axios";
import ChatButton from "./Chatbutton";

const ChatWidget = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [ipAddress, setIpAddress] = useState("");
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ip = localStorage.getItem("ipAddress")
      ? localStorage.getItem("ipAddress")
      : "";
    setIpAddress(ip);
  }, []);

  useEffect(() => {
    if (ipAddress) {
      getIpData();
    } else {
      setLoader(true);
    }
  }, [ipAddress]);

  const getIpData = async () => {
    setLoader(true);
    if (ipAddress) {
      const res = await get(`user/getIp?ip=${ipAddress}`);
      if (res?.data?.status) {
        setIpAddress(res?.data?.data?.ip);
        setLoader(true);
      }
    } else {
      setLoader(true);
    }
  };

  const handleChange = (e) => {
    let val = "";
    if (e.target.name == "email") {
      val = e.target.value.trim();
      setError({
        ...error,
        email: "",
      });
    } else if (e.target.name == "first_name") {
      val = e.target.value.trimStart();
      setError({
        ...error,
        first_name: "",
      });
    } else {
      val = e.target.value.trimStart();
    }
    setFormData({ ...formData, [e.target.name]: val });
  };

  const isValid = () => {
    const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!formData.first_name) {
      setError({ first_name: "Please enter your first name!" });
      return false;
    }
    if (!formData.email) {
      setError({ email: "Please enter your email!" });
      return false;
    } else if (formData.email && !regex.test(formData.email)) {
      setError({ email: "Please enter your valid email!" });
      return false;
    } else {
      setError({});
      return true;
    }
  };

  const isMessageValid = () => {
    if (!message) {
      setError({ message: "Please enter message!" });
      return false;
    } else {
      setError({});
      return true;
    }
  };

  const handleFormClick = async () => {
    if (isValid()) {
      let ipAdd = localStorage.getItem("ipAddress");
      if (!ipAdd) {
        const res = await axios.get(
          `https://api.ipdata.co?api-key=${process.env.IPDATA_KEY}`
        );
        ipAdd = res.data.ip;
      }
      if (ipAdd) {
        localStorage.setItem("ipAddress", ipAdd);
        setIpAddress(ipAdd);
        const res = await post("user/createUser", {
          ...formData,
          ip: ipAdd,
        });
        if (res && res.data && res.data.status) {
        }
      }
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value.trimStart());
    setError({
      ...error,
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMessageValid()) {
      setLoading(true);
    }
  };

  const [widgetshow, setWidgetShow] = useState(false);
  const HandleWidget = () => {
    setWidgetShow(!widgetshow);
  };

  return (
    <>
      {" "}
      <div className="chat-widget-wrapper">
        <ChatButton HandleWidget={HandleWidget} widgetshow={widgetshow} />
        {widgetshow && (
          <div className="widgt-chat-box">
            <div className="chatbox">
              <div className="modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="msg-head">
                    handleFormClick
                    <h3>Hi, Ask Us A Question Here....</h3>
                    <div className="chatuser-img">
                      <Image src={UserImg} alt="user-img" />
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
                            <p> Hello! How may I assist you today? </p>
                            <span className="time">10:06 am</span>
                          </div>
                        </div>
                      </li>
                      {loader && !ipAddress && (
                        <li>
                          <div className="sender-chat-form">
                            <h3 className="heading">
                              Let us Know how to contact you
                            </h3>
                            <div className="snd-chat-field">
                              <FormGroup className="form-group">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="first_name"
                                  value={formData.first_name}
                                  onChange={handleChange}
                                />
                                <span className="error">
                                  {error.first_name}
                                </span>
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
                                <span className="error">{error.email}</span>
                              </FormGroup>
                              <div className="chat-sendbtn">
                                <Button
                                  className="sendchat"
                                  onClick={handleFormClick}
                                >
                                  <SendIcon />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )}

                      {/* <li className="reply">
                    <div className="chat-field">
                      <p> Last Minute Festive Packages From </p>
                      <span className="time">10:20 am</span>
                    </div>
                  </li> */}
                    </ul>
                  </div>

                  <div className="send-box">
                    <Form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        className={
                          error?.message
                            ? "form-control messageError"
                            : "form-control"
                        }
                        aria-label="message…"
                        placeholder="message…"
                        name="message"
                        disabled={loader && !ipAddress ? true : false}
                        value={message}
                        onChange={handleMessageChange}
                      />
                      <div className="dots-loader">
                        {loading ? <DotsLoader /> : ""}
                      </div>
                      <Button
                        className="chatsend"
                        disabled={loader && !ipAddress ? true : false}
                        type="submit"
                      >
                        <SendIcon />
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ChatWidget;
