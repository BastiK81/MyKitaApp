import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import MainSidebar from "./MainSidebar";
import MainNavbar from "./MainNavbar";
import {IUserInformation} from "../../services/UserInformationService";
import {IKitaInformationService} from "../../services/KitaInformationService";


//

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

interface AppProps{
    userInformation: IUserInformation,
    kitaInformation: IKitaInformationService
}

const MainLayout = (props:AppProps) => {

  return (
    <RootStyle>
      <MainNavbar />
      <MainSidebar userInformation={props.userInformation} kitaInformation={props.kitaInformation}/>

      <MainStyle>
          <Outlet />
      </MainStyle>
    </RootStyle>
  );
}

export default MainLayout
