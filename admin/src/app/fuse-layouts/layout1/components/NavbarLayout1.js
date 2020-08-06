import React from 'react';
import {AppBar, Hidden, Icon, withStyles} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import classNames from 'classnames';
import UserNavbarHeader from 'app/fuse-layouts/shared-components/UserNavbarHeader';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import NavbarFoldedToggleButton from 'app/fuse-layouts/shared-components/NavbarFoldedToggleButton';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';

const styles = theme => ({
    content: {
        overflowX                   : 'hidden',
        overflowY                   : 'auto',
        '-webkit-overflow-scrolling': 'touch',
        background                  : "#ccbd7d",//'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
        backgroundRepeat            : 'no-repeat',
        backgroundSize              : '100% 40px, 100% 10px',
        backgroundAttachment        : 'local, scroll'
    }
});

const NavbarLayout1 = ({classes, navigation, className}) => {
    return (
        <div className={classNames("flex flex-col overflow-hidden h-full", className)} style={{background: '#ccbd7d'}}>

            <FuseScrollbars className={classNames(classes.content)}>

                <UserNavbarHeader/>

                <Navigation layout="vertical"/>

            </FuseScrollbars>
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(NavbarLayout1);


