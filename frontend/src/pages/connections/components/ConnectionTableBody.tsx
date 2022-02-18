import * as React from "react";
import {useContext} from "react";
import ConnectionTableRowKita from "../rows/ConnectionTableRowKita";
import ConnectionTableRow from "../rows/ConnectionTableRow";
import ConnectionTableRowUser from "../rows/ConnectionTableRowUser";
import {TableBody} from "@mui/material";
import {ConnectorCom} from "../../../services/ConnectorProvider";

const ConnectionTableBody = () => {

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
                        return (
                            <ConnectionTableRowKita
                                row={row}/>
                        )
                    })
            }
            {
                kitas
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                            <ConnectionTableRowUser row={row}/>
                        )
                    })
            }
            {
                connector
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                            <ConnectionTableRow row={row}/>
                        )
                    })
            }
        </TableBody>
    )
}

export default ConnectionTableBody