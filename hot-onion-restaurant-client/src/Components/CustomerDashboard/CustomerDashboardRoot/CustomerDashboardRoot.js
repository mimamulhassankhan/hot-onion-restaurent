import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MyOrderList from '../MyOrderList/MyOrderList';

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
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const CustomerDashboardRoot = () => {
    const classes = useStyles();
    const [contentChanger, setContentChanger] = useState('myorders');
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
                <div className={classes.toolbar} />
                <Divider />
                <List>
                <ListItem button onClick={() => setContentChanger('myorders')} key={`myoders`}>
                    <ListItemText primary={`My Orders`} />
                </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                {
                    contentChanger === 'myorders' && <MyOrderList></MyOrderList>
                }
            </main>
        </div>
            
        </>
    );
};

export default CustomerDashboardRoot;