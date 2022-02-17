import * as React from "react";
import {useContext} from "react";
import {KitaItem} from "../../../services/KitaProvider";
import {ConnectorCom} from "../../../services/ConnectorProvider";
import {Button, Checkbox, TableCell, TableRow} from "@mui/material";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {UserCom} from "../../../services/UserProvider";

interface IUserConnectionTableRowUser {
    row: KitaItem
}

const ConnectionTableRowUser = (props: IUserConnectionTableRowUser) => {

    const {user} = useContext(UserCom);
    const {addUserConnection, selected, handleClickSelect} = useContext(ConnectorCom);

    const {row} = props

    const {id, name, city} = row;

    const isItemSelected = selected.indexOf(name) !== -1;

    const addConnection = () => {
        addUserConnection(user.id, id)
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
            <TableCell id={'checkbox'} padding="checkbox">
                <Checkbox
                    checked={isItemSelected}
                    onChange={(event) => handleClickSelect(event, name)}
                />
            </TableCell>
            <TableCell id={'name'} align="left">{name}</TableCell>
            <TableCell id={'city'} align="left">{city}</TableCell>
            <TableCell id={'add'} align="left">
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

export default ConnectionTableRowUser