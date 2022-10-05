import database from "./config/database.js";
import server from "./graphql/server.js";


database();
server.start().then(console.log('Running GRAPHQL SERVER'));