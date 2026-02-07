import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography
} from '@mui/material';
import {NavLink} from 'react-router-dom';

const NavBar = () => {

    return (
        <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppBar position="static" color="primary">
                <Container>
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            component={NavLink} to='/'
                            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
                        >
                            Finance Tracker
                        </Typography>

                         <Button
                            sx={{ mx: 'auto', color: 'white' }}
                            variant="outlined"
                            type="button"
                            component={NavLink}
                            to='/categories'
                         >
                            Categories
                         </Button>

                         <Button
                            sx={{ mx: 'auto', color: 'white' }}
                            variant="outlined"
                            type="button"
                         >
                            Orders
                         </Button>
                </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default NavBar;