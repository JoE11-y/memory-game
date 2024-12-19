"use client"

import { useAccessToken } from '@/hooks/useAccessToken';
import { createContext, ReactNode, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const url = "http:localhost:3000"

export const SocketContext = createContext<{ socket: Socket | null }>({
  socket: null
})

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAccessToken();
  const socket = io(url, {
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
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}