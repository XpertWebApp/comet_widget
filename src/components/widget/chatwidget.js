import React, { useEffect, useRef, useState } from "react";
import { StarIcon } from "@/assets/icon";
import { Button } from "react-bootstrap";
import DotsLoader from "@/components/Loader/DotsLoader";
import Image from "next/image";
import UserImg from "../../assets/img/chatuser.png";
import ChatButton from "./Chatbutton";
import socketIOClient from "socket.io-client";
import UserForm from "./userForm";
import UserChat from "./userChat";
import RatingBox from "./ratingBox";
import MessageForm from "./messageForm";
import {
  getIpData,
  handleChange,
  handleFormClick,
  handleMemberChatSubmit,
  handleSubmit,
} from "@/helper/functions";
import { get, post } from "@/pages/api/apis";
import toast from "toastr";
import moment from "moment";
import WelComeMessage from "./welcomeMessage";

const socketIo = socketIOClient(process.env.WEB_API_URL);

const ChatWidget = () => {
  let messagesRef = useRef();
  const bottomRef = useRef(null);
  const [widgetshow, setWidgetShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [ipAddress, setIpAddress] = useState("");
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [projectData, setProjectData] = useState({});
  const [senderData, setSenderData] = useState({});
  const [chatData, setChatData] = useState({});
  const [messages, setMessages] = useState([
    {
      message: "Hello! How may I assist you today?",
      sender: "bot",
      type: "message",
      resTime: moment(new Date()).format("hh:mm A"),
    },
  ]);
  const [history, setHistory] = useState([]);
  const [chatagent, setChatAgent] = useState(false);
  const [chatcontinue, setChatContinue] = useState(true);
  const [ratingBox, setRatingBox] = useState(false);
  const [withAgentSatus, setWithAgentSatus] = useState(false);
  const [withAgent, setWithAgent] = useState(false);
  const [clicked, setclicked] = useState(false);
  const chatMessages = useRef(null);

  useEffect(() => {
    chatMessages.current = messages;
  }, [messages]);

  // useEffect(() => {
  //   if (messages.length > 1 && !withAgentSatus)
  //     messages.push({
  //       message: "Hello! How may I assist you today?",
  //       sender: "bot",
  //       type: "message",
  //       resTime: moment(new Date()).format("hh:mm A"),
  //     });
  //   setMessages(messages);
  // }, [messages, withAgentSatus]);

  useEffect(() => {
    if (withAgentSatus && !messages.find((val) => val.type == "newrequest"))
      messages.push({
        message: "Please wait till we are connecting you with our agent!",
        sender: "bot",
        type: "newrequest",
      });
    setMessages(messages);
  }, [withAgentSatus, messages]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    socketIo.emit("onChatConnect", {
      chat_id: chatData?._id,
    });
  }, [chatData]);

  useEffect(() => {
    if (chatData?._id) getSingleChat();
  }, [chatData]);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
  }, [messages, message, clicked]);

  useEffect(() => {
    const ip = localStorage.getItem("ipAddress");
    setIpAddress(ip);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const Api_Key = urlParams.get("api_key");
    if (ipAddress && Api_Key) {
      getIpData(
        setLoader,
        ipAddress,
        setSenderData,
        setProjectData,
        setChatData,
        Api_Key
      );
    } else {
      setLoader(true);
    }
  }, [ipAddress, withAgentSatus]);

  useEffect(() => {
    socketIo.on("message", (data) => {
      console.log(data, "data");
      if (!chatMessages.current.find((val) => val.message == data)) {
        setWithAgentSatus(false);
        setMessages([
          ...chatMessages.current,
          {
            message: data.message,
            sender: data.type,
            chat_id: data?.chat_id,
            createdAt: new Date(),
          },
        ]);
      }
    });
  }, []);

  const handleChatagent = () => {
    setChatAgent(true);
    setChatContinue(false);
  };
  const handleChatcht = () => {
    setChatContinue(true);
    setWithAgent(false);
    setChatAgent(false);
    setRatingBox(false);
    setWithAgentSatus(false);
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

  const handleMessageChange = (e) => {
    setMessage(e.target.value.trimStart());
    setError({
      ...error,
      message: "",
    });
  };

  const HandleWidget = () => {
    setWidgetShow(!widgetshow);
    setWithAgent(false);
    setclicked(true);
    setChatContinue(true);
    setChatAgent(false);
    setRatingBox(false);
    setTimeout(() => {
      setclicked(false);
    }, 1000);
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    if (selectedRating > 3) {
      setRatingBox(false);
    }
  };

  const renderStars = () => {
    let stars = [];

    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "star selected" : "star";

      stars.push(
        <>
          <Button
            key={i}
            className={starClass}
            onClick={() => handleStarClick(i)}
          >
            <StarIcon />
          </Button>
        </>
      );
    }

    return stars;
  };

  const handleChatWithAgent = async () => {
    if (senderData?._id) {
      const res = await post("notification/send", {
        project_id: projectData?._id,
        chat_id: chatData?._id,
        user_id: senderData?._id,
      });
      if (res && res.data && res.data.status) {
        setWithAgentSatus(true);
        setWithAgent(true);
        setChatContinue(false);
        setChatAgent(false);
        setRatingBox(false);
      } else {
        setChatContinue(true);
        setWithAgentSatus(false);
        setWithAgent(false);
        toast.error(res?.data?.message);
      }
    }
  };

  const getSingleChat = async () => {
    if (chatData?._id) {
      const res = await get(`chat/getSingle?chat_id=${chatData?._id}`);
      if (res?.data?.status) {
        setMessages(res?.data?.message[0]?.messages);
      } else {
        toast.error(res?.data?.message);
      }
    }
  };

  return (
    <>
      <div className="chat-widget-wrapper">
        <ChatButton HandleWidget={HandleWidget} widgetshow={widgetshow} />
        {widgetshow && (
          <div className="widgt-chat-box">
            <div className="chatbox">
              <div className="modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="msg-head">
                    <h3>Hi, Ask Us A Question Here....</h3>
                    <div className="chatuser-img">
                      <Image src={UserImg} alt="user-img" />
                    </div>
                  </div>

                  <div className="msg-body">
                    <ul>
                      {messages && messages.length > 0 ? (
                        messages.map((val) => {
                          return (
                            <>
                              <UserChat
                                val={val}
                                projectData={projectData}
                                loading={loading}
                                bottomRef={bottomRef}
                                withAgentSatus={withAgentSatus}
                              />
                            </>
                          );
                        })
                      ) : (
                        <WelComeMessage projectData={projectData} />
                      )}

                      {loader && !ipAddress && (
                        <UserForm
                          formData={formData}
                          handleChange={(e) =>
                            handleChange(
                              e,
                              setError,
                              setFormData,
                              formData,
                              error
                            )
                          }
                          error={error}
                          handleFormClick={(e) =>
                            handleFormClick(
                              e,
                              isValid,
                              formData,
                              setIpAddress,
                              setChatAgent,
                              setChatContinue,
                              setRatingBox
                            )
                          }
                        />
                      )}
                      {loading ? (
                        <li className="sender">
                          <DotsLoader />
                        </li>
                      ) : (
                        ""
                      )}
                      {ratingBox && (
                        <RatingBox
                          chatcontinue={chatcontinue}
                          handleChatagent={handleChatagent}
                          renderStars={renderStars}
                          chatagent={chatagent}
                          handleChatcht={handleChatcht}
                          rating={rating}
                          handleChatWithAgent={handleChatWithAgent}
                          withAgentSatus={withAgentSatus}
                        />
                      )}
                      <div ref={bottomRef} />
                    </ul>
                  </div>
                  <MessageForm
                    message={message}
                    loader={loader}
                    ipAddress={ipAddress}
                    loading={loading}
                    handleSubmit={
                      withAgent
                        ? (e) =>
                            handleMemberChatSubmit(
                              e,
                              isMessageValid,
                              message,
                              setMessage,
                              chatData,
                              senderData,
                              messages,
                              socketIo
                            )
                        : (e) =>
                            handleSubmit(
                              e,
                              isMessageValid,
                              message,
                              setMessage,
                              history,
                              projectData,
                              chatData,
                              senderData,
                              messages,
                              setLoading,
                              setHistory,
                              setMessages,
                              bottomRef,
                              setChatAgent,
                              setChatContinue,
                              setRatingBox,
                              setError
                            )
                    }
                    error={error}
                    handleMessageChange={handleMessageChange}
                    projectData={projectData}
                    ratingBox={ratingBox}
                  />
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
