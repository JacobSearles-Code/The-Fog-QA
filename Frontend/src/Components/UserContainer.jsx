import axios from "axios";
import {useEffect, useState} from "react";

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
                <div key={user.id}>
                    <h3>{user.username}</h3>
                </div>
            ))}
        </div>
    )
}

export default UserContainer;