import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Grid, Button } from '@mui/material';
import { BarChart, RateReview, Business, Notifications, VpnKey, Gavel, ExitToApp } from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import TaskIcon from '@mui/icons-material/Task';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { baseUrls } from '../../../../GlobalConfig/config';
import { Link } from "react-router-dom";

const LeftSideBarMain = (props) => {
  const menuItems = [
    { name: 'analytics', label: 'Analytics', icon: <BarChart /> },
    { name: 'fir', label: 'FIR Management', icon: <TaskIcon /> },
    { name: 'your-task', label: 'Tasks Assigned to You', icon: <PlaylistAddIcon /> },
    { name: 'work-update', label: 'Daily Work Update', icon: <BusinessCenterIcon /> },
    { name: 'officers', label: 'Staff Repository', icon: <PeopleIcon /> },
    { name: 'visitor-logbook', label: 'Visitor Log Book', icon: <DirectionsRunIcon /> },
  ];

  const [activeItem, setActiveItem] = useState(props.currentItem);

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("psId");
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
            <Link
              to={`/${item.name}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={(e) => {
                handleItemClick(item.name);
              }}
            >
              <ListItem
                sx={{
                  fontWeight: activeItem === item.name ? 'bold' : 'normal',
                  color: activeItem === item.name ? '#2196f3' : 'inherit',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activeItem === item.name ? '#2196f3' : 'inherit',
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
