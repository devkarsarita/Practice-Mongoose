// mongoose project
const mongoose = require("mongoose");


// connection creat with mongodb
mongoose.connect("mongodb://localhost:27017/userDB")
.then(()=>console.log("connection successful..."))
.catch((err) => console.log(err));

// Schema
// A Mongoose Schema defines the structure of the document , default values, validators, etc.,

const playlistSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true
  },
  ctype: String,
  learner: String,
  active: Boolean,
  date: {
   type: Date,
   default: Date.now
  }
})

//  A Mongoose model is a wrapper on the Mongoose schema.
// A Mongoose schema defines the structure of the document, default values,
//  validators, etc., whereas a Mongoose model provides an interface to the
//  database for creating, quering, updating , deleting records, etc.

const Playlist = new mongoose.model("Playlist", playlistSchema);   /* Playlist works as class so it is in PascalCase */

// create document or insert
const createDocument = async () => {
try{
const mongoPlaylist = new Playlist ({
  name: "mongoDB",
  ctype: "database",
  learner:"Sarita Devkar",
  active: true
})
const mongoosePlaylist = new Playlist ({
  name: "mongoose",
  ctype: "database",
  learner:"Sarita Devkar",
  active: true
})

const expressPlaylist = new Playlist ({
  name: "Express js",
  ctype: "Backend",
  learner:"Sarita Devkar",
  active: true
})

const reactPlaylist = new Playlist ({
  name: "React js",
  ctype: "Frontend",
  learner:"Sarita Devkar",
  active: true
})

const result = await Playlist.insertMany([mongoPlaylist, mongoosePlaylist, expressPlaylist, reactPlaylist]);
console.log(result);
}catch (err){
  console.log(err);
 }
}

// createDocument();

const getDocument = async () => {
const result = await Playlist
// .find({ctype:{$in : ["Backend", "database"]}})                     /* comparison query operator mongoDB $in */
// .find({$and:[{ctype: "database"},{learner:"Sarita Devkar"}]})      /* logical query operator */
.find({learner: "Sarita Devkar"})
.select({name : 1})
// .count()
.sort("name : 1");                                                    /* 1 means ascending order  and  -1 means descending order*/

console.log(result);

}
getDocument();


