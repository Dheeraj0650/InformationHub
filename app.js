require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
var cors = require('cors');
var fetch = require("cross-fetch");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://information-hub-app.herokuapp.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});;
app.use(cors());

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb+srv://dheeraj0650:" + process.env.PASSWORD + "@cluster0.vejhn.mongodb.net/InformationHub", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('open', function() {
  console.log('Connected to mongo server.');
  const changeStream = mongoose.connection.collection('realtimetextcards').watch();
  changeStream.on('change',(change) => {
      io.emit("changes-in-card",'');
  })
});


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  team:[String]
});

const realtimeCardSchema = new mongoose.Schema({
  name: String,
  title: String,
  priority: String,
  comment: String,
  team:String
});


userSchema.index({
  "email": 1
}, {
  sparse: true
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
const RealtimeTextCard = mongoose.model("RealtimeTextCard",realtimeCardSchema);

io.on("connection", function(socket){
  socket.on("added-new-card",function(data){
    var details = JSON.parse(data);
    const realtimeTextCard = new RealtimeTextCard({
      name: details.name,
      title: details.title,
      priority: details.priority,
      comment: details.comment,
      team:details.team
    });
    if(details.priority && details.comment){
      realtimeTextCard.save();
    }
    io.emit("changes-in-card",data);
  })
})

app.post("/realtimeCards", function(req, res) {
  User.find({username:req.body.username},function(err,docs){
    if(docs[0].team.includes(req.body.team)){
      RealtimeTextCard.find({team:req.body.team},
        function (err, docs) {
          res.send(JSON.stringify(docs));
        }
      );
    }
  });
})


passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post("/register", function(req, res) {
  User.register({
    username: req.body.username,
    email:req.body.email.toLowerCase()
  }, req.body.password, function(err, user) {
    if (err) {
      res.send(err.message);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.send("Successful");
      });
    }
  });
});

// app.get("/", function(req, res) {
//   res.send(false);
// });

app.get("/isLoggedIn", function(req, res) {
  res.send(req.isAuthenticated());
});

app.post("/login", function(req, res) {
  const user = new User({
    password: req.body.password,
    username: req.body.username,
  });
  req.login(user, function(err) {
    if (err) {
      res.send(err.message);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.send("Successful");

      });
    }
  });
});

app.get("/logout", function(req, res) {
  req.logout();
  res.send("Successful");
});

app.post("/Weather", function(req, res) {
  var formBody = [];
  var details = req.body;
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody.push('appid' + "=" + "e98e494d2485a6f10a35f567bdd96e42");
  formBody = formBody.join("&");
  fetch('https://api.openweathermap.org/data/2.5/onecall?' + formBody,{
    method: 'GET',
  })
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var data = JSON.stringify(data);
    res.send(data);
  })
  .catch(err => {
  	console.error(err);
  });
});

app.post("/WeatherByCityName", function(req, res) {
  var formBody = [];
  var details = req.body;
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody.push('appid' + "=" + "e98e494d2485a6f10a35f567bdd96e42");
  formBody = formBody.join("&");
  fetch('https://api.openweathermap.org/data/2.5/weather?' + formBody,{
    method: 'GET',
  })
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var data = JSON.stringify(data);
    res.send(data);
  })
  .catch(err => {
  	console.error(err);
  });
});

app.post("/box/city", function(req, res) {
  var formBody = [];
  var details = req.body;
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody.push('appid' + "=" + "e98e494d2485a6f10a35f567bdd96e42");
  formBody = formBody.join("&");
  fetch('https://api.openweathermap.org/data/2.5/box/city?' + formBody,{
    method: 'GET',
  })
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var data = JSON.stringify(data);
    res.send(data);
  })
  .catch(err => {
  	console.error(err);
  });
});

