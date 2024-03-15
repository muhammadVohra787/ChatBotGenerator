import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

export default function PermanentDrawerRight() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Container
          maxWidth="sm"
          sx={{
            bgcolor: "background.paper",
            boxShadow: 3,
            overflowY: "auto",
            maxHeight: "calc(100vh - 64px)",
            flexGrow: 1,
          }}
        >
          <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <FirstWrapper
              tasks={dataSet}
              onDelete={handleDeleteItem}
              onClick={handleItemClick}
            />
          </DndContext>
        </Container>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider />
        <Box role="presentation">
      <List>
        {allItems.map((text, index) => (
          <div key={index}>
            <ListItem key={index} disablePadding>
              <ListItemText
                primary={text.thumb}
                onClick={() => {
                  handleAddItem(text.title, text.type);
                }}
              />
            </ListItem>
          </div>
        ))}
      </List>
      <Divider />
    </Box>
      </Drawer>
    </Box>
  );
}