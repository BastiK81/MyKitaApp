import * as React from "react";
import {useContext} from "react";
import {PlaySchoolItem} from "../../../services/PlaySchoolProvider";
import {ConnectorCom} from "../../../services/ConnectorProvider";
import {Button, Checkbox, TableCell, TableRow} from "@mui/material";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {UserMoreMenu} from "../../../components/pageSupport/gruppen";
import {UserCom} from "../../../services/UserProvider";

interface IUserConnectionTableRowUser {
    row: PlaySchoolItem
}

const UserConnectionTableRowUser = (props: IUserConnectionTableRowUser) => {

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
            <TableCell padding="checkbox">
                <Checkbox
                    checked={isItemSelected}
                    onChange={(event) => handleClickSelect(event, name)}
                />
            </TableCell>
            <TableCell align="left">{name}</TableCell>
            <TableCell align="left">{city}</TableCell>
            <TableCell align="left">
            </TableCell>
            <TableCell align="left">
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

export default UserConnectionTableRowUser