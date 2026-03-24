import { useState } from "react";
import { createContext } from "react";

export const LeaveContext = createContext();

export const LeaveProvider = ({children}) =>{

    const [totalleave, settotalleave] = useState();
    const Totalleave = 30; // LPA (Leave Per Anam)
    function CalLeave(leave){
        settotalleave((Totalleave-leave));
    }

    return (
        <LeaveContext.Provider value={{totalleave, CalLeave}}>
            {children}
        </LeaveContext.Provider>
    )
}