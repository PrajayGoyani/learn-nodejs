const { MongoClient } = require('mongodb');

const url = "mongodb+srv://wrpprajay:0Wxvp6jYIOElr9vC@cluster0.uvqbger.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'blog';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function (err) {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }

  console.log('Connected successfully to the server');

  // Access the database and collections here
});

const db = client.db(dbName);
const usersCollection = db.collection('users');
const postsCollection = db.collection('posts');
client.close();

// MongoDB
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://wrpprajay:0Wxvp6jYIOElr9vC@cluster0.uvqbger.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// // Connect to MongoDB Database Server
// const { MongoClient } = require('mongodb');

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = "mongodb+srv://wrpprajay:0Wxvp6jYIOElr9vC@cluster0.uvqbger.mongodb.net/myDB/?retryWrites=true&w=majority";
//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//          // Make the appropriate DB calls
//         await  listDatabases(client);
//      } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// main().catch(console.error);