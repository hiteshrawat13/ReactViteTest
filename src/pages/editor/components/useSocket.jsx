import React, { useEffect, useState } from 'react'

import { socket } from '../../../socket'
const useSocket = () => {


    const [socketConnected, setsocketConnected] = useState(socket.connected);
    const [socketSessionId, setSocketSessionId] = useState(Math.random().toString(36).substr(2, 9))
    const [socketId, setSocketId] = useState(null)
    const [socketUploadProgress, setSocketUploadProgress] = useState(null)

    
    useEffect(() => {
        function onConnect(e) {
            console.log("onConnected", e);
            setsocketConnected(true);
        }

        function onDisconnect(e) {
            console.log("onDisconnected", e);
            setsocketConnected(false);
            
        }

        function onFooEvent(value) {
            console.log("ON FOO", value);
            setSocketId(value.id)
            console.log("Socket ON Foo",value);
        }

        function onUploadProgress(value) {
            setSocketUploadProgress(value)
            console.log("Socket OnUploadProgress",value);
            
        }
        function onError(){
            socket.socket.reconnect();
        }


        


        if (socketConnected == false) {
            socket.connect();
            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);
            socket.on('error',onError);
            socket.on('foo', onFooEvent);
            socket.on("uploadProgress", (value) => onUploadProgress(value))
            socket.emit('connectInit', socketSessionId);
        }

        return () => {
            console.log("disconnected");
            socket?.disconnect();
        }

    }, [socket])


    return {
        socketConnected,
        socketSessionId,
        socketId,
        socketUploadProgress
    }
}

export default useSocket