app.post("/air_pollution", function(req, res) {
  var formBody = [];
  var details = req.body;
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody.push('appid' + "=" + "e98e494d2485a6f10a35f567bdd96e42");
  formBody = formBody.join("&");
  fetch('https://api.openweathermap.org/data/2.5/air_pollution?' + formBody,{
    method: 'GET',
  })
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var data = JSON.stringify(data);
    res.send(data);
  })
  .catch(err => {
  	console.error(err);
  });
});

app.post("/air_pollution/forecast", function(req, res) {
  var formBody = [];
  var details = req.body;
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody.push('appid' + "=" + "e98e494d2485a6f10a35f567bdd96e42");
  formBody = formBody.join("&");
  fetch('https://api.openweathermap.org/data/2.5/air_pollution/forecast?' + formBody,{
    method: 'GET',
  })
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var data = JSON.stringify(data);
    res.send(data);
  })
  .catch(err => {
  	console.error(err);
  });
});

app.post("/air_pollution/history", function(req, res) {
  var formBody = [];
  var details = req.body;
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody.push('appid' + "=" + "e98e494d2485a6f10a35f567bdd96e42");
  formBody = formBody.join("&");
  fetch('https://api.openweathermap.org/data/2.5/air_pollution/history?' + formBody,{
    method: 'GET',
  })
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var data = JSON.stringify(data);
    res.send(data);
  })
  .catch(err => {
  	console.error(err);
  });
});

app.post("/geocoding", function(req, res) {
  var formBody = [];
  var details = req.body;
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody.push('appid' + "=" + "e98e494d2485a6f10a35f567bdd96e42");
  formBody = formBody.join("&");
  fetch('http://api.openweathermap.org/geo/1.0/direct?' + formBody,{
    method: 'GET',
  })
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var data = JSON.stringify(data);
    res.send(data);
  })
  .catch(err => {
  	console.error(err);
  });
});

app.post("/ZipCode", function(req, res) {
  var formBody = [];
  var details = req.body;
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody.push('appid' + "=" + "e98e494d2485a6f10a35f567bdd96e42");
  formBody = formBody.join("&");
  fetch('http://api.openweathermap.org/geo/1.0/zip?' + formBody,{
    method: 'GET',
  })
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var data = JSON.stringify(data);
    res.send(data);
  })
  .catch(err => {
  	console.error(err);
  });
});

app.post("/movies/:method", function(req, res) {
  var formBody = [];
  var details = req.body;
  if(req.params.method === "Search"){
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody.push('api_key' + "=" + "cb261bed9d6fb20d553f67a15b21840e");
      formBody = formBody.join("&");
      fetch('https://api.themoviedb.org/3/search/movie?' + formBody,{
        method: 'GET',
      })
      .then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data) {
        var data = JSON.stringify(data);
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
  }
  else if(req.params.method === "Trending"){
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody.push('api_key' + "=" + "cb261bed9d6fb20d553f67a15b21840e");
      formBody = formBody.join("&");
      fetch('https://api.themoviedb.org/3/trending/all/week?' + formBody,{
        method: 'GET',
      })
      .then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data) {
        var data = JSON.stringify(data);
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
  }
  else if(req.params.method === "People"){
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody.push('api_key' + "=" + "cb261bed9d6fb20d553f67a15b21840e");
      formBody = formBody.join("&");
      fetch('https://api.themoviedb.org/3/search/person?' + formBody,{
        method: 'GET',
      })
      .then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data) {
        var data = JSON.stringify(data);
        res.send(data);
      })
      .catch(err => {
        console.error(err);
      });
  }
});

app.post("/find", function(req, res) {
  var formBody = [];
  var details = req.body;
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody.push('appid' + "=" + "e98e494d2485a6f10a35f567bdd96e42");
  formBody = formBody.join("&");
  fetch('https://api.openweathermap.org/data/2.5/find?' + formBody,{
    method: 'GET',
  })
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    var data = JSON.stringify(data);
    res.send(data);
  })
  .catch(err => {
  	console.error(err);
  });
});

if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'));
  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}
app.listen(port, function() {
  console.log("Server started");
});

server.listen(8000, function() {
  console.log("Server started");
});
