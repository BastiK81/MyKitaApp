import Page from "../../components/Page";
import {
    Button,
    Card,
    Container,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {UserListHead, UserListToolbar} from "../../components/pageSupport/gruppen";
import * as React from "react";
import {ChangeEvent, MouseEventHandler, useContext, useEffect, useState} from "react";
import {SortDirection} from "@mui/material/TableCell/TableCell";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import {GroupCom} from "../../services/GrouopProvider";
import {KitaCom} from "../../services/KitaProvider";
import GroupsTableBody from "./GroupsTableBody";

export interface ITableHead {
    id: string,
    label: string,
    alignRight: boolean
}

const tableHeads: ITableHead[] = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'kitaName', label: 'Kita', alignRight: false}
];

const Groups = () => {

    const {kitaItem} = useContext(KitaCom);
    const {
        selected,
        setSelected,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        groupItems,
        addGroup,
        refreshAllGroups
    } = useContext(GroupCom);

    useEffect(() => {
        refreshAllGroups(kitaItem.id)
        // eslint-disable-next-line
    }, []);

    const [group, setGroup] = useState('');
    const [order, setOrder] = useState<SortDirection>('asc');

    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');


    const isUserNotFound = groupItems.length === 0;

    const handleRequestSort = (event: MouseEventHandler<HTMLAnchorElement>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: string[] = groupItems.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleFilterByName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFilterName(event.target.value);
    };

    const addNewGroup = () => {
        const data: {} = {name: group, kitaId: kitaItem.id, kitaName: kitaItem.name}
        addGroup(data)
        setGroup('')
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Page title="Kita Gruppen">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} spacing={2}>
                    <Typography variant="h4" gutterBottom>
                        Kita Groups
                    </Typography>
                    <TextField
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        fullWidth
                        label="Name"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Icon icon={plusFill}/>}
                        onClick={addNewGroup}
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
                    <Scrollbar>
                        <TableContainer sx={{minWidth: 800}}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={tableHeads}
                                    rowCount={groupItems.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <GroupsTableBody/>

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
                        count={groupItems.length}
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

export default Groups