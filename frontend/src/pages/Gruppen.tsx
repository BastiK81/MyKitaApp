import Page from "../components/Page";
import {Button, Card, Container, Stack, Table, TableBody, TableContainer, TableRow, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {UserListHead, UserListToolbar} from "../components/_dashboard/user";
import USERLIST from "../_mocks_/user";
import {useState} from "react";
import {GroupItem, IGruppenInformationService} from "../services/GruppenInformationService";
import {filter} from "lodash";


const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'company', label: 'Company', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'isVerified', label: 'Verified', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' }
];

interface AppProps{
    groups: IGruppenInformationService
}

// @ts-ignore
function descendingComparator(a, b, orderBy:string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order:string, orderBy:string) {
    return order === 'desc'
        // @ts-ignore
        ? (a, b) => descendingComparator(a, b, orderBy)
        // @ts-ignore
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// @ts-ignore
function applySortFilter(array:GroupItem[], comparator, query:string) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        // @ts-ignore
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);

}

const Gruppen = (props:AppProps) => {

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filteredUsers = applySortFilter(props.groups.getItems(), getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    // @ts-ignore
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // @ts-ignore
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.name);
            // @ts-ignore
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    // @ts-ignore
    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    return(
        // @ts-ignore
        <Page title="Kita Gruppen">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User
                    </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="#"
                        startIcon={<Icon icon={plusFill} />}
                    >
                        Add Group
                    </Button>
                </Stack>

                <Card>
                    <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={props.groups.getItems.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                                <TableBody>
                                    {filteredUsers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const { id, name, role, status, company, avatarUrl, isVerified } = row;
                                            const isItemSelected = selected.indexOf(name) !== -1;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                >
                                                </TableRow>




                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </Page>
    )
}

export default Gruppen