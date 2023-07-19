import { get, post } from '@/pages/api/apis'
import axios from 'axios'
import moment from 'moment'
import toast from 'toastr'
import { v4 as uuidv4 } from 'uuid'

var counter = 0

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
  setError,
) => {
  e.preventDefault()

  if (isMessageValid()) {
    if (chatData?._id) {
      let msg = message
      setMessage('')
      const obj = {
        question: msg,
        history: history,
        project_id: projectData?._id,
        chat_id: chatData?._id,
        user_id: senderData?._id,
        receiver_id: '',
      }
      setLoading(true)
      let obj1 = {
        message: msg,
        createdAt: new Date(),
        sender: 'user',
        type: 'message',
      }
      messages.push(obj1)
      const res = await post('chat/chatWithBot', obj)
      if (res && res.data && res.data.status) {
        const obj2 = {
          createdAt: new Date(),
          sender: 'member',
          type: 'message',
          message: res?.data?.message?.text,
        }
        messages.push(obj2)
        setHistory([...history, [message, res?.data?.message?.text]])
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        setMessages(messages)
        counter++
        if (counter == 5) {
          setRatingBox(true)
          counter = 0
        } else {
          setRatingBox(false)
        }

        setError('')
        setLoading(false)
      } else {
        setLoading(false)
        toast.error(res?.data?.message)
      }
    }
  }
}

export const handleMemberChatSubmit = async (
  e,
  isMessageValid,
  message,
  setMessage,
  chatData,
  senderData,
  messages,
  socketIo,
) => {
  const messTimes = moment(new Date()).format('hh:mm A')
  e.preventDefault()
  if (isMessageValid()) {
    let msg = message
    let obj1 = {
      message: msg,
      sender: 'user',
      type: 'message',
      messaTime: messTimes,
    }
    messages.push(obj1)
    setMessage('')
    const objNew =
      chatData && chatData.members.find((val) => val.status == 'active')
    await socketIo.emit('sendMsg', {
      chat_id: chatData?._id,
      user_id: senderData?._id,
      message: msg,
      type: 'user',
      receiver_id: objNew?.id,
    })
  }
}

export const getIpData = async (
  setLoader,
  ipAddress,
  setSenderData,
  setProjectData,
  setChatData,
  Api_Key,
) => {
  setLoader(true)
  if (ipAddress) {
    if (!Api_Key) {
      toast.error('API Key is not valid!')
    } else {
      const res = await get(`user/getWithIp?ip=${ipAddress}&api_key=${Api_Key}`)
      if (res?.data?.status) {
        setSenderData(res.data.user)
        setProjectData(res.data.project)
        setChatData(res.data.chats)
        console.log(res?.data?.chats, 'res?.data?.chats')
        if (res?.data?.chats?.members.find((val) => val.status == 'inactive')) {
          localStorage.setItem('withAgent', false)
        }
        setLoader(true)
      } else if (res?.data?.code == '400') {
        toast.error(res.data.message)
        localStorage.clear()
      } else {
        localStorage.clear()
      }
    }
  } else {
    setLoader(true)
  }
}

export const handleChange = (e, setError, setFormData, formData, error) => {
  let val = ''
  if (e.target.name == 'email') {
    val = e.target.value.trim()
    setError({
      ...error,
      email: '',
    })
  } else if (e.target.name == 'first_name') {
    val = e.target.value.trimStart()
    setError({
      ...error,
      first_name: '',
    })
  } else {
    val = e.target.value.trimStart()
  }
  setFormData({ ...formData, [e.target.name]: val })
}

export const handleFormClick = async (
  e,
  isValid,
  formData,
  setIpAddress,
  setChatAgent,
  setChatContinue,
  setRatingBox,
) => {
  const urlParams = new URLSearchParams(window.location.search)
  const Api_Key = urlParams.get('api_key')
  if (isValid()) {
    let ipAdd = localStorage.getItem('ipAddress')
    if (!ipAdd) {
      // const res = await axios.get(
      //   `https://api.ipdata.co?api-key=${process.env.IPDATA_KEY}`
      // );
      // ipAdd = res.data.ip;
      ipAdd = uuidv4()
    }
    if (ipAdd) {
      if (!Api_Key) {
        toast.error('API key is invalid')
      } else {
        const res = await post('user/createUser', {
          ...formData,
          ip: ipAdd,
          api_key: Api_Key,
        })
        if (res && res.status == 200) {
          localStorage.setItem('ipAddress', ipAdd)
          setIpAddress(ipAdd)
          setChatAgent(false)
          setRatingBox(false)
          setChatContinue(true)
        } else {
          toast.error(res?.data?.message)
        }
      }
    }
  }
}
