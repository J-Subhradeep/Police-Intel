import {
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Container,
} from '@mui/material';
import { color } from '../../../GlobalConfig/config';
import Login from './Login';

const AuthMain = () => {

    return (
        <>
            <AppBar sx={{ bgcolor: color.green1, height: { xs: '4.3rem', }, }} position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        {/* Add your menu icon */}
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        SP/DSP Station Login
                    </Typography>
                </Toolbar>
                <Container style={{ width: '30%', marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Login />
                </Container>
            </AppBar>
        </>
    );
};

export default AuthMain;
