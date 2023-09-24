const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized');
    return callback(null, _db);
  }
  const uri = process.env.mongoConnectString;
  const clientc = new MongoClient(uri);
  clientc.connect()
  .then((client) => {
    _db = client;
    callback(null, _db);
  })
  .catch((err) => {
    callback(err);
  });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
}

module.exports = {
  initDb,
  getDb,
};

// async function main() {

//     const uri = process.env.MongoConnectString;
//     //const uri = "mongodb+srv://00codester:13uddaphr05t@cluster0.61shhz7.mongodb.net/";
//     //console.log(uri);
//     const client = new MongoClient(uri);
//     try{
//       await client.connect();
//       await listDatabases(client);
//     } catch (e){
//       console.error(e);
//     } finally {
//       await client.close();
//     }
    
//   }

//   main().catch(console.error);

  
  
//   async function listDatabases(client){
//     //databasesList = await client.db().admin().listDatabases();
//     //databaseContact = await client.db().admin().getDatabase();
//     const getDataset = await client.db().collection('contacts').find();
//     getDataset.toArray().then((lists) =>{
//       console.log(getDataset.json(lists));
//     });
//     //console.log(getDataset);
//     //console.log(DatabaseContact);
  
//     //console.log("Databases:");
//     //databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//   };