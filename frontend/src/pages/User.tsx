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
import {ChangeEvent, MouseEventHandler, useContext, useEffect, useState} from "react";
import {SortDirection} from "@mui/material/TableCell/TableCell";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {UserCom} from "../services/UserProvider";
import {KitaCom} from "../services/KitaProvider";
import {filter} from "lodash";

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

// function applySortFilter(array:UserItem[], query:string) {
//     if (query) {
//         return filter(array, (_user) => _user.lastName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//     }
//     return array;
// }

// @ts-ignore
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// @ts-ignore
function getComparator(order, orderBy) {
    return order === 'desc'
        // @ts-ignore
        ? (a, b) => descendingComparator(a, b, orderBy)
        // @ts-ignore
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// @ts-ignore
function applySortFilter(array, comparator, query) {
    // @ts-ignore
    const stabilizedThis = array.map((el, index) => [el, index]);
    // @ts-ignore
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    // @ts-ignore
    return stabilizedThis.map((el) => el[0]);
}

const User = () => {

    const {refreshAllUser, allUser, user} = useContext(UserCom);
    const {kitaItem, addKitaUserConnection} = useContext(KitaCom);

    const [selectedUserRole, setSelectedUserRole] = React.useState('');
    const [selectedPlaySchool, setSelectedPlaySchool] = useState('')
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState<SortDirection>('asc');
    const [selected, setSelected] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        refreshAllUser('PLAYSCHOOLADMIN')
        // eslint-disable-next-line
    }, []);

    const filteredUsers = applySortFilter(allUser, getComparator(order, orderBy), filterName);
    const isUserNotFound = filteredUsers.length === 0;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUser.length) : 0;

    const handleRequestSort = (event: MouseEventHandler<HTMLAnchorElement>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: string[] = allUser.map((n) => n.firstName);
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
        addKitaUserConnection(user.id, kitaItem.id, selectedUserRole)
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
                                    rowCount={allUser.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        // @ts-ignore
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
                                                                        value={kitaItem.id}>{kitaItem.name}</MenuItem>
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
                        count={allUser.length}
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