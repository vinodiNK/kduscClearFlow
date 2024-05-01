import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../listItems';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteIcon from '@mui/icons-material/Delete';
import FullScreenDialog from '../FullScreenDialog';
import LogoutIcon from '@mui/icons-material/Logout';
import AddClearenceRecord from './AddClearenceRecord';
import CollapsibleTable from './CollapsibleTable';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from '../firebaseConfig';
firebase.initializeApp(firebaseConfig);


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const defaultTheme = createTheme();


export default function Dashboard({ titlePlace, setAuthenticated }) {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [addClearencedialogOpen, setAddClearenceDialogOpen] = React.useState(false);
    const [viewClearencedialogOpen, setViewClearenceDialogOpen] = React.useState(false);

    const handleAddClearanceClickOpen = () => {
        setAddClearenceDialogOpen(true);
    };

    const handleAddClearanceClose = () => {
        setAddClearenceDialogOpen(false);
    };

    const handleViewClearanceClickOpen = () => {
        setViewClearenceDialogOpen(true)
    };

    const handleViewClearanceClose = () => {
        setViewClearenceDialogOpen(false)
    };

    const handleLogout = () => {
        // Sign out user from Firebase
        firebase.auth()
            .signOut()
            .then(() => {
                console.log('User signed out successfully');
                localStorage.removeItem('isAuthenticated');
                setAuthenticated(false)
            })
            .catch((error) => {
                console.error('Error signing out:', error.message);
            });
    };
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Clear Flow
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            <LogoutIcon sx={{ mr: 1 }} /> Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Toolbar />
                    <Box textAlign="center" sx={{ marginTop: "10px" }} >
                        <Typography variant="h3" component="h3" sx={{ fontFamily: 'Marhely, sans-serif' }}>
                            {titlePlace}
                        </Typography>
                    </Box>


                    <Grid container justifyContent="center" alignItems="center" spacing={1} sx={{
                        height: '100vh',

                    }}>
                        <Grid item xs={12} md={5} style={{ height: isMediumScreen ? '24vw' : '30vh' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '10px 20px',
                                    borderTopLeftRadius: '100px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: '#2196f3', // Primary button color
                                    color: 'white', // Text color
                                    width: '100%', // Ensure full width
                                    height: '100%',
                                    textAlign: 'center', // Center text
                                }}
                                onClick={handleAddClearanceClickOpen}
                            >
                                <AddIcon style={{ fill: 'white', width: isMediumScreen ? '110px' : '70px', height: isMediumScreen ? '110px' : '70px' }} />
                                <span style={{ marginLeft: '10px', fontSize: isMediumScreen ? '35px' : '20px' }}>Add Asset Record</span>
                            </div>
                        </Grid>


                        <Grid item xs={12} md={5} style={{ height: isMediumScreen ? '24vw' : '30vh' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '10px 20px',
                                    borderBottomRightRadius: '100px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: '#ff9800', // Warning button color
                                    color: 'white', // Text color
                                    width: '100%', // Ensure full width
                                    height: '100%',
                                    textAlign: 'center', // Center text
                                }}
                                onClick={handleViewClearanceClickOpen}
                            >
                                <ViewListIcon style={{ fill: 'white', width: isMediumScreen ? '110px' : '70px', height: isMediumScreen ? '110px' : '70px' }} />
                                <span style={{ marginLeft: '10px', fontSize: isMediumScreen ? '35px' : '20px' }}>View Asset Records</span>
                            </div>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
            <FullScreenDialog
                dialogOpen={addClearencedialogOpen}
                handleClickOpen={handleAddClearanceClickOpen}
                handleClose={handleAddClearanceClose}
                title="Add Asset Record"
                contentComponent={<AddClearenceRecord action="add" place={titlePlace} />}
            />

            <FullScreenDialog
                dialogOpen={viewClearencedialogOpen}
                handleClickOpen={handleViewClearanceClickOpen}
                handleClose={handleViewClearanceClose}
                title="View Asset Records"
                contentComponent={<CollapsibleTable place={titlePlace} />}
            />

        </ThemeProvider>
    );
}
