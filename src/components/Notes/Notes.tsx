import { useRef, useEffect, useState } from "react";
import { useGlobalContext } from "src/contexts/GlobalContextProvider";
import { colors } from "src/colors";
import { texts } from "./Notes.lang";
import { Check, X } from "react-feather";
import { activityType } from "src/types";
import { reactToClick } from "src/functions/animation";
import {
  Note,
  NoteInput,
  NoteList,
  ActivityName,
  Title,
  TitleContainer,
  NoteSpace,
  Icon,
  Texts,
  NoteHeader,
} from "./Notes.style";

interface props {
  activity: activityType;
  onNotesUpdate: (notes: string[]) => void;
}

export default function Notes({ activity, onNotesUpdate }: props) {
  const { language } = useGlobalContext();
  const [notes, setNotes] = useState<string[]>(() => []);

  const xRef = useRef(null);
  const inputRef = useRef(null);
  const noteTexts = texts.get(language);

  ////Listener para remover foco do <input> quando o usuário aperta Enter/////////////////////////

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown);
    return () => {
      document.removeEventListener("keydown", detectKeyDown);
    };
  }, []);

  const detectKeyDown = (e) => {
    if (e.key === "Enter") {
      const newNote = inputRef.current.value.trim();
      if (newNote.length === 0) return;
      setNotes((previous) => [...previous, newNote]);
      inputRef.current.value = "";
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  const removeNote = (i: number) => {
    setNotes((previous) => {
      const updated = [...previous];
      updated.splice(i, 1);
      return updated;
    });
  };

  const onExitClick = () => {
    onNotesUpdate(notes);
  };

  useEffect(() => {
    setNotes(() => {
      if (!activity) return [];
      return activity.notes ?? [];
    });
  }, [activity]);

  return (
    <NoteSpace>
      <NoteHeader>
        <TitleContainer>
          <Title>{noteTexts.title}</Title>
          <Icon ref={xRef}>
            <Check
              width={"100%"}
              height={"100%"}
              color={colors.white}
              strokeWidth={1.2}
              style={{
                flexShrink: 0,
                marginRight: 5,
                cursor: "pointer",
              }}
              onClick={() => reactToClick(xRef.current, onExitClick, 0.5)}
            />
          </Icon>
        </TitleContainer>
        <ActivityName style={{ background: activity.color }}>
          {activity.what}
        </ActivityName>
      </NoteHeader>
      <NoteList>
        {notes &&
          notes.map((note, i) => (
            <Note key={i}>
              <X
                width={20}
                color={colors.grey}
                strokeWidth={3}
                style={{ flexShrink: 0, marginRight: 5 }}
                onClick={() => removeNote(i)}
              />
              {note}
            </Note>
          ))}
      </NoteList>
      <NoteInput ref={inputRef} placeholder={noteTexts.placeholder} />
    </NoteSpace>
  );
}
