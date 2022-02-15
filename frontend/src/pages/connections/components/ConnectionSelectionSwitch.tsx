import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import {ConnectorCom} from "../../../services/ConnectorProvider";

const ConnectionSelectionSwitch = () => {

    const {alignment, showSelection, pageSelection} = useContext(ConnectorCom);

    const onChangeHandle = (event: React.MouseEvent<HTMLElement>,
                            newAlignment: string) => {
        showSelection(newAlignment, pageSelection)
    }


    return (
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={onChangeHandle}
        >
            <ToggleButton value="Confirmed">Confirmed</ToggleButton>
            <ToggleButton value="Pending">Pending</ToggleButton>
            <ToggleButton value="In Progress">In Progress</ToggleButton>
            <ToggleButton value="Add New">Add New</ToggleButton>
        </ToggleButtonGroup>
    )

}

export default ConnectionSelectionSwitch