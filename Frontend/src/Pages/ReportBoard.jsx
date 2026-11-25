import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const ReportBoard = () => {
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    const loadBoard = async () => {
        try {
            const result = await axios.get("http://localhost:3000/comments")
            setComments(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnClick = (id) => {
        navigate(`/report/${id}`);
    }

    useEffect(() => {
        loadBoard()
    }, []);

    return (
        <div className="reportsPage">
            <h1>Current Threads</h1>
            {comments.map((comment) => (
                <div className="commentWrapper" key={comment.report_id}>
                    <h3 className="reportTitle" onClick={() => handleOnClick(comment.report_id)}>{comment.title} || Status: <span className={`status-${comment.status}`}>{comment.status}</span></h3>
                </div>
            ))}
        </div>
    )
}

export default ReportBoard;