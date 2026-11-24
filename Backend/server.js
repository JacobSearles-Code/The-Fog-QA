// Get / Post Format
// const [rows] = await connection.query('SELECT g.title, t.type_name, g.about FROM games g JOIN game_types t ON t.type_id = g.type_id; ');

import express from "express";
import cors from "cors";
import mysql2 from "mysql2/promise";
import "dotenv/config";

const { SQL_USER } = process.env;
const { SQL_PASSWORD } = process.env;
import analyticsRoutes from './Routes/analytics.js';



const connection = await mysql2.createConnection({
    host: "localhost",
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: "Fog_QA",
    port: 3306,
});

console.log("Connected successfully.");

export default connection;

const server = express();
server.use(cors());
server.use(express.json());
server.use('/api/analytics', analyticsRoutes);

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

server.get('/data', async (request, response) => {
    try {
        const [rows] = await connection.query('SELECT * FROM Users;');
        response.send(rows);
    } catch (error) {
        console.log(error);
    }
})

server.get('/fetchGames', async (request, response) => {
    try {
        const [rows] = await connection.query('SELECT game_title, game_id FROM Games;');
        response.send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
})

server.post('/postGames', async (request, response) => {
    const {title, bug_description, replication_steps, severity, status, platform, game_id, user_id} = request.body;
    try {
        const data = await connection.query('INSERT INTO Bug_Reports (title, bug_description, replication_steps, severity, status, platform, game_id, user_id) VALUES (?,?,?,?,?,?,?,?)',
            [title, bug_description, replication_steps, severity, status, platform, game_id, user_id]);
        response.status(200).send("Bug has been reported!");
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
})