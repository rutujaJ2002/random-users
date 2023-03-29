import React, {useState} from "react";
import { GoChevronDown, GoChevronRight } from "react-icons/go";

const ExpandablePanel = ({header, children})=>{
    const [expanded, setExpanded]=useState(false);

    const handleIconclick=()=>{
        setExpanded(!expanded)
    }

    return(
        <div className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center ">
                <div className="flex flex-row justify-between items-center p-2">
                    {header}
                </div>
                <div onClick={handleIconclick} className="mr-3 text-2xl cursor-pointer">
                    {expanded ? <GoChevronDown/>:<GoChevronRight/>}
                </div>
            </div>
            {expanded && <div className="p-2 border-t">
                {children}
            </div>}
        </div>
    )
}

export default ExpandablePanel;