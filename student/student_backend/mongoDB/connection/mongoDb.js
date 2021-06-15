const mongoose = require("mongoose");

//const db = "mongodb://localhost:27017/SDP";
const db="mongodb+srv://admin:wld564R4n3cbmWdC@cluster0.xmguo.mongodb.net/EmailSystem?retryWrites=true&w=majority";
// const db="mongodb+srv://Parth:4dRwBQis!8hmKzj@sdpproject.gxbk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const conn = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var d = mongoose.connection;
d.once("open", () => console.log("db opened"));

module.exports = conn;
