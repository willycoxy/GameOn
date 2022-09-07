const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");

//add on 
const http = require('http');

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);


const io = require('socket.io')(server, {cors:{origin:"*"}});

const hbs = exphbs.create({ helpers });

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
    secret: "Game on!",
    cookie: {}, 
    resave: false, 
    saveUninitialized: true, 
    store: new SequelizeStore({
        db: sequelize
    })

};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));

// turns on routes
app.use(routes);

// turns on connection to database and server
sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () =>{
        console.log(`\n##############################################################`);
        console.log(`Server side Now listening on port number  ${PORT}`);
        console.log(`\n##############################################################`);
    });
});

server.on("connection", (socket) => {
    // send a message to the client
    socket.on('message',(data) => {
    
        
        socket.emit("message2",data);
});
  
        // send a message to the client
        socket.emit("message",console.log(JSON.stringify({
            type: "hello from server",
            content: [ 1, "2" ]
          })));

   socket.emit("message", console.log("Server is on and Welcome to Game On"));
   
});


const sportGameRooms = ["Game On Room", "Sport Room"];

io.of("/chatroom").on('connection', (socket) => {
   
    console.log(`Server side using  - Socket Id: ${socket.id}`);
    socket.emit("welcome", "Welcome you are connected to the back end -Socket ID#:"+socket.id+"\n"); 
    
    socket.emit("testing",`You are using  the socket id #${socket.id}`);
    socket.emit('testing', `Socket id# ${socket.id} and his first two caracters : ${socket.id.substr(0,2)}\n` ); 

    socket.on("joinRoom", (room) => {
        
        if(sportGameRooms.includes(room)){
        socket.join(room);
        io.of("/chatroom").in(room).emit("newUser", "New Player ID: "+socket.id +" has join the " + room);
        return socket.emit("success", "You have succesfully joined "+ room + " room");
        } else{
            return socket.emit("err", "Error no Room named ");
        }

    });

    
});

server.on("connection", (socket) => {

    
    // send a message to the client
    socket.emit(JSON.stringify({
      type: "hello from server",
      content: [ 1, "2" ]
    }));
  
    // receive a message from the client
    socket.on("message", (data) => {
      const packet = JSON.parse(data);
  
      switch (packet.type) {
        case "hello from client":
          // ...
          break;
      }
    });
  });

  var clients = 0;
  // roomName
const roomLive = "roomLiveChat";

  io.on('connection', function(socket){

socket.join(roomLive);

     clients++;
     socket.broadcast.to(roomLive).emit('newclientconnect',{ description: clients + ' clients connected!'});
     socket.on('disconnect', function () {
        clients--;
        socket.broadcast.to(roomLive).emit('newclientconnect',{ description: clients + ' clients connected!'});
     });
  
      socket.on('livechat', function (data) {
        
        socket.broadcast.to(roomLive).emit('livechat', data);
       });
  });








