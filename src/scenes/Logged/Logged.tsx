import LoggedProvider from "src/contexts/LoggedContextProvider";
import LoggedScreens from "./LoggedScreens";

export default function Logged() {
  return (
    <LoggedProvider>
        <LoggedScreens/>
    </LoggedProvider>
  );
}
