import React, {Component} from 'react'
import {withStyles, Card, CardContent, Typography, Divider} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import JWTLoginTab from './tabs/JWTLoginTab';
import {Button, InputAdornment, Icon} from '@material-ui/core';


const styles = theme => ({
    root: {
        background: 'black',
        color     : theme.palette.primary.contrastText
    },
    links: {
        color     : theme.palette.primary.light + ' !important'
    }
});

class Login extends Component {

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

                <FuseAnimate animation="transition.expandIn">

                    <Card className="w-full h-full mx-auto m-16 md:m-0" square>

                        <CardContent className="flex flex-col items-center justify-center h-full md:p-48 md:pt-128 " style={{backgroundColor: 'black', color: 'white'}}>

                            <img className="w-256 m-16" src="assets/images/logos/bet.png" />
                            <br />

                            <JWTLoginTab/>
                            
                           
                            <div className="flex flex-col items-center justify-center pt-32">
                                <span className="font-medium"><Link className={classNames(classes.links, "font-medium")} to="/forgot-password">Forgot password?</Link></span>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-32">
                            <Link className={classNames(classes.links, "font-medium")} to="/register">Register</Link>

                            </div>
                            

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(Login));
