import {useContext, useRef, useState} from "react";
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Icon} from "@iconify/react";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import {Link as RouterLink} from "react-router-dom";
import editFill from "@iconify/icons-eva/edit-fill";
import {KindCom, KindItem} from "../../services/KinderProvider";

interface KinderRowMenuProps {
    kind: KindItem,
}

const KinderRowMenu = (props: KinderRowMenuProps) => {

    const {deleteKind, resetKindItem} = useContext(KindCom);

    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleCLickTrash = () => {
        deleteKind(props.kind.id)
    }

    const handleCLickSettings = () => {
        resetKindItem(props.kind)
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
                          component={RouterLink} to="/main/kindSettings" sx={{color: 'text.secondary'}}>
                    <ListItemIcon>
                        <Icon icon={editFill} width={24} height={24}/>
                    </ListItemIcon>
                    <ListItemText primary="Edit" primaryTypographyProps={{variant: 'body2'}}/>
                </MenuItem>
            </Menu>
        </>

    )

}

export default KinderRowMenu