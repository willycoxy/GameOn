const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");

//add on 
const http = require('http');
const formatMessage = require("./utils/messages");
const { SocketAddress } = require("net");


const PORT = process.env.PORT || 3000;

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
sequelize.sync({ force: true }).then(() => {
    server.listen(PORT, () =>{
        console.log(`\n##############################################################`);
        console.log(`Server side Now listening on port number  ${PORT}`);
        console.log(`\n##############################################################`);
    });
});


server.on("connection", (socket) => {
    // send a message to the client


   socket.emit("message", console.log("Server is on and Welcome to Game On"));
   // console.log (socket.emit("message", formatMessage(socket, "Welcome to ChatCord!")));

});


const sportGameRooms = ["Game On Room", "Sport Room"];

io.of("/chatroom").on('connection', (socket) => {
   
    console.log(`Server side using  - Socket Id: ${socket.id}`);
    socket.emit("welcome", "Welcome you are connected back end -Socket ID#:"+socket.id+"\n"); 
    socket.emit("testing",`You are the socket id that you are using #${socket.id}`);
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

module.exports  = PORT;
