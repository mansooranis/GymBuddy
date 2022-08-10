import { Link } from "react-router-dom";
export default function Home(){
    return (
        <div className="h-screen w-screen flex flex-col">
            <text className=" text-lg m-14">HomePage</text>
            <button className="rounded-lg my-4 mx-14 w-10"><Link to="/login">login?</Link></button>
            <button className="rounded-lg my-4 mx-14 w-10"><Link to="/signup">Signup?</Link></button>
        </div>
    )
}