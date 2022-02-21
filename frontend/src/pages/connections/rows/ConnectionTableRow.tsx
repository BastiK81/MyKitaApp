import * as React from "react";
import {useContext, useEffect, useState} from "react";
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
import {UserCom, userRoles} from "../../../services/UserProvider";
import {KitaCom} from "../../../services/KitaProvider";

interface IUserConnectionTableRow {
    row: ConnectorItem
}

const ConnectionTableRow = (props: IUserConnectionTableRow) => {

    const {
        confirmConnection,
        alignment,
        selected,
        handleClickSelect,
        pageSelection
    } = useContext(ConnectorCom);
    const {kitaItem} = useContext(KitaCom);
    const {allUser, refreshAllUser} = useContext(UserCom);

    useEffect(() => {
        refreshAllUser('VISIBLE')
        // eslint-disable-next-line
    }, []);

    const {row} = props

    const {id, userId, userStatus, kitaStatus, userRole, implementationDate, expireDate} = row;

    const [selectedUserRole, setSelectedUserRole] = useState(userRole);
    const [hasChanges, setHasChanges] = useState(false);

    const isItemSelected = selected.indexOf(id) !== -1;

    const handleChangeUserRole = (event: SelectChangeEvent) => {
        setSelectedUserRole(event.target.value);
        setHasChanges(event.target.value !== userRole)
    }

    const handleConfirmConnection = () => {
        confirmConnection(id)
    }

    const getUserName = (userId: String) => {
        let username = userId
        allUser.forEach((user) => {
            if (user.id === userId) {
                username = user.firstName + " " + user.lastName
            }
        })
        return username
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
            <TableCell key={'user'} id={'user'} align="left">{getUserName(userId)}</TableCell>
            <TableCell key={'kita'} align="left">{kitaItem.name}</TableCell>
            <TableCell key={'userstatus'} id={'userstatus'} align="left">{userStatus}</TableCell>
            <TableCell key={'kitastatus'} id={'kitastatus'} align="left">{kitaStatus}</TableCell>
            <TableCell key={'role'} id={'role'} align="left">
                {(pageSelection === 'Kita') &&
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
                <RowMenu id={id} hasChanges={hasChanges} userRole={selectedUserRole} connectionId={id}/>
            </TableCell>
        </TableRow>
    )
}

export default ConnectionTableRow