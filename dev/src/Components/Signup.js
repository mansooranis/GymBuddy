import { Link } from "react-router-dom";
export default function Signup(){
    return(
        <div className=" flex justify-center items-center h-screen mh-[-20px] flex-col">
            <text className=" text-3xl font-light my-4">Signup Page</text>
            <div className=" h-96 bg-slate-100 w-96 rounded-lg flex flex-col">
                <text className="m-2">Full Name:</text>
                <input type="text" className=" w-3/4 border-black border-2 rounded-lg mx-2 px-2 py-1 text-sm"></input>
                <text className="m-2">Email:</text>
                <input type="text" className=" w-3/4 border-black border-2 rounded-lg mx-2 px-2 py-1 text-sm"></input>
                <text className="m-2">Username:</text>
                <input type="text" className=" w-3/4 border-black border-2 rounded-lg mx-2 px-2 py-1 text-sm" ></input>
                <text className="m-2">Password:</text>
                <input type="password" className=" w-3/4 border-black border-2 rounded-lg mx-2 px-2 py-1 text-sm" ></input>
                <button className="border border-blue w-1/4 rounded-lg m-2">Submit</button>
                <button className="w-1/4 rounded-lg m-2"><Link to="/login">login?</Link></button>
            </div>
        </div>
    )
}