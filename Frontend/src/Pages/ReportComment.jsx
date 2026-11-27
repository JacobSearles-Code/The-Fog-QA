import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const ReportComment = () => {
    const {id} = useParams();
    const [report, setReport] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState(null);

    const fetchComments = async () => {
        try {
            const result = await axios.get(`http://localhost:3000/comments/${id}`);

            setReport(result.data.report);
            setComments(result.data.comments);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            console.log("Checking authentication...");
            try {
                const response = await axios.get(
                    'http://localhost:3000/check-auth',
                    {withCredentials: true}
                );
                setUser(response.data);
            } catch (error) {
                setUser(null);
                console.log(error);
            }
            console.log("Authentication request finished.");
        };
        checkAuth();
    }, []);

    const handleOnChange = (e) => {
        setNewComment(e.target.value);
    }

    const handleOnSubmit = async (id) => {
        try {
            await axios.post(`http://localhost:3000/comments/${id}`, {comment: newComment},{withCredentials: true}).then(() => fetchComments())
            setNewComment("");
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchComments();
    }, [id]);

    return (
        <div className="commentBoard">
            {report && (
                <div>
                    <h1>{report.title}</h1>
                    <h3>Status: <span className={`status-${report.status}`}>{report.status}</span></h3>
                    <p>{report.bug_description}</p>
                    <h2>Comments</h2>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.comment_id} className="postedComment">
                                <h3>{comment.username}:</h3>
                                <h3>{comment.comment}</h3>
                            </div>
                        ))) : (<p>No comments yet.</p>)}
                </div>
            )}
            {report && (
                report.status === "closed" ? <h3>This report has been closed, no further comments allowed</h3> :
                <div className="commentForm">
                    <label className="commentLabel">Post Comment:</label><br/>
                    <textarea className="commentInput" onChange={handleOnChange} value={newComment}/><br/>
                    <button onClick={() => handleOnSubmit(id)}>Post
                    </button>
                </div>
            )}
        </div>
    )
}

export default ReportComment;
