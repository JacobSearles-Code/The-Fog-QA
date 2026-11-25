// Get / Post Format
// const [rows] = await connection.query('SELECT g.title, t.type_name, g.about FROM games g JOIN game_types t ON t.type_id = g.type_id; ');

import express from "express";
import session from "express-session";
import cors from "cors";
import mysql2 from "mysql2/promise";
import "dotenv/config";
import bcrypt from "bcrypt";

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

server.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

server.use(express.json());

server.use(session({
    secret: process.env.SESSION_SECRET || "development-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60
    }
}));

server.use('/api/analytics', analyticsRoutes);

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
    if (!request.session.user_id) {
        return response.status(401).json({
            message: "You must be logged in to submit a report."
        });
    }

    const user_id = request.session.user_id;

    const {title, bug_description, replication_steps, severity, status, platform, game_id} = request.body;
    try {
        const data = await connection.query('INSERT INTO Bug_Reports (title, bug_description, replication_steps, severity, status, platform, game_id, user_id) VALUES (?,?,?,?,?,?,?,?)',
            [title, bug_description, replication_steps, severity, status, platform, game_id, user_id]);
        response.status(200).send("Bug has been reported!");
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
})


server.post('/login', async (request, response) => {
    const { email, password } = request.body;
    try {
        const [rows] = await connection.query(
            'SELECT user_id, username, hashed_password FROM Users WHERE email = ?',
            [email]
        );
        if (rows.length === 0) {
            return response.status(401).json({message: "Invalid email or password."});
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.hashed_password);
        if (!isMatch) {
            return response.status(401).json({message: "Invalid email or password."});
        }
        request.session.regenerate((error) => {
            if (error) {
                return response.status(500).json({message: "Could not create session."});
            }
            request.session.user_id = user.user_id;
            request.session.username = user.username;
            request.session.save((error) => {
                if (error) {
                    return response.status(500).json({message: "Could not save session."});
                }
                response.status(200).json({message: "Logged in successfully!"});
            });
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({message: "Server error."});
    }
});


server.get('/check-auth', (request, response) => {

    console.log("CHECK AUTH SESSION:");
    console.log(request.session);

    if (!request.session.user_id) {
        return response.status(401).json({authenticated: false, message: "Not logged in."});
    }

    response.status(200).json({authenticated: true, user_id: request.session.user_id, username: request.session.username});
});

server.post('/logout', (request, response) => {
    request.session.destroy((error) => {
        if (error) {
            return response.status(500).json({message: "Could not log out."});
        }

        response.clearCookie('connect.sid', {httpOnly: true, secure: false, sameSite: "lax"});
        response.status(200).json({message: "Logged out successfully!"});
    });
});

server.get("/comments", async (request, response) => {
    try {
        const [rows] = await connection.query('SELECT report_id, title, status FROM Bug_Reports ORDER BY report_id DESC;');
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(400).send(error);
    }
})

server.get('/comments/:id', async (request, response) => {
    try {
        const {id} = request.params;

        // Get report details
        const [report] = await connection.query(
            `SELECT report_id, title, status
             FROM Bug_Reports
             WHERE report_id = ?`,
            [id]
        );

        // Get report comments
        const [comments] = await connection.query(
            `SELECT c.comment_id, c.comment, u.username
             FROM Comments c
             JOIN Users u ON u.user_id = c.user_id
             WHERE c.report_id = ?`,
            [id]
        );

        response.json({
            report: report[0],
            comments: comments
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({message: "Server error"});
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});