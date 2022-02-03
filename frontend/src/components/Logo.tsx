// material
import { Box } from '@mui/material';
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";

// ----------------------------------------------------------------------

interface ILogo{
  sx?: SxProps<Theme>
}


export default function Logo({ sx }:ILogo) {
  return <Box component="img" src="" alt="Logo" sx={{ width: 40, height: 40, ...sx }} />;
}
