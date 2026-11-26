import {useEffect, useState} from 'react';
import AnalyticsChart from '../Components/Charts/AnalyticsChart';
import {
    getSeverityData,
    getStatusData,
    getGameData,
    getPlatformData,
    getReportsOverTime,
    getResolvedOverTime,
    getTesterData,
    getCommentData
} from '../Services/analyticsService';

const Dashboard = () => {
    const [charts, setCharts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const results = await Promise.all([
                    getSeverityData(),
                    getStatusData(),
                    getGameData(),
                    getPlatformData(),
                    getReportsOverTime(),
                    getResolvedOverTime(),
                    getTesterData(),
                    getCommentData()
                ]);

                setCharts({
                    severity: results[0].data,
                    status: results[1].data,
                    games: results[2].data,
                    platforms: results[3].data,
                    reportsOverTime: results[4].data,
                    resolvedOverTime: results[5].data,
                    testers: results[6].data,
                    comments: results[7].data
                });
            } catch (err) {
                console.error('Analytics error:', err);
                setError('Unable to load analytics data.');
            } finally {
                setLoading(false);
            }
        };

        loadAnalytics();
    }, []);

    if (loading) {
        return <p>Loading analytics...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const formatDate = (date) => {
        if (!date) return '';

        const year = date instanceof Date
            ? date.getFullYear()
            : Number(String(date).split('T')[0].split('-')[0]);

        let month;
        let day;

        if (date instanceof Date) {
            month = date.getMonth();
            day = date.getDate();
        } else {
            const dateString = String(date).split('T')[0];
            const parts = dateString.split('-');

            month = Number(parts[1]) - 1;
            day = Number(parts[2]);
        }

        const monthName = [
            'Jan', 'Feb', 'Mar', 'Apr',
            'May', 'Jun', 'Jul', 'Aug',
            'Sep', 'Oct', 'Nov', 'Dec'
        ];

        return `${monthName[month]} ${day}, ${year}`;
    };

    const createChartData = (rows, labelField, valueField) => {
        return {
            labels: rows.map(row => {
                const value = row[labelField];

                if (labelField === 'report_date' || labelField === 'resolution_date') {
                    return formatDate(value);
                }

                return String(value);
            }),
            values: rows.map(row => Number(row[valueField]))
        };
    };

    const chartList = [
        {
            title: 'Bug Severity',
            type: 'doughnut',
            data: createChartData(charts.severity, 'severity', 'total'),
            label: 'Bug Reports'
        },
        {
            title: 'Bug Status',
            type: 'bar',
            data: createChartData(charts.status, 'status', 'total'),
            label: 'Bug Reports'
        },
        {
            title: 'Reports by Game',
            type: 'bar',
            data: createChartData(charts.games, 'game_title', 'total_reports'),
            label: 'Bug Reports'
        },
        {
            title: 'Reports by Platform',
            type: 'doughnut',
            data: createChartData(charts.platforms, 'platform', 'total'),
            label: 'Bug Reports'
        },
        {
            title: 'Reports Over Time',
            type: 'line',
            data: createChartData(charts.reportsOverTime, 'report_date', 'total'),
            label: 'Submitted Reports'
        },
        {
            title: 'Resolved Reports Over Time',
            type: 'line',
            data: createChartData(charts.resolvedOverTime, 'resolution_date', 'total_resolved'),
            label: 'Resolved Reports'
        },
        {
            title: 'Most Active Testers',
            type: 'bar',
            data: createChartData(charts.testers, 'username', 'total_reports'),
            label: 'Submitted Reports'
        },
        {
            title: 'Comments per Bug Report',
            type: 'bar',
            data: createChartData(charts.comments, 'title', 'total_comments'),
            label: 'Comments'
        }
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>QA Analytics</h1>
                <p>Monitor bug reports and development progress.</p>
            </div>
            <section className="analytics-grid">
                {chartList.map((chart, index) => (
                    <AnalyticsChart
                        key={index}
                        title={chart.title}
                        type={chart.type}
                        labels={chart.data.labels}
                        values={chart.data.values}
                        label={chart.label}
                    />
                ))}
            </section>
        </div>
    );
}

export default Dashboard;
