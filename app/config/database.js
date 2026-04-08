import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "", //bugluh
  user: process.env.DB_USERNAME || "node_user",
  password: process.env.DB_PASSWORD || "", //bugluh
});

(async () => {
  pool.query("SELECT NOW()", (err) => {
    if (err) {
      console.error("Error connecting to the database :( ,  -->", err);
    } else {
      console.log("😊 DB successfully connected :)");
    }
  });
})();

export default pool;