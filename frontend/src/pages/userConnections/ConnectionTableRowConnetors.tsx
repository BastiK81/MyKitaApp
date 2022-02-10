import * as React from "react";
import {ChangeEvent, useContext, useState} from "react";
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
import {UserMoreMenu} from "../../components/pageSupport/gruppen";
import {ConnectorCom} from "../../services/ConnectorProvider";
import {PlaySchoolCom} from "../../services/PlaySchoolProvider";
import {userRoles} from "./UserConnections";

interface ConnectionTableRow {
    id: string,
    userId: string,
    kitaId: string,
    userStatus: string,
    kitaStatus: string,
    userRole: string,
    implementationDate: Date,
    expireDate: Date,
}

interface UserConnectionTableBodyProps {
    row: ConnectionTableRow,
    selected: string[],
    handleClick: (event: ChangeEvent<HTMLInputElement>, name: string) => void
}

const ConnectionTableRowUser = (props: UserConnectionTableBodyProps) => {

    const {playSchoolItem} = useContext(PlaySchoolCom);
    const {addUserConnection} = useContext(ConnectorCom);

    const {row, selected, handleClick} = props

    const {id, userId, kitaId, userStatus, kitaStatus, userRole, implementationDate, expireDate} = row;

    const [selectedUserRole, setSelectedUserRole] = useState(userRole);
    const [hasChanges, setHasChanges] = useState(false);

    const isItemSelected = selected.indexOf(id) !== -1;

    const addConnection = () => {
        addUserConnection(row.id, playSchoolItem.id, selectedUserRole)
    }

    const handleChangeUserRole = (event: SelectChangeEvent) => {
        setSelectedUserRole(event.target.value);
        setHasChanges(event.target.value !== userRole)
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
                    onChange={(event) => handleClick(event, id)}
                />
            </TableCell>
            <TableCell align="left">{userId}</TableCell>
            <TableCell align="left">{kitaId}</TableCell>
            <TableCell align="left">{userStatus}</TableCell>
            <TableCell align="left">{kitaStatus}</TableCell>
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
                                <MenuItem key={role.id+'UserRole'}
                                    id={role.id}
                                          value={role.role}>{role.role}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell align="left">{implementationDate}</TableCell>
            <TableCell align="left">{expireDate}</TableCell>
            {hasChanges && <TableCell align="left">
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Icon icon={plusFill}/>}
                    onClick={addConnection}
                >
                    Change Connection
                </Button>
            </TableCell>}
            <TableCell align="right">
                <UserMoreMenu/>
            </TableCell>
        </TableRow>
    )
}

export default ConnectionTableRowUser