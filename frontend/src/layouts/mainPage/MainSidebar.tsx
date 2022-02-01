import Scrollbar from "../../components/Scrollbar";

import {Link as RouterLink} from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar} from '@mui/material';
import Logo from "../../components/Logo";
import account from "../../_mocks_/account";
import NavSection from "../../components/NavSection";
import sidebarConfig from "./SidebarConfig";
import {IUserInformation} from "../../services/UserInformationService";
import {IKitaInformationService} from "../../services/KitaInformationService";

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));


const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    // @ts-ignore
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: theme.palette.grey[200]
}));

interface AppProps{
    userInformation: IUserInformation,
    kitaInformation: IKitaInformationService
}

const MainSidebar = (props:AppProps) => {

    return(
        <RootStyle>
            <Scrollbar
                sx={{
                height: '100%',
                '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
                }}
            >
                <Box sx={{ px: 2.5, py: 3 }}>
                    <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
                        <Logo />
                    </Box>
                </Box>

                <Box sx={{ mb: 5, mx: 2.5 }}>
                    <Link underline="none" component={RouterLink} to="#">
                        <AccountStyle>
                            <Avatar src={account.photoURL} alt="photoURL" />
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                                    {props.userInformation.name + ' ' + props.userInformation.lastName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {props.userInformation.email}
                                </Typography>
                            </Box>
                        </AccountStyle>
                    </Link>
                </Box>
                {/*TODO: Kita Ausblenden bei keine Kita*/}
                <NavSection navConfig={sidebarConfig} />
            </Scrollbar>
        </RootStyle>
    )
}

export default MainSidebar