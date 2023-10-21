import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { Container, Input, Title } from "./Credential.style";
import { colors } from '../../../../colors';

interface props {
    title: string;
    safe?: boolean;
    zIndex?: number;
    disabled?: boolean;
    onChange: (e: string) => void;
}

export default function Credential({title, safe, zIndex, disabled, onChange}: props){

    const [hide, setHide] = useState<boolean>(() => safe);
    const [hasInput, setHasInput] = useState<boolean>(() => false);
    const EyeIcon = hide? EyeOff : Eye;

    const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/[<>]/g, "");
        e.target.value = input;
        input.trim();
        onChange(input);
        setHasInput(input.length > 0);
    }

    useEffect(() => {
        if(safe && !hasInput){
            setHide(true);
        }
    }, [hasInput])

    return (
        <Container style={{zIndex: zIndex?? 10}}>
            <Title>{title}:</Title>
            <Input type={hide? "password" : "text"} onChange={updateInput} disabled={disabled}/>
            { safe && hasInput &&
                <EyeIcon
                    style={{flexShrink: 0}}
                    opacity={0.6}
                    color={colors.black}
                    width={15}
                    height={15}
                    onClick={() => setHide(prev => !prev)}
                />
            }
        </Container>
    )
}