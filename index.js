const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors');

const app = express()
app.use(cors());
app.use(bodyParser.json());

const users = ["asad","saber","javed","kamal"]
app.get('/',(req,res)=>{
    res.send(fruit);
})

app.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    const name = users[id];
    res.send({id,name});
})

//post
app.post('/addUser',(req,res) =>{
   console.log(req.body); 
})


app.listen(3400,()=>console.log('listening to port 3400'));