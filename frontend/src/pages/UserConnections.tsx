import Page from "../components/Page";
import {Card, Container, Stack, Table, TableBody, TableContainer, Typography} from "@mui/material";
import * as React from "react";
import {ChangeEvent, MouseEventHandler, useContext, useEffect, useState} from "react";
import {UserListHead, UserListToolbar} from "../components/pageSupport/gruppen";
import Scrollbar from "../components/Scrollbar";
import {SortDirection} from "@mui/material/TableCell/TableCell";
import ConnectionTableRowUser from "../components/pageSupport/ConnectionTableRowUser";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import {ConnectorCom} from "../services/ConnectorProvider";
import {PlaySchoolCom} from "../services/PlaySchoolProvider";

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

const tableHeadsUser: ITableHead[] = [
    {id: 'firstName', label: 'Name', alignRight: false},
    {id: 'lastName', label: 'Last Name', alignRight: false},
    {id: 'playSchool', label: 'Kita', alignRight: false},
    {id: 'role', label: 'Rolle', alignRight: false},
    {id: 'add', label: 'Add User', alignRight: false}
];

const tableHeadsConnector: ITableHead[] = [
    {id: 'firstName', label: 'Name', alignRight: false},
    {id: 'lastName', label: 'Last Name', alignRight: false},
    {id: 'playSchool', label: 'Kita', alignRight: false},
    {id: 'role', label: 'Rolle', alignRight: false},
    {id: 'add', label: 'Add User', alignRight: false}
];


const UserConnections = () => {

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
        if (newAlignment==='Add New') {
            setTableHeads(tableHeadsUser);
            setTitle('Available User')
            refreshUsers(playSchoolItem.id)
        } else {
            setTableHeads(tableHeadsConnector)
            setTitle(newAlignment + ' Connections')
            if (newAlignment==='Confirmed') {
                getAllAccepted(playSchoolItem.id)
            }
            if (newAlignment==='Pending') {
                getAllPending(playSchoolItem.id)
            }
            if (newAlignment==='In Progress') {
                getAllInProgress(playSchoolItem.id)
            }
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


                                    {alignment==='Add New' &&
                                        users
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            // @ts-ignore
                                            .map((row) => {
                                                return (
                                                    <ConnectionTableRowUser row={row} selected={selected}
                                                                            handleClick={handleClick}/>
                                                )
                                            })
                                    }

                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
            </Container>
        </Page>
    )

}

export default UserConnections