const mongoose = require('mongoose')


mongoose.connect('mongodb://myAtlasDBUser:Sachinmarothia@cluster0-shard-00-00.zwail.mongodb.net:27017,cluster0-shard-00-01.zwail.mongodb.net:27017,cluster0-shard-00-02.zwail.mongodb.net:27017/task?replicaSet=atlas-144xgf-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("connected")
})
.catch(err=>console.log('conenction err',err))


const schema = new mongoose.Schema({
    
    name:String

})
module.exports = mongoose.model('todos',schema)