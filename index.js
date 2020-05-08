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
    collection.find().toArray((err,documents) =>{
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
app.get('/product/:key',(req,res)=>{
  const key = req.params.key;


  MongoClient.connect(uri, function(err, client) {
    const collection = client.db("onlineStore").collection("products");
    collection.find({key}).toArray((err,documents) =>{
          if(err){
            console.log(err)
          }
          else{
            res.send(documents[0]);
        
          }
          
         })
    client.close();
  });
  
});



app.post('/getProductsByKey',(req,res)=>{
  const key = req.params.key;
  const productKeys = req.body;

  MongoClient.connect(uri, function(err, client) {
    const collection = client.db("onlineStore").collection("products");
    collection.find({key: {$in : productKeys}}).toArray((err,documents) =>{
          if(err){
            console.log(err)
          }
          else{
            res.send(documents);
        
          }
          
         })
    client.close();
  });
  
});

//post
app.post('/addProduct',(req,res)=>{
  const product = req.body;
 

  MongoClient.connect(uri, function(err, client) {
    const collection = client.db("onlineStore").collection("products");
    collection.insert(product,(err,result) =>{
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
app.post('/placeOrder',(req,res)=>{
  const orderDetails = req.body;
 orderDetails.orderTime = new Date();


  MongoClient.connect(uri, function(err, client) {
    const collection = client.db("onlineStore").collection("orders");
    collection.insertOne(orderDetails,(err,result) =>{
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