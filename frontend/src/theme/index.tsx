import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
// material
import {CssBaseline, PaletteMode, ThemeOptions} from '@mui/material';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import shape from './shape';
import palette, {IGREY} from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, {customShadows, ICustomShadows} from './shadows';
import {Mixins} from "@mui/material/styles/createMixins";
import {
    ColorPartial,
    CommonColors,
    PaletteColorOptions,
    PaletteTonalOffset, TypeAction, TypeBackground,
    TypeText
} from "@mui/material/styles/createPalette";

// ----------------------------------------------------------------------

interface ThemeProps{
    children: React.ReactNode
}

declare module '@mui/material/styles' {
    interface Theme {
        customShadows: ICustomShadows
        shape:{borderRadius:number, borderRadiusSm:number, borderRadiusMd:number}
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        customShadows: ICustomShadows
        shape:{borderRadius:number, borderRadiusSm:number, borderRadiusMd:number}
    }
}


export default function ThemeConfig({ children }:ThemeProps) {
  const themeOptions:ThemeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
