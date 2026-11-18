import express from "express";
import cors from "cors";
import mysql2 from "mysql2";
import "dotenv.config";

const { SQL_USER } = process.env;
const { SQL_PASSWORD } = process.env;

const connection = await mysql2.createConnection({
    host: "127.0.0.1",
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: "Fog_QA",
    port: 3306,
})

connection.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Connected successfully.");
});

const server = express();
server.use(cors());
server.use(express.json());

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

server.get('/data', (request, response) => {

})