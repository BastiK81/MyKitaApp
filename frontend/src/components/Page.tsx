
import { Helmet } from 'react-helmet-async';
import React, { forwardRef } from 'react';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

interface PageProps{
    children: React.ReactNode
    title: string
}

const Page = forwardRef(({ children, title = '', ...other }:PageProps, ref) => (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
));

export default Page;
