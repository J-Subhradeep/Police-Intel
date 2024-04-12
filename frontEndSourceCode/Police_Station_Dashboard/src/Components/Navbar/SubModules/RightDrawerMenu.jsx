import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useState } from 'react';
import { useEffect } from 'react';
import { Badge } from '@mui/material';
import axios from 'axios';


export default function RightDrawerMenu() {





    const [socketUrl, setSocketUrl] = useState('wss://websocket.web-project.in/ws/notification/2');
    const [messageHistory, setMessageHistory] = useState([]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    // const [messages, setMessages] = useState([])
    const [badge, setBadge] = useState(0)

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
            console.log(lastMessage.data)
            // setMessages(messages.push({
            //     message: lastMessage.data.message,
            //     unread_count: lastMessage.data.unread_count
            // }))
            let data = JSON.parse(lastMessage.data)
            setBadge(data.unread_count)
            // console.log(lastMessage.data.unread_count)

        }
        console.log(messageHistory)
        // setMessages(messages.push({
        //     message : lastMessage.MessageEvent.data.message,
        //     unread_count : lastMessage.MessageEvent.data.message.unread_count
        // }))
        // getNotification()
    }, [lastMessage, setMessageHistory]);

    // const handleClickChangeSocketUrl = useCallback(
    //     () => setSocketUrl('wss://websocket.web-project.in/ws/notification/2 '),
    //     []
    // );

    // const handleClickSendMessage = React.useCallback(() => sendMessage('Hello'), []);

    const [message,  setMessage] = useState([])


    async function getNotification() {
        try {
            const recieved = await axios({
                method: 'get',
                url: `https://test.web-project.in/unit/notification/getall/${localStorage.getItem('PsId')}`,

            });

            // setIsError({
                // error: true,
                // message: 'Notification Sent',
                // type: 'success'
            // })
            setMessage(recieved.data)
            console.log(recieved.data)

        } catch (error) {
            // setIsError({
            //     error: true,
            //     message: 'Something went wrong',
            //     type: 'error'
            // })
            console.error('Error:', error);
        }
    }




    const [state, setState] = React.useState(false);
    const [expandedIndex, setExpandedIndex] = React.useState(null);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }


        setState(open);

        getNotification()
    };

    const notifications = [
        'New message received.',
        'Task assigned to you.',
        'Meeting scheduled for tomorrow.',
        'You have 5 new emails.',
    ];

    const NotificationCard = ({ message, index }) => (
        <Card
            onClick={(e) => {
                e.stopPropagation(); // Stop the event propagation to prevent closing the drawer
                setExpandedIndex(expandedIndex === index ? null : index);
            }}
            style={{ marginBottom: 8, cursor: 'pointer' }}
        >
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {expandedIndex === index ? message : `${message.slice(0, 20)}${message.length > 20 ? '...' : ''}`}
                </Typography>
            </CardContent>
        </Card>
    );

    const drawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                <NotificationsIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Notifications</Typography>
            </Box>
            {message.map((message, index) => (
                <NotificationCard key={index} index={index} message={message} />
            ))}
            <Divider />
            <List>
                {/* Your other menu items go here */}
            </List>
        </Box>
    );

    return (
        <>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton onClick={toggleDrawer(true)} sx={{ mx: 1, mb: 0.86, color: 'white', display: { xs: 'block' } }}>
                    <Badge badgeContent={badge} color="secondary">
                        <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state}
                        onClose={toggleDrawer(false)}
                    >
                        {drawerContent}
                    </Drawer>
                </React.Fragment>
            ))}
        </>
    );
}
