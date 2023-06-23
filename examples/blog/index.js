const express = require("express")
const mongoose = require("mongoose")
const Router = require("./src/services/routes")
const app = express()

// Connection URL // mongodb://0.0.0.0:27017/blog
const url = 'mongodb+srv://wrpprajay:0Wxvp6jYIOElr9vC@cluster0.uvqbger.mongodb.net/blog'; 
const options = { useNewUrlParser: true, useUnifiedTopology: true };

// Connect to the MongoDB server
async function main() {
  try {
    await mongoose.connect(url, options);
    console.log('Connected database successfully');
    app.use(Router)
    app.listen(3000, _ => console.log("Server is running at port 3000"))    
  } catch (e) {
    console.error('Failed to connect to the database:', err);
    mongoose.connection.close();
  } finally {
  }
}

main().catch(console.error);



// https://mongoosejs.com/docs/
// https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/ 