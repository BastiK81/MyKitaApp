import Page from "../components/Page";
import {
    Button,
    Card,
    Checkbox,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import {UserListHead, UserListToolbar, UserMoreMenu} from "../components/pageSupport/gruppen";
import * as React from "react";
import {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import {SortDirection} from "@mui/material/TableCell/TableCell";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../forRefactoring/components/SearchNotFound";
import {UserItem} from "../services/UserService";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";

export interface ITableHead {
    id: string,
    label: string,
    alignRight: boolean
}

const tableHeads: ITableHead[] = [
    {id: 'firstName', label: 'Name', alignRight: false},
    {id: 'lastName', label: 'Last Name', alignRight: false},
    {id: 'playSchool', label: 'Kita', alignRight: false},
    {id: 'role', label: 'Rolle', alignRight: false},
    {id: 'add', label: 'Add User', alignRight: false}
];

interface UserProps {
    addPlaySchoolUserConnection: (playSchoolId:string, userRole:string) => void,
    refreshAllUser: () => void,
    getAllUser: UserItem[],
    playSchoolId: string,
    playSchoolName: string
}

interface UserRole {
    id: string,
    role: string
}

const userRoles: UserRole[] = [
    {id: '1', role: 'ADMIN'},
    {id: '2', role: 'USER'},
    {id: '3', role: 'EDUCATOR'},
    {id: '4', role: 'PARENT'},
    {id: '5', role: 'NONE'}
]

const User = (props: UserProps) => {

    const {addPlaySchoolUserConnection, refreshAllUser, getAllUser, playSchoolId, playSchoolName} = props;

    const [selectedUserRole, setSelectedUserRole] = React.useState('');
    const [selectedPlaySchool, setSelectedPlaySchool] = useState('')
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState<SortDirection>('asc');
    const [selected, setSelected] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        refreshAllUser()
    }, []);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getAllUser.length) : 0;
    const isUserNotFound = getAllUser.length === 0;

    const handleRequestSort = (event: MouseEventHandler<HTMLAnchorElement>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: string[] = getAllUser.map((n) => n.firstName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleFilterByName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFilterName(event.target.value);
    };

    const handleChangePlaySchool = (event: SelectChangeEvent) => {
        setSelectedPlaySchool(event.target.value);
    };

    const handleChangeUserRole = (event: SelectChangeEvent) => {
        setSelectedUserRole(event.target.value);
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

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const addConnection = () => {
        addPlaySchoolUserConnection(playSchoolId, selectedUserRole)
    }

    return (
        <Page title="Kita Gruppen">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} spacing={2}>
                    <Typography variant="h4" gutterBottom>
                        Available User
                    </Typography>
                </Stack>
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
                                    rowCount={getAllUser.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {getAllUser
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                                const {id, firstName, lastName} = row;
                                                const isItemSelected = selected.indexOf(firstName) !== -1;
                                                return (
                                                    <TableRow
                                                        hover
                                                        key={id}
                                                        tabIndex={-1}
                                                        role="checkbox"
                                                        selected={isItemSelected}
                                                        aria-checked={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                checked={isItemSelected}
                                                                onChange={(event) => handleClick(event, firstName)}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="left">{firstName}</TableCell>
                                                        <TableCell align="left">{lastName}</TableCell>
                                                        <TableCell align="left">
                                                            <FormControl>
                                                                <InputLabel id="playSchoolPicker-label">Kita</InputLabel>
                                                                <Select
                                                                    labelId="playSchoolPicker-label"
                                                                    id="playSchoolPicker"
                                                                    label="Kita"
                                                                    value={selectedPlaySchool}
                                                                    onChange={handleChangePlaySchool}
                                                                >
                                                                    <MenuItem
                                                                        value={playSchoolId}>{playSchoolName}</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <FormControl>
                                                                <InputLabel id="rolePicker-label">Role</InputLabel>
                                                                <Select
                                                                    labelId="rolePicker-label"
                                                                    id="rolePicker"
                                                                    label="Role"
                                                                    value={selectedUserRole}
                                                                    onChange={handleChangeUserRole}
                                                                >
                                                                    {userRoles.map((role) => {
                                                                        return (
                                                                            <MenuItem id={role.id}
                                                                                      value={role.role}>{role.role}</MenuItem>
                                                                        )
                                                                    })}
                                                                </Select>
                                                            </FormControl>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Button
                                                                type="submit"
                                                                variant="contained"
                                                                startIcon={<Icon icon={plusFill}/>}
                                                                onClick={addConnection}
                                                            >
                                                                Connect User
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <UserMoreMenu/>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        )}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 53 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{py: 3}}>
                                                <SearchNotFound searchQuery={filterName}/>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={getAllUser.length}
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

export default User