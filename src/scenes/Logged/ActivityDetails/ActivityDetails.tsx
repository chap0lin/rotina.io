import { Background } from "src/components";
import { activityType } from "src/types";

interface props {
    currentlyEditing: activityType | null;
}

export default function ActivityDetails({currentlyEditing}: props){
    
    const Content = () => {
        if(currentlyEditing) return (
            <p style={{color: "black"}}>
                Editing activity {currentlyEditing.what};
            </p>
        );
        return (
            <p style={{color: "black"}}>
                So you wish to create a new activity, heh?
            </p>
        );
    }
    
    return (
        <Background>
            <Content/>
        </Background>
    )
}