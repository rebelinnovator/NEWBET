import React, {Component} from 'react';
import {Button, Divider, InputAdornment, Icon} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'app/store/actions';
import * as authActions from 'app/auth/store/actions';

const overrides = {
    MuiInputBase: {
        root: {
            color: "white"
        }
    },
    MuiFormLabel: {
        root: {
            color: "white",
            '&$focused': {
                color: "white"
            }
        }
    },
    MuiOutlinedInput: {
        notchedOutline: {
            borderColor: "#bfbab28c !important"
        }
    },
}

class JWTForgotPwdTab extends Component {

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
        this.props.showMessage({message: 'Email sent successfully!'});
        this.props.sendPwEmail(model);
        this.disableButton();
    };

    componentDidUpdate(prevProps, prevState)
    {
        if ( this.props.login.error && (this.props.login.error.email || this.props.login.error.password) )
        {
            console.log(this.props.login.error);
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

        return (
            <MuiThemeProvider theme={{
                ...this.props.theme,
                overrides: overrides
            }}>
                <div className="w-full" style={{background: 'black'}}>
                    <Formsy
                        onValidSubmit={this.onSubmit}
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        ref={(form) => this.form = form}
                        className="flex flex-col justify-center w-full"
                    >
                        <TextFieldFormsy
                            className="mb-16"
                            type="email"
                            name="email"
                            label="Email"
                            validations={{
                                isEmail: true,
                                
                            }}
                            validationErrors={{
                                isEmail: 'Not valid email address'
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                            }}
                            variant="outlined"
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="w-full mx-auto mt-16 normal-case"
                            aria-label="SEND EMAIL"
                            value="legacy"
                            style={{background: 'linear-gradient(219deg, #867631 0%, #d8c884 73%, #d8c884d1 110%)'}}
                        >
                            Send Email
                        </Button>

                    </Formsy>

                    <div className="flex flex-col items-center pt-24">
                        <Divider className="mb-16 w-256"/>

                    </div>

                </div>
            </MuiThemeProvider>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        sendPwEmail : authActions.sendPwEmail,
        showMessage : Actions.showMessage
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        login: auth.login,
        user : auth.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTForgotPwdTab));
