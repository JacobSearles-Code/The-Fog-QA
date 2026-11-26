import express from 'express';
import connection from "../server.js";

const router = express.Router();

// 1. Bug reports grouped by severity
router.get('/severity', async (request, response) => {
    try {
        const [rows] = await connection.query(`
            SELECT severity, COUNT(*) AS total
            FROM Bug_Reports
            GROUP BY severity
            ORDER BY FIELD(severity, 'critical', 'high', 'medium', 'low');
        `);

        response.json(rows);
    } catch (error) {
        console.error('Error fetching bug severity:', error);
        response.status(500).json({error: 'Failed to fetch bug severity'});
    }
});

// 2. Bug reports grouped by status
router.get('/status', async (request, response) => {
    try {
        const [rows] = await connection.query(`
            SELECT status, COUNT(*) AS total
            FROM Bug_Reports
            GROUP BY status
            ORDER BY FIELD(status, 'open', 'in-progress', 'resolved', 'closed');
        `);

        response.json(rows);
    } catch (error) {
        console.error('Error fetching bug status:', error);
        response.status(500).json({error: 'Failed to fetch bug status'});
    }
});

// 3. Bug reports grouped by game
router.get('/games', async (request, response) => {
    try {
        const [rows] = await connection.query(`
            SELECT Games.game_title,
                   COUNT(Bug_Reports.report_id) AS total_reports
            FROM Games
                     LEFT JOIN Bug_Reports
                               ON Games.game_id = Bug_Reports.game_id
            GROUP BY Games.game_id, Games.game_title
            ORDER BY total_reports DESC;
        `);

        response.json(rows);
    } catch (error) {
        console.error('Error fetching reports by game:', error);
        response.status(500).json({error: 'Failed to fetch reports by game'});
    }
});

// 4. Bug reports grouped by platform
router.get('/platforms', async (request, response) => {
    try {
        const [rows] = await connection.query(`
            SELECT platform, COUNT(*) AS total
            FROM Bug_Reports
            GROUP BY platform
            ORDER BY total DESC;
        `);

        response.json(rows);
    } catch (error) {
        console.error('Error fetching reports by platform:', error);
        response.status(500).json({error: 'Failed to fetch reports by platform'});
    }
});

// 5. Bug reports submitted over the last 30 days
router.get('/reports-over-time', async (request, response) => {
    try {
        const [rows] = await connection.query(`
            WITH RECURSIVE dates AS (SELECT CURRENT_DATE - INTERVAL 29 DAY AS report_date

            UNION ALL

            SELECT report_date + INTERVAL 1 DAY
            FROM dates
            WHERE report_date
                < CURRENT_DATE
                )

            SELECT dates.report_date,
                   COUNT(Bug_Reports.date_created) AS total
            FROM dates
                     LEFT JOIN Bug_Reports
                               ON DATE (Bug_Reports.date_created) = dates.report_date
            GROUP BY dates.report_date
            ORDER BY dates.report_date;
        `);

        response.json(rows);
    } catch (error) {
        console.error('Error fetching reports over time:', error);
        response.status(500).json({error: 'Failed to fetch reports over time'});
    }
});

// 6. Resolved bug reports over the last 30 days
router.get('/resolved-over-time', async (request, response) => {
    try {
        const [rows] = await connection.query(`
            WITH RECURSIVE dates AS (SELECT CURRENT_DATE - INTERVAL 29 DAY AS resolution_date

            UNION ALL

            SELECT resolution_date + INTERVAL 1 DAY
            FROM dates
            WHERE resolution_date
                < CURRENT_DATE
                )

            SELECT dates.resolution_date,
                   COUNT(Bug_Reports.date_updated) AS total_resolved
            FROM dates
                     LEFT JOIN Bug_Reports
                               ON DATE (Bug_Reports.date_updated) = dates.resolution_date
                AND Bug_Reports.status = 'resolved'
            GROUP BY dates.resolution_date
            ORDER BY dates.resolution_date;
        `);

        response.json(rows);
    } catch (error) {
        console.error('Error fetching resolved reports over time:', error);
        response.status(500).json({error: 'Failed to fetch resolved reports over time'});
    }
});

// 7. Bug reports submitted by each tester
router.get('/testers', async (request, response) => {
    try {
        const [rows] = await connection.query(`
            SELECT Users.username,
                   COUNT(Bug_Reports.report_id) AS total_reports
            FROM Users
                     LEFT JOIN Bug_Reports
                               ON Users.user_id = Bug_Reports.user_id
            GROUP BY Users.user_id, Users.username
            ORDER BY total_reports DESC;
        `);

        response.json(rows);
    } catch (error) {
        console.error('Error fetching tester activity:', error);
        response.status(500).json({error: 'Failed to fetch tester activity'});
    }
});

// 8. Number of comments on each bug report (top 10)
router.get('/comments-per-report', async (request, response) => {
    try {
        const [rows] = await connection.query(`
            SELECT Bug_Reports.title,
                   COUNT(Comments.comment_id) AS total_comments
            FROM Bug_Reports
                     LEFT JOIN Comments
                               ON Bug_Reports.report_id = Comments.report_id
            GROUP BY Bug_Reports.report_id, Bug_Reports.title
            ORDER BY total_comments DESC LIMIT 10;
        `);

        response.json(rows);
    } catch (error) {
        console.error('Error fetching comments per report:', error);
        response.status(500).json({error: 'Failed to fetch comments per report'});
    }
});

export default router;

