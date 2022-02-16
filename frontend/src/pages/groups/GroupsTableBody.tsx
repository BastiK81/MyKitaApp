import {Checkbox, TableBody, TableCell, TableRow} from "@mui/material";
import * as React from "react";
import {ChangeEvent, useContext} from "react";
import {GroupCom} from "../../services/GrouopProvider";
import GroupRowMenu from "./GroupRowMenu";

const GroupsTableBody = () => {

    const {page, rowsPerPage, selected, setSelected, groupItems} = useContext(GroupCom);

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groupItems.length) : 0;

    return (
        <TableBody>
            {groupItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                        const {id, name, kitaName, kinder} = row;
                        const isItemSelected = selected.indexOf(name) !== -1;
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
                                        onChange={(event) => handleClick(event, name)}
                                    />
                                </TableCell>
                                <TableCell align="left">{name}</TableCell>
                                <TableCell align="left">{kitaName}</TableCell>
                                <TableCell align="left">{'Anzahl Kinder ' + kinder.length}</TableCell>
                                <TableCell align="right">
                                    <GroupRowMenu groupId={id}/>
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
    )
}

export default GroupsTableBody