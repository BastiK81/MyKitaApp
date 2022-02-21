import {Card, Stack} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from '@mui/material/List';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ElternItem from "./ElternItem";
import {ConnectorCom} from "../../services/ConnectorProvider";
import {KindItem} from "../../services/KinderProvider";
import {UserItem} from "../../services/UserProvider";

interface ParentsProps {
    kind: KindItem,
}

const Eltern = (props: ParentsProps) => {

    const {parentUser, getAllParents} = useContext(ConnectorCom);

    useEffect(() => {
        getAllParents()
        // eslint-disable-next-line
    }, []);

    const [openConnected, setOpenConnected] = useState(false);
    const [openAvailable, setOpenAvailable] = useState(false);

    const connectedParents = () => {
        if (props.kind.eltern !== null) {
            return props.kind.eltern.length
        } else {
            return 0
        }
    }

    const handleClickAvailable = () => {
        setOpenAvailable(!openAvailable);
    };

    const handleClickConnected = () => {
        setOpenConnected(!openConnected);
    };

    const getAvailableUser = () => {
        let users: UserItem[] = []
        if (props.kind.eltern !== null) {
            parentUser.forEach(
                (user => {
                    let match = false
                    props.kind.eltern.forEach(
                        (item) => {
                            if (item.id === user.id) {
                                match = true
                            }
                        })
                    if (!match) {
                        users.push(user)
                    }
                }))
        } else {
            users = parentUser
        }
        return users
    }

    return (
        <Card>
            <Stack spacing={3} padding={3}>
                <List
                    key={'Eltern Übersicht'}
                    sx={{width: '100%', bgcolor: 'background.paper'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Eltern Übersicht
                        </ListSubheader>
                    }
                >
                    <ListItemButton
                        key={'Connected Eltern'}
                        onClick={handleClickConnected}>
                        <ListItemText primary={'Connected Eltern'}
                                      secondary={connectedParents() + " User Connected"}/>
                        {openConnected ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>

                    <Collapse in={openConnected} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {props.kind.eltern !== null &&
                            props.kind.eltern.map((user => {
                                return (
                                    <ElternItem kind={props.kind} eltern={user} checked={true}/>
                                )
                            }))
                            }
                        </List>
                    </Collapse>
                    <ListItemButton
                        key={'Available User'}
                        onClick={handleClickAvailable}>
                        <ListItemText primary={'Available User'}
                                      secondary={getAvailableUser().length + ' User Available'}/>
                        {openAvailable ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>

                    <Collapse in={openAvailable} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {parentUser !== null && getAvailableUser().map((user) => <ElternItem kind={props.kind}
                                                                                                 eltern={user}
                                                                                                 checked={false}/>)}
                        </List>
                    </Collapse>
                </List>
            </Stack>
        </Card>
    )

}

export default Eltern