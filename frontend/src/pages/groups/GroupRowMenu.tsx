import {useContext, useRef, useState} from "react";
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Icon} from "@iconify/react";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import {Link as RouterLink} from "react-router-dom";
import editFill from "@iconify/icons-eva/edit-fill";
import {GroupCom} from "../../services/GrouopProvider";

interface GroupRowMenuProps {
    groupId: string,
}

const GroupRowMenu = (props: GroupRowMenuProps) => {

    const {getGroupById, deleteGroup, setGroupSettingsId} = useContext(GroupCom);

    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleCLickTrash = () => {
        deleteGroup(props.groupId)
    }

    const handleCLickSettings = () => {
        getGroupById(props.groupId)
        setGroupSettingsId(props.groupId)
    }

    return (
        <>
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Icon icon={moreVerticalFill} width={20} height={20}/>
            </IconButton>

            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: {width: 200, maxWidth: '100%'}
                }}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <MenuItem sx={{color: 'text.secondary'}}
                          onClick={handleCLickTrash}>
                    <ListItemIcon>
                        <Icon icon={trash2Outline} width={24} height={24}/>
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{variant: 'body2'}}/>
                </MenuItem>

                <MenuItem onClick={handleCLickSettings}
                          component={RouterLink} to="/main/groupSettings" sx={{color: 'text.secondary'}}>
                    <ListItemIcon>
                        <Icon icon={editFill} width={24} height={24}/>
                    </ListItemIcon>
                    <ListItemText primary="Edit" primaryTypographyProps={{variant: 'body2'}}/>
                </MenuItem>
            </Menu>
        </>

    )

}

export default GroupRowMenu