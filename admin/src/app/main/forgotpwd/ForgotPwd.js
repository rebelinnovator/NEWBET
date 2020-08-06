import React, {Component} from 'react'
import {withStyles, Card, CardContent, Typography, Divider} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import JWTForgotPwdTab from './tabs/JWTForgotPwdTab';

const styles = theme => ({
    root: {
        background: 'black',
        color     : theme.palette.primary.contrastText
    },
    links: {
        color     : theme.palette.primary.light + ' !important'
    }
});

class ForgotPwd extends Component {

    state = {
    };

    handleTabChange = (event, value) => {
        this.setState();
    };

    render()
    {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center')}>

                <FuseAnimate animation={{translateX: [0, '100%']}}>

                    <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 " style={{backgroundColor: 'black', color: 'white'}}>

                            <img className="w-256 m-16" src="assets/images/logos/bird-logo.png" />
                            <br />

                            <JWTForgotPwdTab/>

                            <div className="flex flex-col items-center justify-center pt-32">
                                <span className="font-medium"><Link className={classNames(classes.links, "font-medium")} to="/login">Back to Login</Link></span>
                            </div>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(ForgotPwd));
