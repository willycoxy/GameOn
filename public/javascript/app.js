
socket.on("welcome", (data) => {
    console.log("User connected with Socket Id"+ socket.id+ " to Front End: \n "+data);
});

socket.on("testing",(res) => console.log(res));

socket.emit("joinRoom","Sport Room"); 

socket.on("newUser", (res) => console.log(res));

socket.on("err", (err) => console.log(err));

socket.on("success", (res) => console.log(res));












