import * as React from "react";
import {ChangeEvent, useContext} from "react";
import {
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TableCell,
    TableRow
} from "@mui/material";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {UserMoreMenu} from "./gruppen";
import {ConnectorCom} from "../../services/ConnectorProvider";
import {PlaySchoolCom} from "../../services/PlaySchoolProvider";
import {userRoles} from "../../pages/UserConnections";

interface UserConnectionTableBodyProps {
    row: { id: string, firstName: string, lastName: string },
    selected: string[],
    handleClick: (event: ChangeEvent<HTMLInputElement>, name: string) => void
}

const ConnectionTableRowUser = (props: UserConnectionTableBodyProps) => {

    const {playSchoolItem} = useContext(PlaySchoolCom);
    const {addUserConnection} = useContext(ConnectorCom);

    const [selectedUserRole, setSelectedUserRole] = React.useState('');

    const {row, selected, handleClick} = props

    const {id, firstName, lastName} = row;
    const isItemSelected = selected.indexOf(firstName) !== -1;

    const addConnection = () => {
        addUserConnection(row.id, playSchoolItem.id, selectedUserRole)
    }

    const handleChangeUserRole = (event: SelectChangeEvent) => {
        setSelectedUserRole(event.target.value);
    }

    return (
        <TableRow
            hover
            id={'ConnectionTableRowUser' + id}
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

export default ConnectionTableRowUser