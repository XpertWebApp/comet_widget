import { ChatUser } from '@/assets/icon'
import moment from 'moment'
import { Typewriter } from 'react-simple-typewriter'
import WelComeMessage from './welcomeMessage'
import ChatBoatIcon from "../../assets/img/chatboat-icon.png";
import Image from 'next/image';
const UserChat = ({ val, projectData, setNewMessage ,withAgentSatus }) => {
  return (
    <>
      {val?.sender == 'member' ||
      val?.sender == 'bot' ||
      val?.sender == 'admin' ? (
        <>
          <li className={val?.type == 'message' ? 'reply' : 'request'}>
            <div className='chat-reply-field'>
            <div
              className="chat-field"
              style={{
                borderColor: projectData?.text_container,
              }}
            >
              <p style={{ color: projectData?.text_color }}>
                {val._id ? (
                  <>{val?.message}</>
                ) : (
                  <Typewriter
                    words={[val?.message]}
                    typeSpeed={3}
                    delaySpeed={5}
                  />
                )}
              </p>
              {val?.type == 'message' && (
                <span className="time">
                  {moment(val.createdAt).format('HH:mm A')}
                </span>
              )}
            </div>
            <span className="user-icon">
                <Image src={ChatBoatIcon} alt='icon'/>
            </span>
                </div>
          </li>
        </>
      ) : (
        ''
      )}
      {val?.sender == 'user' ? (
        <li className="sender">
           <div className='chat-user-field'>
           <span className="user-icon">
              <ChatUser />
            </span>
          <div
            className="chat-field"
            style={{
              borderColor: projectData?.user_text_container,
            }}
          >
           
          
            <div className="chating">
              <p
                style={{
                  color: projectData?.text_color,
                }}
              >
                {val._id ? (
                  <>{val?.message}</>
                ) : (
                  <Typewriter
                    words={[val?.message]}
                    typeSpeed={3}
                    delaySpeed={5}
                  />
                )}
              </p>
              <span className="time">
                {moment(val.createdAt).format('HH:mm A')}
              </span>
            </div>
            </div>
          </div>
        </li>
      ) : (
        ''
      )}
    </>
  )
}
export default UserChat
