import { Routes, Route, BrowserRouter } from "react-router-dom";
import Start from "scenes/Login";
import Activate from "scenes/Activate";
import Recovery from "scenes/Recovery";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start/>} />
                <Route path="/activate" element={<Activate/>} />
                <Route path="/recovery" element={<Recovery/>} />
            </Routes>
        </BrowserRouter>
    )
}