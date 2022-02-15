import Scrollbar from "../../../components/Scrollbar";
import {Card, Table, TableContainer, TablePagination} from "@mui/material";
import UserConnectionTableHead from "./UserConnectionTableHead";
import UserConnectionTableBody from "./UserConnectionTableBody";
import * as React from "react";
import {useContext} from "react";
import UserConnectionToolbar from "./UserConnectionToolbar";
import {ConnectorCom} from "../../../services/ConnectorProvider";

const UserConnectionTable = () => {

    const {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        itemCount
    } = useContext(ConnectorCom);
    return (
        <Card>
            <UserConnectionToolbar/>
            <Scrollbar>
                <TableContainer sx={{minWidth: 1000}}>
                    <Table>
                        <UserConnectionTableHead/>
                        <UserConnectionTableBody/>
                    </Table>
                </TableContainer>
            </Scrollbar>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={itemCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    )
}

export default UserConnectionTable