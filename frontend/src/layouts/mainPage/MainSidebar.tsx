import Scrollbar from "../../components/Scrollbar";

import {Link as RouterLink} from 'react-router-dom';

import {styled} from '@mui/material/styles';
import {Avatar, Box, Link, Typography} from '@mui/material';
import Logo from "../../components/Logo";
import NavSection from "../../components/NavSection";
import sidebarConfig from "./SidebarConfig";

import {useContext} from "react";
import {UserCom} from "../../services/UserProvider";

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({theme}) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));


const AccountStyle = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    // @ts-ignore
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
}));

const MainSidebar = () => {

    const {user} = useContext(UserCom)


    return (
        <RootStyle>
            <Scrollbar
                sx={{
                    height: '100%',
                    '& .simplebar-content': {height: '100%', display: 'flex', flexDirection: 'column'}
                }}
            >
                <Box sx={{px: 2.5, py: 3}}>
                    <Box component={RouterLink} to="/" sx={{display: 'inline-flex'}}>
                        <Logo/>
                    </Box>
                </Box>

                <Box sx={{mb: 5, mx: 2.5}}>
                    <Link underline="none" component={RouterLink} to="#">
                        <AccountStyle>
                            <Avatar src={''} alt="photoURL"/>
                            <Box sx={{ml: 2}}>
                                <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
                                    {user.firstName + ' ' + user.lastName}
                                </Typography>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    {user.email}
                                </Typography>
                            </Box>
                        </AccountStyle>
                    </Link>
                </Box>
                <NavSection navConfig={sidebarConfig}/>
            </Scrollbar>
        </RootStyle>
    )
}

export default MainSidebar