import axios from "axios";
import {useEffect, useState} from "react";
import UserCard from "./UserCard.jsx";

const UserContainer = () => {
const [users, setUsers] = useState([]);

    const handleOnLoad = async () => {
        const result = await axios.get("http://localhost:3000/data");
        setUsers(result.data);
    }

    useEffect(() => {
        handleOnLoad();
    }, []);

    return (
        <div>
            {users.map((user) => (
                <UserCard user={user} />
            ))}
        </div>
    )
}

export default UserContainer;