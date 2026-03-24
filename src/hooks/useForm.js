import { useState } from "react"

function useForm(inisilize){

    const [val, setVal] = useState(inisilize);

    
    function handleForm(e){
        
        const {name, value} = e.target;

        setVal({...val,[name] : e.target.type == "checkbox" ? e.target.checked : value})
    }
    
    function ClearForm(){
        setVal(inisilize);
    }

    return {val, handleForm, ClearForm, setVal};
}

export default useForm //this is custom hook 