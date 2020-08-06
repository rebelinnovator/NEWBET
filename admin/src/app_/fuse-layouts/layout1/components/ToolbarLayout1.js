import React from 'react';
import {AppBar, Hidden, MuiThemeProvider, Toolbar, Icon, IconButton, withStyles} from '@material-ui/core';
import {FuseSearch} from '@fuse';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import history from 'history.js';

const styles = theme => ({
    separator: {
        width          : 1,
        height         : 50,
        backgroundColor: theme.palette.divider
    }
});

const ToolbarLayout1 = ({classes, settings, toolbarTheme, location}) => {

    const layoutConfig = settings.layout.config;
    let title = '';
    let key = {
        '/home': 'HOME',
        '/profile': 'PROFILE',
        '/continue-watch': 'CONTINUE WATCHING',
        '/recommended': 'RECOMMENDED',
        '/recent-uploaded': 'RECENTLY UPLOADED',
        '/courses/list/all': 'ALL COURSES',
        '/courses/detail' : 'COURSE DETAIL',
        '/browse' : '',
        '/manage/courses' : 'MANAGE COURSES',
        '/manage/user' : 'MANAGE USERS',
        '/contact-us' : 'CONTACT US'
    }

    Object.keys(key).forEach((val) => {
        if (location.pathname.indexOf(val) !== -1) {
            title = key[val];
        }
    })
    

    return (
        <MuiThemeProvider theme={toolbarTheme}>
            <AppBar id="fuse-toolbar" className="flex relative z-10" color="primary" style={{background: 'linear-gradient(219deg, #867631 0%, #d8c884 73%, #d8c884d1 110%)'}}>
                <Toolbar className="p-0">

                    {
                        // location.pathname !== '/home' ? (<IconButton className="w-48 h-48" onClick={history.goBack} color="inherit"><Icon>arrow_backward</Icon></IconButton>) : (<FuseSearch/>) 
                        <IconButton className="w-48 h-48" onClick={history.goBack} color="inherit"><Icon>arrow_backward</Icon></IconButton>
                    }

                    <div className="flex flex-1" style={{justifyContent: 'center'}}>
                        {/* <Hidden mdDown> */}
                            {/* <FuseShortcuts className="px-16"/> */}
                        {/* </Hidden> */}
                        <h4>{title}</h4>
                    </div>

                    <div className="flex">
                    </div>

                    <Hidden lgUp>
                        <NavbarMobileToggleButton/>
                    </Hidden>

                </Toolbar>
            </AppBar>
        </MuiThemeProvider>
    );
};

function mapStateToProps({fuse})
{
    return {
        settings    : fuse.settings.current,
        toolbarTheme: fuse.settings.toolbarTheme
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(ToolbarLayout1)));
