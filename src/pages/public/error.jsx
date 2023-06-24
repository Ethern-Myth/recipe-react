import "@styles/error.css";
import { Link } from "react-router-dom"

function Error() {
    return (
        <div id="main">
            <div className="error-div">
                <h1>Error 404</h1>
                <p>Page does not exist</p>
                <Link to="/">Return Home</Link>
            </div>
        </div>
    );
}

export default Error;