import { listType } from "src/types";
import { List, PlaceholderList } from "./components";

interface props {
    lists: listType[];
    maxHeight?: number;
    onEdit: () => void;
    onMark: (index: number) => void;
    onRemove: (index: number) => void;
}

export default function ListsContent({maxHeight, lists, onEdit, onMark, onRemove}: props){
    
    if(lists && lists.length) return (
        <>
            {lists.map((list, index) => (
                <List
                    maxHeight={maxHeight}
                    key={index}
                    index={index}
                    list={list}
                    onEdit={onEdit}
                    onMark={onMark}
                    onRemove={onRemove}
                />
            ))}
        </>
    )
    
    return (
        <PlaceholderList/>
    )
}