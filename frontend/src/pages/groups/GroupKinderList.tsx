import * as React from 'react';
import {useContext} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import {GroupCom} from "../../services/GrouopProvider";
import {KindItem} from "../../services/KinderProvider";
import GroupKinderListItem from "./GroupKinderListItem";

const GroupKinderList = () => {

    const {groupItem} = useContext(GroupCom);

    return (
        <List
            sx={{width: '100%', bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Kinder Übersicht
                </ListSubheader>
            }
        >
            {
                groupItem.kinder.map((kind: KindItem) => {
                    return (
                        <GroupKinderListItem kindItem={kind}/>
                    )
                })}
        </List>
    );
}

export default GroupKinderList