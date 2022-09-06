const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");
const axios = require('axios');


const app = express();
const hbs = exphbs.create({ helpers });
const PORT = process.env.PORT || 3001;

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
app.use(express.static('public'));

// turns on routes
app.use(routes);

app.get('/', (req, res) => {
    // render your index.handblars
})

app.get('/policy', (req, res) => {
    // render your contact.handlebars
})

app.get('/chatroom', (req, res) => {
    // render your contact.handlebars
})

app.get('/homepage', (req, res) => {
    // render your contact.handlebars
})

// turns on connection to database and server
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});