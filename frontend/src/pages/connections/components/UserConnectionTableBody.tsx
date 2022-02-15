import * as React from "react";
import {useContext} from "react";
import UserConnectionTableRowKita from "../rows/UserConnectionTableRowKita";
import UserConnectionTableRow from "../rows/UserConnectionTableRow";
import UserConnectionTableRowUser from "../rows/UserConnectionTableRowUser";
import {TableBody} from "@mui/material";
import {ConnectorCom} from "../../../services/ConnectorProvider";

const UserConnectionTableBody = () => {

    const {
        users,
        connector,
        kitas,
        page,
        rowsPerPage,
    } = useContext(ConnectorCom);

    return (
        <TableBody>
            {
                users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        console.log('Add New || User')
                        return (
                            <UserConnectionTableRowKita row={row}/>
                        )
                    })
            }
            {
                kitas
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        console.log('Add New || Kita')
                        return (
                            <UserConnectionTableRowUser row={row}/>
                        )
                    })
            }
            {
                connector
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        console.log('Connector')
                        return (
                            <UserConnectionTableRow row={row}/>
                        )
                    })
            }
        </TableBody>
    )
}

export default UserConnectionTableBody