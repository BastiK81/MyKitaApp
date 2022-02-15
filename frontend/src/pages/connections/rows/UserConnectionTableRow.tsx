import * as React from "react";
import {useContext, useState} from "react";
import {ConnectorCom, ConnectorItem} from "../../../services/ConnectorProvider";
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
import {userRoles} from "../../../services/UserProvider";
import RowMenu from "./RowMenu";

interface IUserConnectionTableRow {
    row: ConnectorItem
}

const UserConnectionTableRow = (props: IUserConnectionTableRow) => {

    const {
        confirmConnection,
        changeConnection,
        alignment,
        selected,
        handleClickSelect,
        pageSelection
    } = useContext(ConnectorCom);

    const {row} = props

    const {id, userId, kitaId, userStatus, kitaStatus, userRole, implementationDate, expireDate} = row;

    const [selectedUserRole, setSelectedUserRole] = useState(userRole);
    const [hasChanges, setHasChanges] = useState(false);

    const isItemSelected = selected.indexOf(id) !== -1;

    const handleChangeConnection = () => {
        changeConnection(id, selectedUserRole)
    }

    const handleChangeUserRole = (event: SelectChangeEvent) => {
        setSelectedUserRole(event.target.value);
        setHasChanges(event.target.value !== userRole)
    }

    const handleConfirmConnection = () => {
        confirmConnection(id)
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
                    onChange={(event) => handleClickSelect(event, id)}
                />
            </TableCell>
            <TableCell align="left">{userId}</TableCell>
            <TableCell align="left">{kitaId}</TableCell>
            <TableCell align="left">{userStatus}</TableCell>
            <TableCell align="left">{kitaStatus}</TableCell>
            <TableCell align="left">
                {(alignment === 'In Progress' && pageSelection === 'Kita') &&
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
                                <MenuItem key={role.id + 'UserRole'}
                                          id={role.id}
                                          value={role.role}>{role.role}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>}
                {
                    pageSelection === 'User' && <TableCell align="left">{userRole}</TableCell>
                }
            </TableCell>
            <TableCell align="left">{implementationDate}</TableCell>
            <TableCell align="left">{expireDate}</TableCell>
            {hasChanges && <TableCell align="left">
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Icon icon={plusFill}/>}
                    onClick={handleChangeConnection}
                >
                    Change Connection
                </Button>
            </TableCell>}
            {alignment === 'In Progress' && <TableCell align="left">
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Icon icon={plusFill}/>}
                    onClick={handleConfirmConnection}
                >
                    Confirm
                </Button>
            </TableCell>}
            <TableCell align="right">
                <RowMenu connectionId={id}/>
            </TableCell>
        </TableRow>
    )
}

export default UserConnectionTableRow