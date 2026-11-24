import {useEffect, useState} from "react";
import axios from "axios";

const FormPage = () => {
    const severity = ['low','medium','high','critical'];
    const platforms = ['PC', 'Xbox', 'PlayStation'];
    const [games, setGames] = useState([]);
    const [report, setReport] = useState({
        title: "",
        bug_description: "",
        replication_steps: "",
        severity: "low",
        status: "open",
        platform: "PC",
        game_id: 1,
        user_id: 1, // Temp default until login is figured out
    })

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setReport((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/postGames', report);
            console.log(response.data);
            alert("Bug has been reported!");
            setReport({
                title: "",
                bug_description: "",
                replication_steps: "",
                severity: "low",
                status: "open",
                platform: "PC",
                game_id: "",
                user_id: 1,
            });
        } catch (error) {
            console.log(error);
            alert("Failed to submit bug report.");
        }
    }

    const handleOnFetch = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/fetchGames");
            setGames(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleOnFetch();
    }, []);

    return (
        <div className="form">
            <div className="dashboard-header">
                <h1>Report a bug</h1>
                <p><i>Please fill in the form with as much detail as possible</i></p>
            </div>
            <div className="formDiv">
                <form onSubmit={handleOnSubmit}>
                    <div className="formGroup">
                        <label htmlFor="title">Report Title:</label>
                        <input required name="title" id="title" type="text" value={report.title} onChange={handleOnChange} placeholder="Enter report title..." />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="bug_description">Description:</label>
                        <textarea required name="bug_description" id="bug_description" value={report.bug_description} onChange={handleOnChange} placeholder="Enter brief description of bug..." />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="replication_steps">Replication Steps:</label>
                        <textarea required name="replication_steps" id="replication_steps" value={report.replication_steps} onChange={handleOnChange} placeholder="Enter steps or N/A if no replication steps..." />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="severity">Severity:</label>
                        <select name="severity" id="severity" onChange={handleOnChange} value={report.severity}>
                            {severity.map((level) => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="platform">Platform:</label>
                        <select name="platform" id="platform" onChange={handleOnChange} value={report.platform}>
                            {platforms.map((platform) => (
                                <option key={platform} value={platform}>{platform}</option>
                            ))}
                        </select>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="game_id">Game:</label>
                        <select name="game_id" id="game_id" onChange={handleOnChange} value={report.game_id}>
                            {games.map((game) => (
                                <option key={game.game_id} value={game.game_id}>
                                    {game.game_title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default FormPage;