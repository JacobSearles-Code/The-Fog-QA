import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const ReportComment = () => {
    const {id} = useParams();
    const [report, setReport] = useState(null);
    const [comments, setComments] = useState([]);

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
        fetchComments();
    }, [id]);

    return (
        <div className="commentBoard">
            {report && (
                <div>
                    <h1>{report.title} --- Status: <span className={`status-${report.status}`}>{report.status}</span>
                    </h1>
                    <h2>Comments</h2>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.comment_id}>
                                <h3>{comment.username}: {comment.comment}</h3>
                            </div>
                        ))) : (<p>No comments yet.</p>)}
                </div>
            )}
            <div className="commentForm">
                <label className="commentLabel">Post Comment:</label><br/>
                <textarea className="commentInput"/><br/>
                <button>Post</button>
            </div>
        </div>
    )
}

export default ReportComment;
