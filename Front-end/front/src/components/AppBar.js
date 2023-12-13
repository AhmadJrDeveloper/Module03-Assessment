import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import { Colors } from '../styles/theme';


import { DrawerWidth
 } from '../styles/theme';
function AppBar({open, handleDrawerOpen}) {
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
      })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          width: `calc(100% - ${DrawerWidth}px)`,
          marginLeft: `${DrawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }));
  return (
<AppBar position="fixed"  elevation= {0} open={open}>
        <Toolbar>
          <IconButton
            color={Colors.black}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {!open &&<Typography  color = {Colors.black} 
            fontWeight={'bold'}
          variant="h6" noWrap component="div">
            Codi
          </Typography>}
        </Toolbar>
      </AppBar>  )
}

export default AppBar