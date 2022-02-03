import Page from "../components/Page";
import {
    Button,
    Card, Checkbox,
    Container,
    Stack,
    Table,
    TableBody, TableCell,
    TableContainer, TablePagination,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {UserListHead, UserListToolbar, UserMoreMenu} from "../components/pageSupport/gruppen";
import {IGruppenInformationService} from "../services/GruppenInformationService";
import {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import {SortDirection} from "@mui/material/TableCell/TableCell";
import Scrollbar from "../components/Scrollbar";
import Label from "../components/Label";
import {sentenceCase} from "change-case";
import SearchNotFound from "../forRefactoring/components/SearchNotFound";
import * as React from "react";

export interface ITABLE_HEAD{
    id: string,
    label: string,
    alignRight:boolean
}

const TABLE_HEAD:ITABLE_HEAD[] = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'kitaName', label: 'Kita', alignRight: false}
];

interface AppProps {
    groups: IGruppenInformationService
    kitaId: string
    kitaName: string
}

const Gruppen = (props: AppProps) => {

    useEffect(() => {
        props.groups.getItemsFromBackend(props.kitaId)
    }, []);


    const [group, setGroup] = useState('');
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState<SortDirection>('asc');
    const [selected, setSelected] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.groups.getItems().length) : 0;

    const isUserNotFound = props.groups.getItems().length === 0;


    const handleRequestSort = (event: MouseEventHandler<HTMLAnchorElement>, property:string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event:ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: string[] = props.groups.getItems().map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleFilterByName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFilterName(event.target.value);
    };

    const addGroup = () => {
        const data:{} = {name: group, kitaId: props.kitaId, kitaName: props.kitaName}
        props.groups.addGroup(data)
        setGroup('')
    }

    const handleClick = (event:ChangeEvent<HTMLInputElement>, name:string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected:string[] = [];
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

    return (
        <Page title="Kita Gruppen">
            <Container>
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
                            component={RouterLink}
                            to="#"
                            startIcon={<Icon icon={plusFill}/>}
                            onClick={addGroup}
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
                    <Scrollbar >
                    <TableContainer sx={{minWidth: 800}}>
                        <Table>
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={props.groups.getItems().length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {props.groups.getItems()
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                            const {id, name, kitaId, kitaName} = row;
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
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={(event) => handleClick(event, name)}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="left">{name}</TableCell>
                                                    <TableCell align="left">{kitaName}</TableCell>
                                                    <TableCell align="left">
                                                        <Label
                                                            variant="ghost"
                                                            color={(kitaId === 'banned' && 'error') || 'success'}
                                                        >
                                                            {sentenceCase(kitaId)}
                                                        </Label>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <UserMoreMenu />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    )}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            {isUserNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <SearchNotFound searchQuery={filterName} />
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
                        count={props.groups.getItems().length}
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

export default Gruppen