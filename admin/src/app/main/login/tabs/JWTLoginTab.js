import React, {Component} from 'react';
import {Button, Divider, InputAdornment, Icon} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';

const styles = {
    root: {
      background: "black"
    },
    input: {
      color: "white",
      borderBottom: '1px solid #676767'
    }
};

class JWTLoginTab extends Component {

    state = {
        canSubmit: false
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        this.props.submitLogin(model);
    };

    componentDidUpdate(prevProps, prevState)
    {
        console.log(this.props.login.error)
        if ( this.props.login.error && (this.props.login.error.phonenumber || this.props.login.error.password) )
        {
            this.form.updateInputsWithError({
                ...this.props.login.error
            });

            this.props.login.error = null;
            this.disableButton();
        }

        return null;
    }

    render()
    {
        const {canSubmit} = this.state;
        const {classes} = this.props;

        return (
            <div className="w-full">
                
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-full h-full"
                >
                    
                    <TextFieldFormsy
                        className={classNames(classes.root, 'mb-16')}
                        type="number"
                        name="phonenumber"
                        placeholder="PhoneNumber"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Icon className="text-20">person</Icon></InputAdornment>,                            
                            className: classes.input
                        }}
                        required
                    />
                    <TextFieldFormsy
                        className={classNames(classes.root, 'mb-16')}
                        type="password"
                        name="password"
                        placeholder="Password"
                        validations={{
                            minLength: 4
                        }}
                        textColor="primary"
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Icon className="text-20">lock</Icon></InputAdornment>,                            
                            className: classes.input
                        }}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="LOG IN"
                        value="legacy"
                        style={{background: 'linear-gradient(219deg, #867631 0%, #d8c884 73%, #d8c884d1 110%)'}}
                    >
                        Login
                    </Button>

                </Formsy>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitLogin: authActions.submitLogin
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        login: auth.login,
        user : auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTLoginTab)));
