import { useState, useEffect, useRef } from "react";
import { colors } from "src/colors";
import { Eye, EyeOff } from "react-feather";
import { Container, Input, Title } from "./Credential.style";

interface props {
  value?: string;
  placeholder?: string;
  title?: string;
  safe?: boolean;
  zIndex?: number;
  disabled?: boolean;
  underlined?: boolean;
  inputLimit?: number;
  allowSpace?: boolean;
  hourType?: boolean;
  onChange: (e: string) => void;
}

const INPUT_LIMIT = 24;

export default function Credential({
  placeholder,
  value,
  title,
  safe,
  zIndex,
  disabled,
  underlined,
  inputLimit,
  allowSpace,
  onChange,
}: props) {
  const [hide, setHide] = useState<boolean>(() => safe);
  const [hasInput, setHasInput] = useState<boolean>(() => false);
  const inputRef = useRef(null);
  const EyeIcon = hide ? EyeOff : Eye;
  const limit = inputLimit ?? INPUT_LIMIT;

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[<>]/g, "");
    if (!allowSpace) {
      input = input.trim();
    }

    e.target.value = input.length <= limit ? input : input.substring(0, limit);
    onChange(input.trim());
    setHasInput(input.length > 0);
  };

  useEffect(() => {
    safe && !hasInput && setHide(true);
  }, [hasInput]);

  useEffect(() => {
    value && (inputRef.current.value = value);
  }, [value]);

  return (
    <Container
      style={{
        zIndex: zIndex ?? 10,
        border: underlined ? "none" : `1px solid ${colors.grey}`,
      }}>
      {title && <Title>{title}:</Title>}
      <Input
        style={underlined ? { borderBottom: `1px solid ${colors.grey}` } : {}}
        placeholder={placeholder ?? ""}
        type={hide ? "password" : "text"}
        onChange={updateInput}
        disabled={disabled}
        ref={inputRef}
      />
      {safe && hasInput && (
        <EyeIcon
          style={{ flexShrink: 0, cursor: "pointer" }}
          opacity={0.6}
          color={colors.black}
          width={15}
          height={15}
          onClick={() => setHide((prev) => !prev)}
        />
      )}
    </Container>
  );
}
