import { Background } from "src/components";
import { Header } from "src/components";

export default function LoggedInScreen(){
    return (
        <Background>
            <Header logo user/>
            <p>
                Hi there! You're in the logged in screen.
            </p>
        </Background>
    )
}