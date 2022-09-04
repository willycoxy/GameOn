const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");

//add on 
const http = require('http');

const PORT = process.env.PORT || 3071;

const app = express();
const server = http.createServer(app);


const io = require('socket.io')(server, {cors:{origin:"*"}});

io.on('connection', (socket) => {
    console.log("User connected Socket Id:" +socket.id);
});





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

/*
io.on("connection", (socket) => {
    // send a message to the client
    console.log("Hello socket IO  on");
});
*/

// turns on connection to database and server
sequelize.sync({ force: true }).then(() => {
    server.listen(PORT, () => console.log("Now listening"));
});


server.on("connection", (socket) => {
    // send a message to the client
    console.log("Hello server on");
    console.log(socket.on.name);
    socket.on('message', (data) =>{ 
        console.log("Message Socket man" + socket.broadcast('message',data));
    });
   
});

