import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { activitySelectionType, activityType, itemType } from "src/types";
import { areActivitiesEqual, isSelectionValid } from "src/functions";
import { emptyWeek } from "src/constants";
import { isBefore } from "src/functions/time";
import { useTime } from "src/hooks/time";

type screens = "dashboard" | "lists" | "activities" | "activity-settings";

interface LoggedProviderProps {
    children: ReactNode;
}

interface LoggedContextValue {
    screen: screens,
    today: number,
    shoppingList: itemType[],
    todoList: itemType[],
    weekActivities: activityType[][],
    selected: activitySelectionType | null,
    setShoppingList: React.Dispatch<React.SetStateAction<itemType[]>>,
    setTodoList: React.Dispatch<React.SetStateAction<itemType[]>>,
    setWeekActivities: React.Dispatch<React.SetStateAction<activityType[][]>>,
    setSelected: React.Dispatch<React.SetStateAction<activitySelectionType>>,
    addActivity: (whichOne: activitySelectionType) => void;
    updateActivity: (whichOne: activitySelectionType) => void;
    deleteActivity: (whichOne: activitySelectionType) => void;
    resetSelectedActivity: (toSomeSpecificDay?: number) => void,
    goTo: (newScreen: screens) => void,
    goBack: (shouldReset?: boolean) => void,
}

const initialValues: LoggedContextValue = {
    screen: "dashboard",
    today: 0,
    shoppingList: [],
    todoList: [],
    weekActivities: emptyWeek,
    selected: { activity: null, day: 0 },
    setShoppingList: () => null,
    setTodoList: () => null,
    setWeekActivities: () => null,
    setSelected: () => null,
    addActivity: () => null,
    updateActivity: () => null,
    deleteActivity: () => null,
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
    const [hour] = useTime();
    const [screen, setScreen] = useState<screens>(() => initialValues.screen);
    const [today, setToday] = useState<number>(() => initialValues.today);
    const [shoppingList, setShoppingList] = useState<itemType[]>(() => initialValues.shoppingList);
    const [todoList, setTodoList] = useState<itemType[]>(() => initialValues.todoList);
    const [selected, setSelected] = useState<activitySelectionType | null>(() => initialValues.selected);
    const [weekActivities, setWeekActivities] = useState<activityType[][]>(() => initialValues.weekActivities);
    
    const screenHistory = useRef<screens[]>([]);

    const addActivity = (selection: activitySelectionType) => {
        if (!isSelectionValid(selection)) return;
        const newWeek = [...weekActivities];
        newWeek[selection.day].push(selection.activity);
        newWeek[selection.day].sort((a, b) =>
            isBefore(a.startsAt, b.startsAt) ? -1 : 1
        );
        setWeekActivities(newWeek);
    };


    const deleteActivity = (selection: activitySelectionType) => {
        if (!isSelectionValid(selection)) return;
        const index = weekActivities[selection.day].findIndex((act) =>
          areActivitiesEqual(act, selection.activity)
        );
        const newWeek = [...weekActivities];
        newWeek[selection.day].splice(index, 1);
        setWeekActivities(newWeek);
    };


    const updateActivity = (updated: activitySelectionType) => {
        const { activity, day } = updated;
        if (areActivitiesEqual(selected.activity, activity) && selected.day == day) return; 
        deleteActivity(selected);
        addActivity({ activity, day });
        setSelected({ activity, day });
    };
    

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


    const goTo = (newScreen: screens) => {
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
        screen,
        today,
        shoppingList,
        todoList,
        weekActivities,
        selected,
        setShoppingList,
        setTodoList,
        setWeekActivities,
        setSelected,
        addActivity,
        updateActivity,
        deleteActivity,
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
