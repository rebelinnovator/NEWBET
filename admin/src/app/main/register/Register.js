import React, {Component} from 'react'
import {withStyles, Card, CardContent, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
// import * as Actions from 'app/auth/store/actions';
import JWTRegisterTab from './tabs/JWTRegisterTab';
import {Button, InputAdornment, Icon} from '@material-ui/core';
import queryString from 'query-string'

const styles = theme => ({
    root: {
        background: 'black',
        color     : theme.palette.primary.contrastText
    },
    links: {
        color     : theme.palette.primary.light + ' !important'
    }
});

class Register extends Component {

    state = {
        //recom
    };

    handleTabChange = (event, value) => {
        this.setState();
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        //this.props.registerWithFirebase(model);
    };
    componentDidMount()
    {
     
    }
    componentDidUpdate(prevProps, prevState)
    {
        if ( this.props.login.error && (this.props.login.error.userName || this.props.login.error.password || this.props.login.error.email) )
        {
            this.form.updateInputsWithError({
                ...this.props.login.error
            });

            this.props.login.error = null;
            this.disableButton();
        }

        if ( this.props.user.role !== 'guest' )
        {
            const pathname = this.props.location.state && this.props.location.state.redirectUrl ? this.props.location.state.redirectUrl : '/';
            this.props.history.push({
                pathname
            });
        }
        return null;
    }

    render()
    {
        const {classes} = this.props;
        console.log(this.props.match.params)
        let params = queryString.parse(this.props.location.search)
        console.log(params)
        return (
            <div className={classNames(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center')}>

                <FuseAnimate animation="transition.expandIn">


                    <Card className="w-full h-full mx-auto m-16 md:m-0" square>

                        <CardContent className="flex flex-col items-center justify-center h-full md:p-48 md:pt-128 " style={{backgroundColor: 'black', color: 'white'}}>

                            <img className="w-128 m-16" src="assets/images/logos/bet.png" />
                            <br />

                            <JWTRegisterTab invite_key = {params.invite_key}/>
                            
                           
                            <div className="flex flex-col items-center justify-center pt-32">
                                <span className="font-medium">Already have an account? </span>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-32">
                                <Link className={classNames(classes.links, "font-medium")} to="/login">Login</Link>

                            </div>


                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        //registerWithFirebase: Actions.registerWithFirebase
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        login: auth.login,
        user : auth.user
    }
}


export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Register)));
