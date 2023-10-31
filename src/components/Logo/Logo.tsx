import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { Text } from "./Logo.style";

interface props {
    color?: string,
    fontSize: number | string,
}

export default function Logo({color, fontSize}: props){

    const { language } = useGlobalContext();

    return (
        <Text style={{color, fontSize}}>
            {language === "pt-br"? 'Rotina.io' : 'Routine.io'}
        </Text>
    )
}