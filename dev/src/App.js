import Login from "./Components/Login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}
