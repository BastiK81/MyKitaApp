import {Card, Stack} from "@mui/material";
import React, {useContext, useEffect} from "react";
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

interface ParentsProps {
    kind: KindItem,
}

const Eltern = (props: ParentsProps) => {

    const {parentUser, getAllParents} = useContext(ConnectorCom);

    useEffect(() => {
        getAllParents()
        // eslint-disable-next-line
    }, []);

    const [openConnected, setOpenConnected] = React.useState(false);
    const [openAvailable, setOpenAvailable] = React.useState(false);

    const handleClickAvailable = () => {
        setOpenAvailable(!openAvailable);
    };

    const handleClickConnected = () => {
        setOpenConnected(!openConnected);
    };

    return (
        <>
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
                                          secondary={props.kind.eltern.length + " User Connected"}/>
                            {openConnected ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={openConnected} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
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
                            <ListItemText primary={'Available User'} secondary={parentUser.length + ' User Available'}/>
                            {openAvailable ? <ExpandLess/> : <ExpandMore/>}
                        </ListItemButton>

                        <Collapse in={openAvailable} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    parentUser.map((user => {
                                        return (
                                            <ElternItem kind={props.kind} eltern={user} checked={false}/>
                                        )
                                    }))
                                }

                            </List>
                        </Collapse>
                    </List>
                </Stack>
            </Card>
        </>
    )

}

export default Eltern