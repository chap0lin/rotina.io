import { Routes, Route, BrowserRouter } from "react-router-dom";
import Start from "scenes/Login";
import Activate from "scenes/Activate";
import Recovery from "scenes/Recovery";
import LoggedInScreen from "./scenes/LoggedIn";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start/>} />
                <Route path="/activate" element={<Activate/>} />
                <Route path="/recovery" element={<Recovery/>} />
                <Route path="/logged" element={<LoggedInScreen/>} />
            </Routes>
        </BrowserRouter>
    )
}