const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");
const axios = require('axios');
const http = require('http')


const app = express();
const hbs = exphbs.create({ helpers });
const PORT = process.env.PORT || 3001;
const server = http.createServer(app)

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const io = require('socket.io')(server, {cors:{origin:"*"}});

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
app.use(express.static('public'));

// turns on routes
app.use(routes);

app.get('/', (req, res) => {
    // render your index.handblars
})

app.get('/policy', (req, res) => {
    // render your contact.handlebars
})

app.get('/livechat', (req, res) => {
    // render your contact.handlebars
})

app.get('/homepage', (req, res) => {
    // render your contact.handlebars
})

// // turns on connection to database and server
// sequelize.sync({ force: true }).then(() => {
//     app.listen(PORT, () => console.log("Now listening"));
// });

// turns on connection to database and server
sequelize.sync({ force: true }).then(() => {
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

var clients = 0;

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


io.on('connection', function(socket){
   clients++;
   socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
   socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'});
   socket.on('disconnect', function () {
      clients--;
      socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'});
   });

    socket.on('livechat', function (data) {
        io.sockets.emit('livechat', data);
     });
});

