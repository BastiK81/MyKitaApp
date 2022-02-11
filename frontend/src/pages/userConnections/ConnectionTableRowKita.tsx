import * as React from "react";
import {ChangeEvent, useContext, useState} from "react";
import {
    Button,
    Checkbox,
    TableCell,
    TableRow
} from "@mui/material";
import {Icon} from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import {UserMoreMenu} from "../../components/pageSupport/gruppen";
import {ConnectorCom} from "../../services/ConnectorProvider";
import {PlaySchoolCom} from "../../services/PlaySchoolProvider";
import {ITableHead, userRoles} from "./KitaUserConnections";

interface UserConnectionTableBodyProps {
    row: { id: string,
        name: string,
        street: string,
        houseNumber: string,
        postcode: string,
        city: string,
    },
    selected: string[],
    handleClick: (event: ChangeEvent<HTMLInputElement>, name: string) => void
}

const ConnectionTableRowKita = (props: UserConnectionTableBodyProps) => {

    const {playSchoolItem} = useContext(PlaySchoolCom);
    const {addUserConnection} = useContext(ConnectorCom);

    const [selectedUserRole, setSelectedUserRole] = useState('');

    const {row, selected, handleClick} = props

    const {id, name, city} = row;
    const isItemSelected = selected.indexOf(name) !== -1;

    const addConnection = () => {
        addUserConnection(row.id, playSchoolItem.id, selectedUserRole)
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
                    onChange={(event) => handleClick(event, name)}
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

export default ConnectionTableRowKita