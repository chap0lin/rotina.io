import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Start, Login, Activate, Recovery, Logged } from "scenes/index";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/activate" element={<Activate/>} />
                <Route path="/recovery" element={<Recovery/>} />
                <Route path="/logged" element={<Logged/>} />
            </Routes>
        </BrowserRouter>
    )
}