const socket = io("http://localhost:3000");

const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }
  ]
});

const myId = "peerA";
const targetId = "peerB";

// Join signaling server
socket.emit("join", myId);

// 🔥 SEND ICE CANDIDATES
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    console.log("Sending ICE candidate:", event.candidate);

    socket.emit("ice-candidate", {
      target: targetId,
      candidate: event.candidate // contains puplic IP address and so on
    });
  }
};

// 🔥 RECEIVE ICE CANDIDATES
socket.on("ice-candidate", async ({ candidate, from }) => {
  console.log("Received ICE candidate from", from);

  try {
    await peerConnection.addIceCandidate(candidate);
  } catch (err) {
    console.error("Error adding ICE candidate:", err);
  }
});