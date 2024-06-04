
import io from "socket.io-client"

export const socket = io('http://192.168.28.93:8888/', {
    autoConnect: false
  });