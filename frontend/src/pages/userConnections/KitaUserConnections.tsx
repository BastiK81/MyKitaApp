import Page from "../../components/Page";
import {Card, Container, Stack, Table, TableBody, TableContainer, TablePagination, Typography, ToggleButton, ToggleButtonGroup} from "@mui/material";
import * as React from "react";
import {ChangeEvent, MouseEventHandler, useContext, useEffect, useState} from "react";
import {UserListHead, UserListToolbar} from "../../components/pageSupport/gruppen";
import Scrollbar from "../../components/Scrollbar";
import {SortDirection} from "@mui/material/TableCell/TableCell";
import ConnectionTableRowUser from "./ConnectionTableRowUser";
import {ConnectorCom} from "../../services/ConnectorProvider";
import {PlaySchoolCom} from "../../services/PlaySchoolProvider";
import ConnectionTableRowConnectors from "./ConnectionTableRowConnetors";

export interface UserRole {
    id: string,
    role: string
}

export const userRoles: UserRole[] = [
    {id: '1', role: 'ADMIN'},
    {id: '2', role: 'USER'},
    {id: '3', role: 'EDUCATOR'},
    {id: '4', role: 'PARENT'},
    {id: '5', role: 'NONE'}
]

export interface ITableHead {
    id: string,
    label: string,
    alignRight: boolean
}

export const tableHeadsUser: ITableHead[] = [
    {id: 'firstName', label: 'Name', alignRight: false},
    {id: 'lastName', label: 'Last Name', alignRight: false},
    {id: 'playSchool', label: 'Kita', alignRight: false},
    {id: 'role', label: 'Rolle', alignRight: false},
    {id: 'add', label: 'Add User', alignRight: false}
];

export const tableHeadsConnector: ITableHead[] = [
    {id: 'userId', label: 'userId', alignRight: false},
    {id: 'kitaId', label: 'kitaId', alignRight: false},
    {id: 'userStatus', label: 'userStatus', alignRight: false},
    {id: 'kitaStatus', label: 'kitaStatus', alignRight: false},
    {id: 'userRole', label: 'userRole', alignRight: false},
    {id: 'implementationDate', label: 'implementationDate', alignRight: false},
    {id: 'expireDate', label: 'expireDate', alignRight: false}
];


const KitaUserConnections = () => {

    const {playSchoolItem} = useContext(PlaySchoolCom);
    const {
        users,
        connector,
        refreshUsers,
        getAllInProgress,
        getAllAccepted,
        getAllPending,
    } = useContext(ConnectorCom);

    useEffect(() => {
        getAllAccepted(playSchoolItem.id)
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
            const newSelecteds: string[] = users.map((n) => n.firstName);
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
            setTableHeads(tableHeadsUser);
            setTitle('Available User')
            refreshUsers(playSchoolItem.id)
            setItemCount(users.length)
        } else {
            setTableHeads(tableHeadsConnector)
            setTitle(newAlignment + ' Connections')
            if (newAlignment === 'Confirmed') {
                getAllAccepted(playSchoolItem.id)
            }
            if (newAlignment === 'Pending') {
                getAllPending(playSchoolItem.id)
            }
            if (newAlignment === 'In Progress') {
                getAllInProgress(playSchoolItem.id)
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
        <Page title="PlaySchool User Connection">
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
                                    rowCount={users.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {alignment === 'Add New' &&
                                    users
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <ConnectionTableRowUser row={row} selected={selected}
                                                                        handleClick={handleClick}/>
                                            )
                                        })
                                    }
                                    {alignment !== 'Add New' &&
                                    connector
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <ConnectionTableRowConnectors row={row} selected={selected}
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

export default KitaUserConnections