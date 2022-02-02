
// material
import { Popover } from '@mui/material';
import {alpha, styled, Theme} from '@mui/material/styles';
import React from "react";
import {SxProps} from "@mui/system";

// ----------------------------------------------------------------------

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`
  }
}));

// ----------------------------------------------------------------------

interface IMenuPopover{
  children: React.ReactNode,
  sx?: SxProps<Theme>
  open: boolean
  onClose: () => void
  anchorEl: null | Element
}

export default function MenuPopover({ children, sx, open, onClose, anchorEl,  ...other}:IMenuPopover) {
  return (
    <Popover
        onClose={onClose}
        open={open}
        anchorEl={anchorEl}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.5,
            overflow: 'inherit',
            boxShadow: (theme) => theme.customShadows.z20,
            border: (theme) => `solid 1px ${theme.palette.grey[500]}`,
            width: 200,
            ...sx
          }
        }}
        {...other}    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
}
