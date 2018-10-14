var express= require("express"); // importing the express library.

var http= require("http"); // importing http.

var app= express();// an instance of Express.

var server=http.Server(app)

var io=require("socket.io")(server);// importing socket.io and it  requires a http server.

var users=[];// a list of users
server.listen(2135);

app.get("/",function(req,res){
  res.sendFile(__dirname+ "/index.html");
});

app.get("/styles/index.css",function(req,res){
  res.sendFile(__dirname+ "/styles/index.css");
});

io.on("connection",function(socket){
   //  console.log("A user has connected");
        var name="";// this variable is different for different sockets.
      //  Each socket will haw a variable name.
      socket.on("has connected",function(username){
        name=username;
        users.push(username);
        io.emit("has connected",{username:username,userlist:users});
        //console.log(username);
      });

      socket.on("disconnect",function(){
        users.splice(users.indexOf(name),1);
        io.emit("has disconnected",{username:name, userlist:users});
      //  console.log("A user has disconnected");
      });

      socket.on("new message", function(data){
        io.emit("new message", data);
      });
});
