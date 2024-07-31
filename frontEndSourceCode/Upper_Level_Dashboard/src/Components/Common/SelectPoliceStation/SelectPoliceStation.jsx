import React from "react";
import SelectPoliceStationMain from "./Submodules/SelectPoliceStationMain";

const SelectPoliceStation = ({url}) => {
    return(
    <div style={{width: "100%"}}>
        <SelectPoliceStationMain url={url}/>
    </div>
    );
}

export default SelectPoliceStation;