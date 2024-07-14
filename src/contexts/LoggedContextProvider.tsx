import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { activitySelectionType, activityType, dataType, itemType, listType, loggedScreens } from "src/types";
import { areActivitiesEqual, isSelectionValid } from "src/functions";
import { dayElementId, emptyWeek } from "src/constants";
import { isBefore } from "src/functions/time";
import { useTime } from "src/hooks/time";

interface LoggedProviderProps {
    children: ReactNode;
}

interface LoggedContextValue {
    updateServer: dataType,
    screen: loggedScreens,
    today: number,
    lists: listType[],
    weekActivities: activityType[][],
    selected: activitySelectionType | null,
    setUpdateServer: React.Dispatch<React.SetStateAction<dataType>>,
    updateWeek: (newWeek: activityType[][]) => void,
    setSelected: React.Dispatch<React.SetStateAction<activitySelectionType>>,
    addActivity: (whichOne: activitySelectionType, updateServer?: boolean) => void;
    updateActivity: (whichOne: activitySelectionType, updateServer?: boolean) => void;
    deleteActivity: (whichOne: activitySelectionType, updateServer?: boolean) => void;
    updateList: (index: number, updatedList: listType, updateServer?: boolean) => number,
    setLists: React.Dispatch<React.SetStateAction<listType[]>>,
    resetSelectedActivity: (toSomeSpecificDay?: number) => void,
    goTo: (newScreen: loggedScreens) => void,
    goBack: (shouldReset?: boolean) => void,
}

const initialValues: LoggedContextValue = {
    updateServer: null,
    screen: "dashboard",
    today: 0,
    lists: [],
    weekActivities: emptyWeek,
    selected: { activity: null, day: 0 },
    setUpdateServer: () => null,
    updateWeek: () => null,
    setSelected: () => null,
    addActivity: () => null,
    updateActivity: () => null,
    deleteActivity: () => null,
    updateList: () => null,
    setLists: () => null,
    resetSelectedActivity: () => null,
    goTo: () => null,
    goBack: () => null,
}

const LoggedContext = createContext<LoggedContextValue>(initialValues);

export function useLoggedContext() {
    const context = useContext(LoggedContext);
    if (typeof context !== "undefined") return context;
    console.log("Logged Context cannot be accessed from here.");
}


export default function LoggedProvider(props: LoggedProviderProps) {
    const {hour} = useTime();
    const [screen, setScreen] = useState<loggedScreens>(() => initialValues.screen);
    const [today, setToday] = useState<number>(() => initialValues.today);
    const [lists, setLists] = useState<listType[]>(() => initialValues.lists);
    const [selected, setSelected] = useState<activitySelectionType | null>(() => initialValues.selected);
    const [weekActivities, setWeekActivities] = useState<activityType[][]>(() => initialValues.weekActivities);
    const [updateServer, setUpdateServer] = useState<dataType>(() => initialValues.updateServer);
    
    const screenHistory = useRef<loggedScreens[]>([]);

    const addActivity = (selection: activitySelectionType, updateServer?: boolean) => {
        if (!isSelectionValid(selection)) return;
        const newWeek = [...weekActivities];
        newWeek[selection.day].push(selection.activity);
        newWeek[selection.day].sort((a, b) =>
            isBefore(a.startsAt, b.startsAt) ? -1 : 1
        );
        setWeekActivities(newWeek);
        document.getElementById(`${dayElementId}${selection.day}`).scrollIntoView();
        updateServer && setUpdateServer("week");
    }


    const deleteActivity = (selection: activitySelectionType, updateServer?: boolean) => {
        if (!isSelectionValid(selection)) return;
        const index = weekActivities[selection.day].findIndex((act) =>
          areActivitiesEqual(act, selection.activity)
        );
        const newWeek = [...weekActivities];
        newWeek[selection.day].splice(index, 1);
        setWeekActivities(newWeek);
        updateServer && setUpdateServer("week");
    }


    const updateActivity = (updated: activitySelectionType, updateServer?: boolean) => {
        const { activity, day } = updated;
        if (areActivitiesEqual(selected.activity, activity) && selected.day == day) return; 
        deleteActivity(selected);
        addActivity({ activity, day }, updateServer);
        setSelected({ activity, day });
    }


    const updateWeek = (newWeek: activityType[][]) => {
        setWeekActivities(newWeek);
    }

    const getNewIndex = (index: number, element: any, list: any[]) => {
        if(!list) return 0;
        if(!element) return (index > 0)? (index - 1) : 0;
        if(index < 0) return (list.length);
        return index;
    }

    const updateList = (index: number, list: listType | null, updateServer?: boolean) => {
        let newIndex = getNewIndex(index, list, lists);
        console.log(newIndex);
        setLists((prev) =>{
            const newLists = [...prev];
            if(!list){                              // no list given = remove existing list
                newLists.splice(index, 1);
            } else if(index > -1) {                 // index is positive = update existing list
                newLists[index] = {...list};       
            } else {                                // index in negative = add new list
                newLists.push({...list});
                
            }
            return newLists;
        });
        updateServer && setUpdateServer("lists");
        return newIndex;
    }

    const resetSelectedActivity = (toSomeSpecificDay?: number) => {
        setSelected({
            day: toSomeSpecificDay?? today,
            activity: null,
        });
    }


    const goBack = (shouldReset?: boolean) => {
        if(screenHistory.current.length > 0){
            setScreen(screenHistory.current.at(-1));
            screenHistory.
            current.pop();
        }
        shouldReset && resetSelectedActivity();
    }


    const goTo = (newScreen: loggedScreens) => {
        setScreen((prev) => {
            if(screenHistory.current.at(-1) !== prev){
                screenHistory.current.push(prev);
            }
            return newScreen;
        });
    }

    useEffect(() => {
        const date = new Date();
        setToday((date.getDay() + 6) % 7);      //here, 0 equals monday and 6 equals sunday. Fuck the system
    }, [hour]);


    const { children } = props;
    const value: LoggedContextValue = {
        updateServer,
        screen,
        today,
        lists,
        weekActivities,
        selected,
        setUpdateServer,
        updateList,
        setLists,
        updateWeek,
        updateActivity,
        addActivity,
        deleteActivity,
        setSelected,
        resetSelectedActivity,
        goTo,
        goBack,
    };


    return (
        <LoggedContext.Provider value={value}>
            {children}
        </LoggedContext.Provider>
    );
}
