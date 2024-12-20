"use client";

import { SocketContext } from "@/context/socketContext";
import React, { useContext } from "react";
import { Socket } from "socket.io-client";

export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return { socket } as { socket: Socket };
};
