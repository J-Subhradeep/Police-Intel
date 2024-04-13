import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Grid, Button } from '@mui/material';
import { BarChart, RateReview, Business, Notifications, VpnKey, Gavel, ExitToApp } from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import TaskIcon from '@mui/icons-material/Task';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { color } from '../../../GlobalConfig/config';

const LeftSideBarMain = (props) => {
  const menuItems = [
    { name: 'analytics', label: 'Analytics', icon: <BarChart /> },
    { name: 'firfrontpage', label: 'FIR Management', icon: <TaskIcon /> },
    { name: 'assignedtask', label: 'Tasks', icon: <AssignmentIcon /> },
    { name: 'addTask', label: 'Assign Tasks', icon: <PlaylistAddIcon /> },
    { name: 'workItems', label: 'Work Items', icon: <BusinessCenterIcon /> },
    // { name: 'officerList', label: 'Staff Repository', icon: <PeopleIcon /> },
    { name: 'visitorLogBook', label: 'Visitor Log Book', icon: <DirectionsRunIcon /> },
  ];

  const [activeItem, setActiveItem] = useState(props.currentItem);

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate(`/${item}`);
    setActiveItem(item);
    // onItemClick(item);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("psId");
    // localStorage.removeItem("userName");
    navigate("/");
    console.log('Logging out...');
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 4.3rem)',
        backgroundColor: '#f0f0f0',
        borderRight: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <List sx={{ padding: '16px' }}>
        {menuItems.map((item, index) => (
          <div key={index}>
            <ListItem
              button
              onClick={() => handleItemClick(item.name)}
              sx={{
                fontWeight: activeItem === item.name ? 'bold' : 'normal',
                color: activeItem === item.name ? color.green1 : 'inherit',
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeItem === item.name ? color.green1 : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
            {index < menuItems.length - 1 && <Divider />}
          </div>
        ))}
      </List>
      <Button
        variant="outlined"
        color="error"
        startIcon={<ExitToApp />}
        onClick={handleLogout}
        sx={{ margin: '16px', alignSelf: 'flex-start' }}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default LeftSideBarMain;
