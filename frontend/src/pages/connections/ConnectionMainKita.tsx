import ConnectionTitle from "./components/ConnectionTitle";
import * as React from "react";
import {useContext, useEffect} from "react";
import ConnectionSelectionSwitch from "./components/ConnectionSelectionSwitch";
import ConnectionTable from "./components/ConnectionTable";
import {ConnectorCom} from "../../services/ConnectorProvider";
import {Container} from "@mui/material";

const ConnectionMainKita = () => {

    const {title, showSelection} = useContext(ConnectorCom);

    useEffect(() => {
        showSelection('Confirmed', 'Kita')
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth="xl">
            <ConnectionTitle title={title}/>
            <ConnectionSelectionSwitch/>
            <ConnectionTable/>
        </Container>
    )

}

export default ConnectionMainKita