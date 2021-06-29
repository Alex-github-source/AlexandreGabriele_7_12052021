const express       = require("express");
const cors          = require("cors");
const helmet        = require("helmet");
const path          = require("path");



const { sequelize }    = require("./models/index");

const userRoutes    = require("./routes/user");
const postsRoutes = require('./routes/post');
const comRoutes = require('./routes/comment')

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use("/api/users",userRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/posts',comRoutes);

const dbCon = async ()=>{
  try {
    
  
  await sequelize.authenticate();
   console.log("database connected");
  } catch (error) {
    console.log("Unable to connect");
  }
}
dbCon();



//app.use("/api/comments",    auth, commentRoutes);

module.exports = app