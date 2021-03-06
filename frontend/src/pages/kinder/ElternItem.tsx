import {Box, Button, IconButton} from "@mui/material";
import React, {useContext} from "react";
import {UserItem} from "../../services/UserProvider";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import {red} from "@mui/material/colors";
import {KindCom, KindItem} from "../../services/KinderProvider";
import {ConnectorCom} from "../../services/ConnectorProvider";

interface ParentsItemProps {
    kind: KindItem
    checked: boolean
    eltern: UserItem
}

const ElternItem = (props: ParentsItemProps) => {

    const {updateParents} = useContext(KindCom);
    const {getAllParents} = useContext(ConnectorCom);

    const handleDelete = () => {
        props.kind.eltern = props.kind.eltern.filter(value => value.id !== props.eltern.id)
        updateParents(props.kind.id, props.kind.eltern)
        getAllParents()
    }

    const handleAdd = () => {
        if (props.kind.eltern === null) {
            props.kind.eltern = []
        }
        props.kind.eltern.push(props.eltern)
        updateParents(props.kind.id, props.kind.eltern)
        getAllParents()
    }

    return (
        <Box
            key={props.eltern.id}
            justifyContent="space-between" sx={{display: 'flex', flexDirection: 'row', ml: 4}}>
            {!props.checked &&
            <Button color="primary">{props.eltern.firstName + " " + props.eltern.lastName}</Button>
            }
            {!props.checked &&
            <IconButton onClick={handleAdd} aria-label="add">
                <AddIcon color="success"/>
            </IconButton>
            }
            {props.checked &&
            <Button color="secondary">{props.eltern.firstName + " " + props.eltern.lastName}</Button>}
            {props.checked &&
            <IconButton onClick={handleDelete} aria-label="delete">
                <ClearIcon sx={{color: red[500]}}/>
            </IconButton>
            }
        </Box>
    )
}

export default ElternItem