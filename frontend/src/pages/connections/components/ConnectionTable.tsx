import Scrollbar from "../../../components/Scrollbar";
import {Card, Table, TableContainer, TablePagination} from "@mui/material";
import ConnectionTableHead from "./ConnectionTableHead";
import ConnectionTableBody from "./ConnectionTableBody";
import * as React from "react";
import {useContext} from "react";
import ConnectionToolbar from "./ConnectionToolbar";
import {ConnectorCom} from "../../../services/ConnectorProvider";

const ConnectionTable = () => {

    const {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        itemCount
    } = useContext(ConnectorCom);
    return (
        <Card>
            <ConnectionToolbar/>
            <Scrollbar>
                <TableContainer sx={{minWidth: 1000}}>
                    <Table>
                        <ConnectionTableHead/>
                        <ConnectionTableBody/>
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

export default ConnectionTable