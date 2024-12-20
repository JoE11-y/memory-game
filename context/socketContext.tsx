"use client"

import { useAccessToken } from '@/hooks/useAccessToken';
import config from '@/utils/config';
import { createContext, ReactNode, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext = createContext<{ socket: Socket | null }>({
  socket: null
})

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAccessToken();
  const socket = io(config.SERVER_URL, {
    transports: ['polling', 'websocket'],
    auth: { token: `Bearer ${accessToken}` },
    autoConnect: true,
    extraHeaders: {
      authorization: `Bearer ${accessToken}`
    }
  })

  useEffect(() => {
    socket.on("errors", (data) => {
      console.log(data?.message)
    })
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}