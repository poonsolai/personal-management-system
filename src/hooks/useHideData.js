import { useState } from "react";

function useHideData(val){
    const [num, setNum] = useState(4);
  
        function viewAll(){
            setNum(val.length);
        };
        function HideAll(){
            setNum(4);
        };

        return [num, viewAll, HideAll];
   
}
export function useHideData2(val){
    const [num, setNum] = useState(2);
  
        function viewAll(){
            setNum(val.length);
        };
        function HideAll(){
            setNum(2);
        };

        return [num, viewAll, HideAll];
   
}
export default useHideData