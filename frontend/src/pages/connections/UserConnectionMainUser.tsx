import UserConnectionTitle from "./components/UserConnectionTitle";
import * as React from "react";
import {useContext, useEffect} from "react";
import UserConnectionSelectionSwitch from "./components/UserConnectionSelectionSwitch";
import UserConnectionTable from "./components/UserConnectionTable";
import {ConnectorCom} from "../../services/ConnectorProvider";

const UserConnectionMainUser = () => {

    const {title, showSelection} = useContext(ConnectorCom);

    useEffect(() => {
        showSelection('Confirmed', 'User')
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <UserConnectionTitle title={title}/>
            <UserConnectionSelectionSwitch/>
            <UserConnectionTable/>
        </>
    )

}

export default UserConnectionMainUser