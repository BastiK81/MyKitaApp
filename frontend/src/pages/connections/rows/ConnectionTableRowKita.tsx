import * as React from "react";
import {useContext, useState} from "react";
import {KitaCom} from "../../../services/KitaProvider";
import {ConnectorCom} from "../../../services/ConnectorProvider";
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
import {UserItem, userRoles} from "../../../services/UserProvider";

interface IUserConnectionTableRowKita {
    row: UserItem
}

const ConnectionTableRowKita = (props: IUserConnectionTableRowKita) => {

    const {kitaItem} = useContext(KitaCom);
    const {addKitaConnection, selected, handleClickSelect} = useContext(ConnectorCom);

    const {row} = props
    const [selectedUserRole, setSelectedUserRole] = useState('');

    const {id, firstName, lastName} = row;

    const isItemSelected = selected.indexOf(firstName) !== -1;

    const addConnection = () => {
        addKitaConnection(id, kitaItem.id, selectedUserRole)
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
                    onChange={(event) => handleClickSelect(event, firstName)}
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
        </TableRow>
    )


}

export default ConnectionTableRowKita