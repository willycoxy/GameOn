
const io =require("socket.io-client");
const PORT = process.env.PORT || 3000;
let socket = io.connect(`http://localhost:${PORT}/chatroom`);

console.log(`\n##############################################################`);
console.log(`Front End side console port number: ${PORT}`);
console.log(`\n##############################################################`);

socket.on("welcome", (data) => {
    
    console.log(`\n***********************************************************************`);
    console.log(`Front-end  client console side using  - Socket Id: ${socket.id} \n ${data} `);
});

socket.on("testing",(res) => console.log(res));

socket.emit("joinRoom","Sport Room"); 

socket.on("newUser", (res) => console.log(res));

socket.on("err", (err) => { console.log(`${err}`);
console.log(`\n***********************************************************************`);
});

socket.on("success", (res) =>{ console.log(`${res}`);
console.log(`\n***********************************************************************`);
});
















// function sendMessage() {
//     let msg = document.getElementById("chat-input").value;
//     console.log("mesage: ", msg);
// }

//const btn = document.getElementById("submitBtn");

//const btn  = document.querySelector('#submitBtn');

//document.querySelector("#chat-form").addEventListener('submit', sendMessage);