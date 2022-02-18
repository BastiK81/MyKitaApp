import {KindItem} from "../../services/KinderProvider";
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import {Avatar, ListItemAvatar} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';

interface GroupKinderListItemProps {
    kindItem: KindItem,
}

const GroupKinderListItem = (props: GroupKinderListItemProps) => {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const {kindItem} = props
    const {firstName, lastName} = kindItem

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={lastName + ' ' + firstName} secondary="Jan 9, 2014"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <SocialDistanceIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Eltern"/>
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    )

}

export default GroupKinderListItem