import {
    Card,
    Container,
    Stack,
    Table,
    TableBody,
    TableContainer,
    TablePagination,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import * as React from "react";
import {ChangeEvent, MouseEventHandler, useContext, useEffect, useState} from "react";
import {ConnectorCom} from "../../services/ConnectorProvider";
import {SortDirection} from "@mui/material/TableCell/TableCell";
import Page from "../../components/Page";
import Scrollbar from "../../components/Scrollbar";
import {UserListHead, UserListToolbar} from "../../components/pageSupport/gruppen";
import ConnectionTableRowConnetors from "./ConnectionTableRowConnetors";
import {ITableHead, tableHeadsConnector, tableHeadsKita} from "./KitaUserConnections";
import ConnectionTableRowKita from "./ConnectionTableRowKita";

const UserKitaConnections = () => {

    const {
        connector,
        kitas,
        getAllKitas,
        getAllInProgressUser,
        getAllAcceptedUser,
        getAllPendingUser,
    } = useContext(ConnectorCom);

    useEffect(() => {
        getAllKitas()
        // eslint-disable-next-line
    }, []);

    const [tableHeads, setTableHeads] = useState<ITableHead[]>(tableHeadsConnector);
    const [title, setTitle] = useState('Confirmed Connections');
    const [selected, setSelected] = useState<string[]>([]);
    const [filterName, setFilterName] = useState('');
    const [order, setOrder] = useState<SortDirection>('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [alignment, setAlignment] = React.useState('Confirmed');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [itemCount, setItemCount] = useState(0);

    const handleFilterByName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFilterName(event.target.value);
    };

    const handleRequestSort = (event: MouseEventHandler<HTMLAnchorElement>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: string[] = kitas.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleToggleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
        if (newAlignment === 'Add New') {
            setTableHeads(tableHeadsKita);
            setTitle('Available User')
            getAllKitas()
            setItemCount(kitas.length)
        } else {
            setTableHeads(tableHeadsConnector)
            setTitle(newAlignment + ' Connections')
            if (newAlignment === 'Confirmed') {
                getAllAcceptedUser()
            }
            if (newAlignment === 'Pending') {
                getAllPendingUser()
            }
            if (newAlignment === 'In Progress') {
                getAllInProgressUser()
            }
            setItemCount(connector.length)
        }
    };

    const handleClick = (event: ChangeEvent<HTMLInputElement>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Page title="User Kita Connection">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} spacing={2}>
                    <Typography variant="h4" gutterBottom>
                        {title}
                    </Typography>
                </Stack>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleToggleChange}
                >
                    <ToggleButton value="Confirmed">Confirmed</ToggleButton>
                    <ToggleButton value="Pending">Pending</ToggleButton>
                    <ToggleButton value="In Progress">In Progress</ToggleButton>
                    <ToggleButton value="Add New">Add New</ToggleButton>
                </ToggleButtonGroup>
                <Card>
                    <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />
                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800}}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={tableHeads}
                                    rowCount={kitas.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {alignment === 'Add New' &&
                                    kitas
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <ConnectionTableRowKita row={row} selected={selected}
                                                                        handleClick={handleClick}/>
                                            )
                                        })
                                    }
                                    {alignment !== 'Add New' &&
                                    connector
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <ConnectionTableRowConnetors title={title} roleSwitch={false} row={row} selected={selected}
                                                                             handleClick={handleClick}/>
                                            )
                                        })
                                    }
                                </TableBody>
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
            </Container>
        </Page>
    )

}

export default UserKitaConnections