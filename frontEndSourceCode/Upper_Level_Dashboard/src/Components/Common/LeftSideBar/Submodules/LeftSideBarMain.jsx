import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Grid, Button } from '@mui/material';
import { BarChart, RateReview, Business, Notifications, VpnKey, Gavel, ExitToApp } from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PeopleIcon from '@mui/icons-material/People';
import TaskIcon from '@mui/icons-material/Task';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { baseUrls, color } from '../../../../GlobalConfig/config';
import { Link } from "react-router-dom";
import AssignmentIcon from '@mui/icons-material/Assignment';

const LeftSideBarMain = (props) => {
  const menuItems = [
    { name: 'analytics', label: 'Analytics', icon: <BarChart /> },
    { name: 'fir', label: 'FIR Management', icon: <TaskIcon /> },
    // { name: 'your-task', label: 'Tasks Assigned to You', icon: <PlaylistAddIcon /> },
    { name: 'task-to-subordinates', label: 'Assign Tasks to Subordinates', icon: <PlaylistAddIcon /> },
    { name: 'your-tasks', label: 'Your Tasks', icon: <AssignmentIcon /> },
    { name: 'work-update', label: 'Daily Work of Subordinates', icon: <BusinessCenterIcon /> },
    // { name: 'officers', label: 'Staff Repository', icon: <PeopleIcon /> },
    { name: 'visitor-logbook', label: 'Visitor Log Book', icon: <DirectionsRunIcon /> },
  ];

  const [activeItem, setActiveItem] = useState(props.currentItem);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("psId");
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
            <Link
              to={`/${item.name}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={(e) => {
                handleItemClick(item.name);
              }}
            >
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
            </Link>
            {index < menuItems.length - 1 && <Divider />}
          </div>
        ))}
      </List>
      <Link
        to={`/`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Button
          variant="outlined"
          color="error"
          startIcon={<ExitToApp />}
          onClick={handleLogout}
          sx={{ margin: '16px', alignSelf: 'flex-start' }}
        >
          Log Out
        </Button>
      </Link>
    </Box>
  );
};

export default LeftSideBarMain;
