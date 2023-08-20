import { get, post, streamResponseChatGPT } from "@/pages/api/apis";
import axios from "axios";
import moment from "moment";
import toast from "toastr";
import { v4 as uuidv4 } from "uuid";

var counter = 0;

export const HandlePromptChunkResponse = async (response) => {
  const reader = response.body.getReader();
  const md = window.markdownit();
  let promptResponse = "";
  const clone = document?.getElementsByTagName("li")[0]?.cloneNode(true);
  clone.id = "new-prompt-response";
  document
    ?.getElementsByTagName("ul")
    [document?.getElementsByTagName("ul")?.length - 1]?.appendChild(clone);
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = new TextDecoder("utf-8").decode(value);
    promptResponse += text;
    document
      .getElementById("new-prompt-response")
      .getElementsByTagName("p")[0].innerHTML = md.render(promptResponse);
  }
  document.getElementById("new-prompt-response").remove();
  return promptResponse;
};

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
  setChatAgent,
  setChatContinue,
  setRatingBox,
  setError
) => {
  counter++;
  if (counter == 0) {
    setRatingBox(false);
  } else if (counter == 5) {
    setRatingBox(true);
    counter = 0;
  } else {
    setRatingBox(false);
  }
  e.preventDefault();
  if (isMessageValid()) {
    if (chatData?._id) {
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
        message: msg,
        createdAt: new Date(),
        sender: "user",
        type: "message",
      };
      messages.push(obj1);
      const res = await streamResponseChatGPT("chat/chatWithBot", obj);
      if (res && res.body && res.status) {
        setLoading(false);
        const promptResponse = await HandlePromptChunkResponse(res);
        const obj2 = {
          createdAt: new Date(),
          sender: "bot",
          type: "message",
          message: promptResponse,
        };
        messages.push(obj2);
        setHistory([...history, [message, promptResponse]]);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setMessages(messages);
        setError("");
        setLoading(false);
        const payload = {
          message: `Asked: ${message}`,
          email: senderData?.email,
          contactId: localStorage.getItem('ContactId'),
          token: localStorage.getItem("auth_access_token"),
          type: 'Email'
        }
        await axios.all([
          axios.post(`${process.env.WEB_API_URL}/crm_data/send_message`, payload),
          axios.post(`${process.env.WEB_API_URL}/crm_data/send_message`, {...payload, message: `Response: ${promptResponse}`})
        ])
      } else {
        setLoading(false);
        toast.error(res?.data?.message);
      }
    }
  }
};

export const handleMemberChatSubmit = async (
  e,
  isMessageValid,
  message,
  setMessage,
  chatData,
  senderData,
  messages,
  socketIo
) => {
  const messTimes = moment(new Date()).format("hh:mm A");
  e.preventDefault();
  if (isMessageValid()) {
    let msg = message;
    let obj1 = {
      message: msg,
      sender: "user",
      type: "message",
      messaTime: messTimes,
    };
    messages.push(obj1);
    setMessage("");
    const objNew =
      chatData && chatData.members.find((val) => val.status == "active");
    await socketIo.emit("sendMsg", {
      chat_id: chatData?._id,
      user_id: senderData?._id,
      message: msg,
      type: "user",
      receiver_id: objNew?.id,
    });
  }
};

