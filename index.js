const express = require('express')

const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;


const cors = require('cors');
require('dotenv').config();

const app = express()
app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH;




const users = ["asad","saber","javed","kamal"]

app.get('/products',(req,res) =>{
  MongoClient.connect(uri, function(err, client) {
    const collection = client.db("onlineStore").collection("products");
    collection.find({name : 'Laptop'}).limit(10).toArray((err,documents) =>{
          if(err){
            console.log(err)
          }
          else{
            res.send(documents);
        
          }
          
         })
    client.close();
  });
  
})



app.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    const name = users[id];
    res.send({id,name});
})

//post
app.post('/addProduct',(req,res)=>{
  const product = req.body;
 

  MongoClient.connect(uri, function(err, client) {
    const collection = client.db("onlineStore").collection("products");
    collection.insertOne(product,(err,result) =>{
          if(err){
            console.log(err)
          }
          else{
            res.send(result.ops[0]);
          //  res.status(500).send({message:err});
          }
          
         })
    client.close();
  });
  

  
});




const port = process.env.PORT || 3500;

app.listen(port,()=>console.log('listening to port 3500'));