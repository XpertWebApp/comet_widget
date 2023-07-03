import { get, post } from "@/pages/api/apis";
import axios from "axios";
import moment from "moment";
import toast from "toastr";

const date = new Date();

export const handleSubmit = async (
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
  setRatingBox,
  setError
) => {
  e.preventDefault();
  const messTimes = moment(date).format("hh:mm A");
  const resTime = moment(date).format("hh:mm A");
  if (isMessageValid()) {
    let msg = message;
    setMessage("");
    const obj = {
      question: msg,
      history: history,
      project_id: projectData?._id,
      chat_id: chatData?._id,
      user_id: senderData?._id,
      receiver_id: "",
    };
    setLoading(true);
    let obj1 = {
      question: msg,
      resTime: messTimes,
    };
    messages.push(obj1);
    const res = await post("chat/chatWithBot", obj);
    if (res && res.data && res.data.status) {
      obj1.messaTime = resTime;
      obj1.answer = res?.data?.message?.text;
      setHistory([...history, [message, res?.data?.message?.text]]);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setMessages(messages);
      if (messages.length % 5 === 0) {
        setRatingBox(true);
        console.log("Showing modal...");
      } else {
        setRatingBox(false);
      }
      setError("");
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(res.data.message);
    }
    // await socketIo.emit("sendMsg", {
    //   chat_id: chatData._id,
    //   user_id: senderData._id,
    //   message: msg,
    //   type: "user",
    // });
  }
};

export const getIpData = async (
  setLoader,
  ipAddress,
  setSenderData,
  setProjectData,
  setChatData
) => {
  setLoader(true);
  if (ipAddress) {
    const res = await get(
      `user/getWithIp?ip=${ipAddress}&api_key=${"a34449be63e668ad39b5ff6b624dfeaeadd97b76c47c25ce2263f1bb823af02c"}`
    );
    if (res?.data?.status) {
      setSenderData(res.data.user);
      setProjectData(res.data.project);
      setChatData(res.data.chats);
      setLoader(true);
    }
  } else {
    setLoader(true);
  }
};

export const handleChange = (e, setError, setFormData, formData, error) => {
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

export const handleFormClick = async (e, isValid, formData, setIpAddress) => {
  if (isValid()) {
    let ipAdd = localStorage.getItem("ipAddress");
    if (!ipAdd) {
      const res = await axios.get(
        `https://api.ipdata.co?api-key=${process.env.IPDATA_KEY}`
      );
      ipAdd = res.data.ip;
    }
    if (ipAdd) {
      const res = await post("user/createUser", {
        ...formData,
        ip: ipAdd,
      });
      if (res && res.status == 200) {
        localStorage.setItem("ipAddress", ipAdd);
        setIpAddress(ipAdd);
      } else {
        toast.error(res.data.message);
      }
    }
  }
};
