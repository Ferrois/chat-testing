const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http,{
    cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        allowedHeaders:["secretHeader"],
        credentials: true
      }
    }
);  

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

io.on("connection", socket => {
    console.log("user connected");
    socket.on("message",({name,message}) => {
        console.log("received");
        io.emit("message", {name,message});
    })
    socket.on("disconnect", socket => {
        console.log("DISCONNECTED :(")
    })
    
})


// io.on("disconnect", function(socket){
//     console.log("DISCONNECTED :(")
// })

http.listen(4000,function(){
    console.log("listening on port 4000")
})