// material
import {visuallyHidden} from '@mui/utils';
import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from '@mui/material';

import {ChangeEvent, MouseEventHandler} from "react";
import {SortDirection} from "@mui/material/TableCell/TableCell";
import {ITableHead} from "../../../pages/Groups";

// ----------------------------------------------------------------------

interface IUserListHead {
    order: SortDirection,
    orderBy: string,
    rowCount: number,
    headLabel: ITableHead[],
    numSelected: number,
    onRequestSort: (event: MouseEventHandler<HTMLAnchorElement>, property: string) => void,
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function UserListHead({
                                         order,
                                         orderBy,
                                         rowCount,
                                         headLabel,
                                         numSelected,
                                         onRequestSort,
                                         onSelectAllClick
                                     }: IUserListHead) {
    const createSortHandler = (property: string) => (event: MouseEventHandler<HTMLAnchorElement>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headLabel.map((headCell) => (
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
