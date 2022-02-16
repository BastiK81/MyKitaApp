import {motion} from 'framer-motion';
// material
import {Box} from '@mui/material';
//
import React from "react";
import {varWrapEnter} from "./variants/Wrap";

// ----------------------------------------------------------------------

interface MotionContainerProps {
    children: React.ReactNode
    open: boolean
}

const MotionContainer = ({open, children, ...other}: MotionContainerProps) => {

    return (
        <Box
            component={motion.div}
            initial={false}
            animate={open ? 'animate' : 'exit'}
            variants={varWrapEnter}
            {...other}
        >
            {children}
        </Box>
    );
}

export default MotionContainer
