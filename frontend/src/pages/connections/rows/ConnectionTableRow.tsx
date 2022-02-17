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
import RowMenu from "./RowMenu";
import {userRoles} from "../../../services/UserProvider";

interface IUserConnectionTableRow {
    row: ConnectorItem
}

const ConnectionTableRow = (props: IUserConnectionTableRow) => {

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
            <TableCell key={'checkbox'} id={'checkbox'} padding="checkbox">
                <Checkbox
                    checked={isItemSelected}
                    onChange={(event) => handleClickSelect(event, id)}
                />
            </TableCell>
            <TableCell key={'user'} id={'user'} align="left">{userId}</TableCell>
            <TableCell key={'kita'} align="left">{kitaId}</TableCell>
            <TableCell key={'userstatus'} id={'userstatus'} align="left">{userStatus}</TableCell>
            <TableCell key={'kitastatus'} id={'kitastatus'} align="left">{kitaStatus}</TableCell>
            <TableCell key={'role'} id={'role'} align="left">
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
            <TableCell key={'impdate'} id={'impdate'} align="left">{implementationDate}</TableCell>
            <TableCell key={'expdate'} id={'expdate'} align="left">{expireDate}</TableCell>
            {hasChanges && <TableCell id={'changes'} align="left">
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Icon icon={plusFill}/>}
                    onClick={handleChangeConnection}
                >
                    Change Connection
                </Button>
            </TableCell>}
            {alignment === 'In Progress' &&
            <TableCell key={'submit'} id={'submit'} align="left">
                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Icon icon={plusFill}/>}
                    onClick={handleConfirmConnection}
                >
                    Confirm
                </Button>
            </TableCell>}
            <TableCell key={'menu'} id={'menu'} align="right">
                <RowMenu connectionId={id}/>
            </TableCell>
        </TableRow>
    )
}

export default ConnectionTableRow