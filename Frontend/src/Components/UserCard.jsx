import SeverityChart from "./SeverityChart.jsx";

const UserCard = ({ user }) => {
    return (
        <div key={user.id}>
            <h3>{user.username}</h3>
            <SeverityChart />
        </div>
    )
}

export default UserCard