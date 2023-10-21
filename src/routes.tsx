import { MemoryRouter, Routes, Route } from "react-router-dom";
import Start from "./scenes/Login";

export default function Router(){
    return (
        <MemoryRouter>
            <Routes>
                <Route path="/" element={<Start/>}/>
            </Routes>
        </MemoryRouter>
    )
}