import { io } from "socket.io-client";
const socket = io("https://backend-titulo.onrender.com", {
  query: {
    key: "aaaa1111",
  },
});

/* socket.on("connect", () => {
  //console.log("connected to server " + socket.id);
});
socket.on("disconnect", () => {
  //console.log("disconnect to the server " + socket.id);
}); */

export default socket;
