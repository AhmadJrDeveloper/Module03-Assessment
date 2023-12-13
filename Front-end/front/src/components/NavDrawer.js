import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DrawerWidth, Colors } from '../styles/theme';
import AppBar from './AppBar';
import ArticleIcon from '@mui/icons-material/Article';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const MyListItemButton = ({selected, icon, text , handleNavbarItemClicked}) => (
<ListItemButton
    onClick={() => handleNavbarItemClicked(text)}
    sx ={{
        ...(selected && {
            background: Colors.white,
            borderRadius:2,
            fontWeight: 'bold',
            color: Colors.black
        })
    }}
>
                <ListItemIcon sx={{color:selected && Colors.primary}}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
);

export default function NavDrawer({open, setOpen}) {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = React.useState('');
  const navigate = useNavigate();


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavbarItemClicked = (item) => {
    setSelectedItem(item);
    navigate(item);
}

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen}/>
      <Drawer
        sx={{
          width: DrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DrawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        {open &&<Typography  color = {Colors.black} 
            fontWeight={'bold'}
          variant="h6" noWrap component="div">
            Codi
          </Typography>}

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem  disablePadding>
              <MyListItemButton 
              text={"Display Articles"}
              icon={<ArticleIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes("Display Articles")}
                
              />
            </ListItem>
            
            <ListItem  disablePadding>
              <MyListItemButton 
              text={"Manage Articles"}
              icon={<ArticleIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('Manage Articles')}
                
              />
            </ListItem>
            <ListItem  disablePadding>
              <MyListItemButton 
              text={"Manage Specific Articles"}
              icon={<ArticleIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes('Manage Specific Articles')}
                
              />
            </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}