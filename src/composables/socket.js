import { io } from "socket.io-client";
const socket = io(process.env.MY_API_REST);

/*  socket.on("connect", () => {
  //console.log("connected to server " + socket.id);
});
socket.on("disconnect", () => {
  //console.log("disconnect to the server " + socket.id);
}); */

export default socket;
