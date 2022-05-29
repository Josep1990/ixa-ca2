require("dotenv").config();  //load all the env varialbes on the serve
//all the varibles and dependencies required to run the app
const express  = require("express"), //express is a back end web application framework for Node.js
      app      = express()
      mongoose = require("mongoose"), //Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js
      passportLocalMongoose = require("passport-local-mongoose"),
      localStrategy         = require("passport-local"),
      passport              = require("passport"),
      methodOverride        = require("method-override"),
      bodyParser            = require("body-parser"),
      flash                 = require("connect-flash");

 //===========================================================================================
 const User                = require("./models/user"),     
       autenticationRoutes = require("./routes/user"),
       userMoviesRoute     = require("./routes/userMovies"),
       movieRoute          = require("./routes/movies"); //importing the routes into the server

 
 //===========================END=============================================================

mongoose.connect(process.env.DATABASE_URL_PROD, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console.log('Database Connected'))
.catch((err) => console.log(err));
     
app.use(bodyParser.urlencoded({extended: true})); //get data from the form
app.use(methodOverride("_method"));      
app.use(express.static(__dirname + "/public")); // tell express to use the static files under public directory in this case css
app.set("view engine", "ejs"); // EJS or Embedded Javascript Templating is a templating engine used by Node.js.
app.use(flash());

//                            PASSPORT SET UP
app.use(require("express-session")({
    secret: "Secret that I do not know",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); // come from passpor local mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});



app.use(autenticationRoutes);
app.use("/", movieRoute);
app.use("/index", userMoviesRoute);

      
app.listen(process.env.PORT || 3000, ()=>{ //server start on port 3000 
    console.log("Server ON!!!");
})