import Page from "../components/Page";
import {
    Avatar,
    Button,
    Card, Checkbox,
    Container,
    Stack,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {UserListHead, UserListToolbar} from "../components/_dashboard/user";
import {IGruppenInformationService} from "../services/GruppenInformationService";
import {ChangeEvent, useState} from "react";


const TABLE_HEAD = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'kitaName', label: 'Kita', alignRight: false},
    {id: ''}
];

interface AppProps {
    groups: IGruppenInformationService
    kitaId: string
    kitaName: string
}

const Gruppen = (props: AppProps) => {

    const [group, setGroup] = useState('');
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // @ts-ignore
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // @ts-ignore
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds: string[] = props.groups.getItems().map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    // @ts-ignore
    const handleFilterByName = (event) => {
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

    return (
        // @ts-ignore
        <Page title="Kita Gruppen">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User
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
                    <TableContainer sx={{minWidth: 800}}>
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
                                                </TableRow>
                                            )
                                        }
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </Page>
    )
}

export default Gruppen