
import io from "socket.io-client"

import Config from "../src/Config"
export const socket = io(Config.API_BASE_URL+'/', {
    autoConnect: false
});