require ('dotenv').config()

const express =require('express')
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
const cookieParser=require('cookie-parser')
const fileUpload = require('express-fileupload')
const db= require('../backend/connection/connection')
const dotenv=require('dotenv')
const { Server } = require('socket.io')
dotenv.config({path:"config.env"})
const http=require("http")

const PORT =process.env.PORT
app.use(cors())
// const adminRouter =require("./routes/adminRouter")
// const userRouter = require("./routes/userRouter")
// const adminRoute =require("./routes/adminRouter")
let server = http.createServer(app);
let io = require('socket.io')(server)

 io = new Server(server, {
  cors: {
    origin: "http://localhost:4000/",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});





app.use (express.json())

app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))


app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}))
// app.use("/user",userRouter)
// app.use("/admin",adminRouter)
app.use('/user',require('./routes/userRouter'))
app.use('/expert',require('./routes/expertRouter'))
app.use("/admin",require("./routes/adminRouter"))
app.use('/api',require('./routes/upload'))




// connecte to mongo db
// const URI =process.env.MONGODB_URL

db.connectToDb((err)=>{
    if(!err){     
        app.listen(PORT,()=>{
            console.log(`listening to port ${PORT}`);
   })
    }
})


app.listen(PORT,()=>{
    console.log(`listening To Port`,PORT)
})


// const PORT =process.env.PORT || 4000
// app.listen(PORT,()=>{
//     console.log("server is running ",PORT)
// })