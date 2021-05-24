const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://FolderHead:FolderHead@cluster0.bd9js.mongodb.net/FolderHead?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("FolderHead").collection("Folder collection");
  // perform actions on the collection object
  console.log("data base connection")

// -------------------------------------------get all data ----------------------

  app.get("/folder",(req,res)=>{
    collection.find({})
    .toArray((err,document)=>{
      res.send(document)
    })
  })

  // -------------------------------------- add Single Folder ---------------

  app.post("/addFlder",(req,res) =>{
    const newFolder = req.body 
    console.log(newFolder)
    collection.insertOne(newFolder)
  })

  // ---------------------------------------- delete folder   ----------

  app.delete("/delete/:childNode",(req,res)=>{
    let child = req.params.childNode.split(',')
    console.log(req.params.childNode)
    console.log(child)
    collection.deleteMany({
      _id: {
          $in: child
      }
  }, function (error, response) {
      // ...
  });
  })


  app.get("/",(req,res)=>{
      res.send("fresh foder")
  })
});

app.listen(process.env.PORT || 5000)