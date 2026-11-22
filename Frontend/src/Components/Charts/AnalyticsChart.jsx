import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend} from 'chart.js';
import {Bar, Line, Doughnut} from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

function AnalyticsChart({ title, type, labels, values, label }) {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: values,
                backgroundColor: [
                    '#526f45',
                    '#c7a75a',
                    '#d97735',
                    '#b94040',
                    '#547da5',
                    '#8764a5',
                    '#4c9b91'
                ],
                borderColor: type === 'line' ? '#ffffff' : '#181a18',                borderWidth: 2,
                tension: 0
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: type === 'doughnut',
                position: 'bottom',
                labels: {
                    color: '#c7c7c7'
                }
            },
            tooltip: {
                callbacks: {
                    title: (context) => {
                        return context[0].label;
                    }
                },
                backgroundColor: '#181a18',
                titleColor: '#ffffff',
                bodyColor: '#c7c7c7',
                borderColor: '#526f45',
                borderWidth: 1
            }
        },
        scales: type === 'doughnut' ? {} : {
            x: {
                ticks: { color: '#c7c7c7' },
                grid: { color: '#303330' }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#c7c7c7',
                    precision: 0
                },
                grid: { color: '#303330' }
            }
        }
    };

    let ChartComponent;

    switch (type) {
        case 'bar':
            ChartComponent = Bar;
            break;
        case 'line':
            ChartComponent = Line;
            break;
        case 'doughnut':
            ChartComponent = Doughnut;
            break;
        default:
            return <p>Unsupported chart type</p>;
    }

    return (
        <div className="analytics-chart">
            <h3>{title}</h3>
            <div className="chart-container">
                <ChartComponent data={chartData} options={options} />
            </div>
        </div>
    );
}

export default AnalyticsChart;
