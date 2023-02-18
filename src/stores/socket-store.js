import { io } from "socket.io-client";
const socket = io("http://localhost:3000", {
  query: {
    key: "aaaa1111",
  },
});

socket.on("connect", () => {
  //console.log("connected to server " + socket.id);
});
socket.on("disconnect", () => {
  //console.log("disconnect to the server " + socket.id);
});

export default socket;
