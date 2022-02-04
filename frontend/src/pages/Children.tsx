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
    TextField,
    Typography
} from "@mui/material";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {UserListHead, UserListToolbar, UserMoreMenu} from "../components/pageSupport/gruppen";
import {GroupServiceImpl} from "../services/GroupService";
import * as React from "react";
import {ChangeEvent, FormEvent, MouseEventHandler, useEffect, useState} from "react";
import {SortDirection} from "@mui/material/TableCell/TableCell";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../forRefactoring/components/SearchNotFound";
import {ChildServiceImpl} from "../services/ChildService";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DatePicker} from "@mui/lab";

export interface ITABLE_HEAD {
    id: string,
    label: string,
    alignRight: boolean
}

const TABLE_HEAD: ITABLE_HEAD[] = [
    {id: 'firstName', label: 'Name', alignRight: false},
    {id: 'lastName', label: 'Last Name', alignRight: false},
    {id: 'dateOfBirth', label: 'Date of birth', alignRight: false},
    {id: 'parents', label: 'Parents', alignRight: false},
    {id: 'kitaId', label: 'Kita', alignRight: false},
    {id: 'groupId', label: 'Group', alignRight: false},
];

interface AppProps {
    children: ChildServiceImpl
    groupService: GroupServiceImpl
    playSchoolId: string
    playSchoolName: string
}

const Children = (props: AppProps) => {

    useEffect(() => {
        props.children.refreshAllChildren(props.playSchoolId)
        props.groupService.refreshAllGroups(props.playSchoolId)
    }, []);

    const [showAddChild, setShowAddChild] = useState(false)
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState<SortDirection>('asc');
    const [selected, setSelected] = useState<string[]>([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.groupService.getAllGroups().length) : 0;

    const isUserNotFound = props.children.getAllChildren().length === 0;


    const handleRequestSort = (event: MouseEventHandler<HTMLAnchorElement>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: string[] = props.children.getAllChildren().map((n) => n.firstName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleFilterByName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFilterName(event.target.value);
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

    const addChildShow = () => {
        setShowAddChild(!showAddChild)
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date());
    const [selectedGroup, setSelectedGroup] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedGroup(event.target.value as string);
    };

    const addChild = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            parents: [''],
            kitaId: props.playSchoolId,
            groupId: selectedGroup
        }
        props.children.addChild(data)
    }

    const getGroupName = (groupId: string): string => {
        if (groupId === "") {
            return ""
        }
        return props.groupService.getAllGroups().filter(group => group.id === groupId)[0].name
    }

    return (
        <Page title="Kita Gruppen">
            <Container>
                <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} spacing={2}>
                        <Typography variant="h4" gutterBottom>
                            Kita Childs
                        </Typography>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<Icon icon={plusFill}/>}
                            onClick={addChildShow}
                        >
                            Add Child
                        </Button>
                    </Stack>
                    {
                        showAddChild &&
                        <Card>
                            <Stack padding={2}>
                                <form onSubmit={addChild}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="First Name"
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Last Name"
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                disableFuture
                                                label="Date of Birth"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                value={dateOfBirth}
                                                onChange={(newValue) => {
                                                    setDateOfBirth(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        <FormControl>
                                            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                label="Age"
                                                value={selectedGroup}
                                                onChange={handleChange}
                                            >
                                                {props.groupService.getAllGroups().map((item) => {
                                                    return (
                                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<Icon icon="mdi:content-save"/>}
                                        >
                                            Add Child
                                        </Button>
                                    </Stack>
                                </form>
                            </Stack>
                        </Card>
                    }

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
                                        headLabel={TABLE_HEAD}
                                        rowCount={props.groupService.getAllGroups().length}
                                        numSelected={selected.length}
                                        onRequestSort={handleRequestSort}
                                        onSelectAllClick={handleSelectAllClick}
                                    />
                                    <TableBody>
                                        {props.children.getAllChildren()
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                    const {
                                                        id,
                                                        firstName,
                                                        lastName,
                                                        dateOfBirth,
                                                        parents,
                                                        groupId
                                                    } = row;
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
                                                                    onChange={(event) => handleClick(event, id)}
                                                                />
                                                            </TableCell>
                                                            <TableCell align="left">{firstName}</TableCell>
                                                            <TableCell align="left">{lastName}</TableCell>
                                                            <TableCell align="left">{dateOfBirth}</TableCell>
                                                            <TableCell align="left">{parents}</TableCell>
                                                            <TableCell align="left">{props.playSchoolName}</TableCell>
                                                            <TableCell align="left">{getGroupName(groupId)}</TableCell>
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
                            count={props.children.getAllChildren().length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                </Stack>
            </Container>
        </Page>
    )
}

export default Children