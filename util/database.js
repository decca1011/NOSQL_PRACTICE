require('dotenv').config();

const mongodb = require('mongodb');

 const  MongoClient = mongodb.MongoClient;

let _db;
 const mongoConnect = (callback) => {

  MongoClient.connect(`mongodb+srv://${process.env.DATABASE_EMAIL}:${process.env.DATABASE_PASSWORD}@cluster0.psuxcmr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(client => {
    console.log('Connected')
    _db= client.db("test");
    callback();
   })
   .catch(err =>{
    console.log(err)
   });
 };

 const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'no databse found'
 }


 exports.mongoConnect = mongoConnect;
 exports.getDb = getDb;