export const getIpData = async (
  setLoader,
  ipAddress,
  setSenderData,
  setProjectData,
  setChatData,
  Api_Key
) => {
  setLoader(true);
  if (ipAddress) {
    if (!Api_Key) {
      toast.error("API Key is not valid!");
    } else {
      const res = await get(
        `user/getWithIp?ip=${ipAddress}&api_key=${Api_Key}`
      );
      if (res?.data?.status) {
        setSenderData(res.data.user);
        setProjectData(res.data.project);
        setChatData(res.data.chats);
        if (res?.data?.chats?.members.find((val) => val.status == "inactive")) {
          localStorage.setItem("withAgent", false);
        }
        setLoader(true);
      } else if (res?.data?.code == "400") {
        toast.error(res.data.message);
        localStorage.clear();
      } else {
        localStorage.clear();
      }
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
 
 
let data_send = {};

// Function to handle contact creation
export const createContact = async (
  e, 
  formData,
  setIpAddress,
  setChatAgent,
  setChatContinue,
  setRatingBox
) => {
  console.log(formData,'createContact')
  let auth_access_token = localStorage.getItem("auth_access_token"); 
  let locationId = localStorage.getItem("locationId");
  const contact_teset = {
    firstName: formData.first_name,
    lastName: formData.last_name,
    email: formData.email,
    locationId: locationId
  };
  console.log(auth_access_token,'auth_access_tokenauth_access_tokenauth_access_token')

  const headers = {
    Authorization: `Bearer ${auth_access_token}`,
  };

  const response = await axios.post(`${process.env.WEB_API_URL}/crm_data/Add_Contact`, contact_teset , {headers});
  

  console.log(response,'Add_ContactAdd_ContactAdd_Contact') 
  let email = localStorage.getItem("email");


  if (response?.status === 200) {
    localStorage.setItem("ContactId", response?.data?.data?.contact?.id);
    data_send = {
      email: email,
      contactId: response?.data?.data?.contact?.id,
    };
    toast.success(response?.data?.message);
    await user_created(
      e, 
      formData,
      setIpAddress,
      setChatAgent,
      setChatContinue,
      setRatingBox
    );
  } else {
    toast.error(response?.data?.message);
  }
};
const RefreshAccessToken = async ( e, 
  formData,
  setIpAddress,
  setChatAgent,
  setChatContinue,
  setRatingBox,) => {
    console.log(formData,'rrfresh')
  const email = localStorage.getItem("email");
  const refresh_token = localStorage.getItem("refersh_auth_token"); 
  let client_id = localStorage.getItem("client_id");
  let client_secret = localStorage.getItem("client_secret");

  const refreshData = {
    grant_type: "refresh_token",
    refresh_token: refresh_token, 
    client_id: client_id,
    client_secret: client_secret,
  };

  const response = await post("crm_data/Access_token", refreshData);
  console.log(response?.data?.data?.refresh_token,'refresh wala chlra hai')
  if (response?.status === 200) {
    const updatedDa = {
      email: email,
      auth_access_token: response?.data?.data?.access_token,
      refersh_auth_token: response?.data?.data?.refresh_token,
      locationId: response?.data?.data?.locationId,
      companyId: response?.data?.data?.companyId, 
    };
    
    
    const update_de = await post("crm_data/refresh_token_save", updatedDa);
    console.log(update_de,'update_details')
    if (update_de?.status === 200) { 
      let api_key = localStorage.getItem("apikey");

      if (api_key) {
        await user_crm_details(
          e, 
          formData,
          setIpAddress,
          setChatAgent,
          setChatContinue,
          setRatingBox,
          api_key
        );
      }
    }

    toast.success(response?.data?.message);
  } else {
    toast.error(response?.data?.message);
  }
};

// Function to handle access token and CRM details
const Access_token = async ( e,
  formData,
  setIpAddress,
  setChatAgent,
  setChatContinue,
  setRatingBox) => {
    console.log(formData,'access token') 
  let code = localStorage.getItem("code");
  let client_id = localStorage.getItem("client_id");
  let client_secret = localStorage.getItem("client_secret"); 


  const acess_test = {
    code: code,
    grant_type: "authorization_code",
    refresh_token: "",
    client_id: client_id,
    client_secret: client_secret,
  };

  const response = await post("crm_data/Access_token", acess_test);
console.log(response,'first access token')
  if (response?.status === 200) {
    let email = localStorage.getItem("email");
console.log(email,'=-=-=-=-=-')
    const updatedData = {
      email: email,
      auth_access_token: response?.data?.data?.access_token,
      refersh_auth_token: response?.data?.data?.refresh_token,
      locationId: response?.data?.data?.locationId,
      companyId: response?.data?.data?.companyId, 
    };

    const update_details = await post("crm_data/acess_token_save", updatedData);
console.log(update_details,'update_detailssdsd')
    if (update_details?.status === 200) {
      let api_key = localStorage.getItem("apikey");
      if (api_key) {
        await user_crm_details(
          e, 
          formData,
          setIpAddress,
          setChatAgent,
          setChatContinue,
          setRatingBox,
          api_key 
        );
      }
    }

    toast.success(response?.data?.message);
  } else {
    console.log('else cond')
    await RefreshAccessToken( e, 
      formData,
      setIpAddress,
      setChatAgent,
      setChatContinue,
      setRatingBox,
      );
  }
};

const user_crm_details = async (
  e, 
  formData,
  setIpAddress,
  setChatAgent,
  setChatContinue,
  setRatingBox,
  api_key
) => {
  console.log(formData,'user_crm')
  const response = await get(`crm_data/find_project_id?api_key=${api_key}`);

  if (response?.status === 200) {
    localStorage.setItem("auth_access_token", response?.data?.auth_access_token);
    localStorage.setItem(
      "refersh_auth_token",
      response?.data?.refersh_auth_token
    );
    localStorage.setItem("locationId", response?.data?.locationId);
    localStorage.setItem("redirect_uri", response?.data?.redirect_uri);
     let api_ky = localStorage.getItem("apikey");
    if (api_ky) {
      const response = await get(`crm_data/find_project_id?api_key=${api_ky}`);
      if (response?.status == 200) {
        await createContact(
          e, 
          formData,
          setIpAddress,
          setChatAgent,
          setChatContinue,
          setRatingBox
        );
      }
    }
  }
};

const user_created = async (
  e, 
  formData,
  setIpAddress,
  setChatAgent,
  setChatContinue,
  setRatingBox
) => {
  const urlParams = new URLSearchParams(window.location.search);
  const Api_Key = urlParams.get("api_key");
  let ipAdd = localStorage.getItem("ipAddress");

  if (!ipAdd) {
    ipAdd = uuidv4();
  }

  if (ipAdd && Api_Key) {
    const res = await post("user/createUser", {
      ...formData,
      ip: ipAdd,
      api_key: Api_Key,
    });

    if (res && res.status === 200) {
      console.log(data_send,'data_senddata_send')
       await post("crm_data/contact_save", data_send);
      localStorage.setItem("ipAddress", ipAdd); 
      setIpAddress(ipAdd)   //error occurs
      setChatAgent(false)
      setRatingBox(false)
      setChatContinue(true)
      await crm_conversation();
    } else {
      toast.error(res?.data?.message);
    }
  } else {
    toast.error("API key is invalid");
  }
};
// ... Previous code ...

const crm_conversation = async () => {
  let contact_id = localStorage.getItem("ContactId");
  let refersh_auth_token = localStorage.getItem("auth_access_token");
  let locationId = localStorage.getItem("locationId");

  const test = {
    locationId: locationId ? locationId : "",
    contactId: contact_id ? contact_id : "",
  };

  const headers = {
    Authorization: `Bearer ${refersh_auth_token}`,
  };

  const response = await axios.post(
    `${process.env.WEB_API_URL}/crm_data/create_conversation`,
    test,
    { headers }
  );

  if (response?.status === 200) {
    toast.success(response?.data?.message);
  } else {
    toast.error(response?.message);
  }
};

export const handleFormClick = async (
  e,
  isValid,
  formData,
  setIpAddress,
  setChatAgent,
  setChatContinue,
  setRatingBox
) => {
  console.log(formData,'formDataformDataformData')
  if (isValid) {
    await Access_token(
      e,
      formData,
      setIpAddress,
      setChatAgent,
      setChatContinue,
      setRatingBox
    );
  }
};
