import { Link } from "react-router-dom";

function Home() {
    return (
    <div className="w-6/12 mx-auto">
        <h1 className="text-2xl font-bold text-center">React Projects for interview Preparation</h1>
        <ul>
            <li><Link to={"/todo"} >1. Todo App</Link></li>
        </ul>
    </div>
);
}       
export default Home;