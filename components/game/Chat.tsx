import { useAccessToken } from '@/hooks/useAccessToken';
import { Message } from '@/interfaces';
import { useGetProfileQuery } from '@/redux-services/auth.service';
import React, { Fragment, useState } from 'react'
import { IoMdChatboxes } from 'react-icons/io'
import { Avatar, Button, Form, Input, Space } from 'antd';
import moment from 'moment';
import { SendOutlined } from '@ant-design/icons';
import { IoCloseCircleSharp } from 'react-icons/io5';

const messageEx: Message[] = [
  {
    id: "test",
    text: "Hello mate",
    timestamp: '2023-01-23',
    userId: 'babolrus'
  },
  {
    id: "test2",
    text: "Hi Joe",
    timestamp: '2023-01-24',
    userId: 'babol'
  },
  {
    id: "test3",
    text: "Hello mate",
    timestamp: '2023-01-25',
    userId: 'babolrus'
  },
  {
    id: "test4",
    text: "Hi Joe",
    timestamp: '2023-01-26',
    userId: 'babol'
  },
  {
    id: "test5",
    text: "Hi Joe",
    timestamp: '2023-01-27',
    userId: 'babol'
  }
]
const Chat = () => {
  const { accessToken } = useAccessToken();
  // const { data, isLoading, refetch } = useGetProfileQuery({ accessToken })/
  const data = {
    data: {
      id: 'babol'
    }
  }
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(messageEx)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleSend = () => {
    console.log(message)
  }

  return (
    <div className='flex items-end justify-end z-10'>
      {!open ?
        <IoMdChatboxes className='w-6 h-6' color='#F2994A' onClick={toggleDrawer} />
        :
        <div className={`z-12 bg-transparent`}>
          <div className='flex items-end justify-end cursor-pointer mb-2'>
            <IoCloseCircleSharp size={25} onClick={toggleDrawer} />
          </div>
          <div className='overflow-y-auto h-28'>
            <Fragment>
              {messages.map((messageItem) => {
                const { id, text, timestamp, userId } = messageItem;
                return (
                  <div
                    style={{ borderBottom: "1px solid #d1d8e0" }}
                    className="d-flex flex-column"
                    key={id}
                  >
                    <div className="d-flex w-100 justify-content-start px-2 py-1">
                      {data?.data.id == userId && (
                        <Fragment>
                          <div className="mt-2 ml-auto px-2 text-right">
                            <p className="my-auto">{"you"}</p>
                            <p className="my-auto text-right">{text}</p>
                            <small className='text-[10px]'>
                              {moment(timestamp).format('LT')}
                            </small>
                          </div>
                        </Fragment>
                      )}
                      {data?.data.id != userId && (
                        <Fragment>
                          <div className="mt-2 flex gap-2">
                            <Avatar style={{ backgroundColor: 'blue', verticalAlign: 'middle' }} size='small'>
                              {userId && userId.charAt(0)}
                            </Avatar>
                            <p className="my-auto font-semibold text-sm">{userId}</p>
                          </div>
                          <div className="mt-2 mr-auto px-2 text-left">
                            <p className="my-auto text-left">{text}</p>
                            <small className='text-[10px]'>
                              {moment(timestamp).format('LT')}
                            </small>
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                );
              })}
            </Fragment>
          </div>
          <Space.Compact className='w-full mt-2'>
            <Input
              type='text'
              value={message}
              placeholder='Enter Message'
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleSend}
            />
            <Button type="primary" onClick={handleSend}><SendOutlined
              style={{
                fontSize: 14,
              }}
            /></Button>
          </Space.Compact>
        </div>
      }
    </div>
  )
}

export default Chat
