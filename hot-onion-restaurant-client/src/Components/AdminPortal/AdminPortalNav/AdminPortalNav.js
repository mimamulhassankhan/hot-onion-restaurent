import React, { useState } from 'react';
import {  Image, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSignOutAlt, faList, faComment, faPlus, faLockOpen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
// import OrderForm from '../../UserDashBoard/OrderForm/OrderForm';
// import ServiceConsumed from '../../UserDashBoard/ServiceConsumed/ServiceConsumed';
// import GiveReview from '../../UserDashBoard/GiveReview/GiveReview';
// import AdminServiceList from '../../AdminDashboard/AdminServiceList/AdminServiceList';
// import AddService from '../../AdminDashboard/AddService/AddService';
//import MakeAdmin from '../../AdminDashboard/MakeAdmin/MakeAdmin';
import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { handleSignOut } from '../../TitleBar/signoutManager';
import AddRestaurant from '../AddRestaurant/AddRestaurant';
import LiveSell from '../LiveSell/LiveSell';
import DailySellReport from '../DailySellReport/DailySellReport';
import RestaurantList from '../RestaurantList/RestaurantList';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#e5e5e5',
  },
}));

const DashboardNav = ({user}) => {
    const classes = useStyles();
    const {serviceId} = useParams() || {serviceId: -1};
    //const {role} = user;
    
    const location = useLocation();
    const history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };

    const [selectedOption, setSelectedOption] = useState('addRestaurant');

    const signOut = (e) => {
        e.preventDefault();
        handleSignOut()
        .then(res => {
            //addLoggedinUser(res);
            sessionStorage.removeItem('token');
            history.replace(from);
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        <div className={classes.root}>
        <CssBaseline />
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <List>
                <ListItem className="py-5">
                    <Nav.Link as={Link} to={`/`} className="text-center"><Image  width={160} src="/images/logos/applogo.png" alt="Group"/></Nav.Link>
                </ListItem>
                <Divider/>
                {
                    1 ?
                    <>
                    <ListItem button onClick={() => setSelectedOption('addRestaurant')}>
                        <ListItemIcon><FontAwesomeIcon icon={faLockOpen} /></ListItemIcon>
                        <ListItemText primary="Add Restaurant" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('liveSell')}>
                        <ListItemIcon><FontAwesomeIcon icon={faPlus} /></ListItemIcon>
                        <ListItemText primary="Live Sell" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('dailySellReport')}>
                        <ListItemIcon><FontAwesomeIcon icon={faUserPlus} /></ListItemIcon>
                        <ListItemText primary="Daily Sell" />
                    </ListItem>
                    <ListItem button onClick={() => setSelectedOption('restaurantList')}>
                        <ListItemIcon><FontAwesomeIcon icon={faUserPlus} /></ListItemIcon>
                        <ListItemText primary="Restaurant List" />
                    </ListItem>
                    </> :
                    <>
                    <ListItem button>
                        <ListItemIcon><FontAwesomeIcon icon={faShoppingCart} /></ListItemIcon>
                        <ListItemText primary="Order" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><FontAwesomeIcon icon={faList} /></ListItemIcon>
                        <ListItemText primary="Service List" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><FontAwesomeIcon icon={faComment} /></ListItemIcon>
                        <ListItemText primary="Review" />
                    </ListItem>
                    </>
                }
            </List>
            <Divider />
            <List>
                <ListItem button onClick={signOut} as={Link} to={`/`}>
                    <ListItemIcon><FontAwesomeIcon icon={faSignOutAlt} /></ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List>
        </Drawer>
        <main className={classes.content}>
            {
                selectedOption === 'addRestaurant' && <AddRestaurant></AddRestaurant>
            }
            {
                selectedOption === 'liveSell'&& <LiveSell></LiveSell>
            }
            {
                selectedOption === 'dailySellReport'&& <DailySellReport></DailySellReport>
            }
            {
                selectedOption === 'restaurantList'&& <RestaurantList></RestaurantList>
            }
            {/* {
                selectedOption === 'addservice'&& <AddService></AddService>
            }
            {
                selectedOption === 'makeadmin'&& <MakeAdmin></MakeAdmin>
            } */}
        </main>
        </div>
        </>
    );
};

// const mapStateToProps = state => {
//     return {
//         user: state.user
//     }
// }

// const mapDispatchToProps = {
//     addLoggedinUser : addLoggedinUser
// }

export default DashboardNav;