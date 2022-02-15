// material
import {visuallyHidden} from '@mui/utils';
import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from '@mui/material';
import {MouseEventHandler, useContext} from "react";
import {ConnectorCom} from "../../../services/ConnectorProvider";

const ConnectionTableHead = () => {

    const {
        selected,
        order,
        orderBy,
        rowsPerPage,
        tableHeads,
        handleSelectAllUserClick,
        handleRequestSort
    } = useContext(ConnectorCom);

    const createSortHandler = (property: string) => (event: MouseEventHandler<HTMLAnchorElement>) => {
        handleRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={selected.length > 0 && selected.length < rowsPerPage}
                        checked={rowsPerPage > 0 && selected.length === rowsPerPage}
                        onChange={handleSelectAllUserClick}
                    />
                </TableCell>
                {tableHeads.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            hideSortIcon
                            active={orderBy === headCell.id}
                            // @ts-ignore
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box sx={{...visuallyHidden}}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default ConnectionTableHead
