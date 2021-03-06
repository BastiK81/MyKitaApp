import {Icon} from '@iconify/react';
import {useContext, useRef, useState} from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {Container, IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from '@mui/material';
import {ConnectorCom} from "../../../services/ConnectorProvider";

interface RowMenuProps {
    connectionId: string
    hasChanges: boolean
    id: string
    userRole: string
}

const RowMenu = (props: RowMenuProps) => {

    const {deleteConnection, changeConnection} = useContext(ConnectorCom);
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleCLickTrash = () => {
        deleteConnection(props.connectionId)
    }

    const handleCLickEdit = () => {
        if (props.hasChanges) {
            changeConnection(props.id, props.userRole)
        }
    }

    return (
        <Container>
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
                <MenuItem
                    onClick={handleCLickEdit}
                    sx={{color: 'text.secondary'}}>
                    <ListItemIcon>
                        <Icon icon={editFill} width={24} height={24}/>
                    </ListItemIcon>
                    <ListItemText primary="Edit" primaryTypographyProps={{variant: 'body2'}}/>
                </MenuItem>
                <MenuItem
                    sx={{color: 'text.secondary'}}
                    onClick={handleCLickTrash}>
                    <ListItemIcon>
                        <Icon icon={trash2Outline} width={24} height={24}/>
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{variant: 'body2'}}/>
                </MenuItem>
            </Menu>
        </Container>
    );
}

export default RowMenu
