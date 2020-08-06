import React, {Component} from 'react';
import {Button, Divider, InputAdornment, Icon} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as Actions from 'app/store/actions';
import * as authActions from 'app/auth/store/actions';
import api from 'app/ApiConfig.js';

class JWTResetPwdTab extends Component {

    state = {
        canSubmit: false,
        userId: '',
        update: false,
        error: false
    };

    async componentDidMount() {
        await api.post('/auth/verify-email', {
            access_token: this.props.match.params.token
        }).then(response => {
            if (!response.data.message) {
                this.setState({
                    userId: response.data.decodedToken._id,
                    updated: true,
                    error: true
                })
            } else {
                this.setState({
                    updated: false,
                    error: true
                })
            }
        }).catch(error => {
            this.setState({
                updated: false,
                error: true
            })
        })
    }

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        model._id = this.state.userId;
        model.access_token = this.props.match.params.token;
        this.props.setForgotPw(model);
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
            <div className="w-full">
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-full"
                >
                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password"
                        label="Password:"
                        validations={{
                            minLength: 8,
                            equalsField: "confirmPassword"
                            
                        }}
                        validationErrors={{
                            minLength: 'Enter at least 8 characters.',                            
                            equalsField: 'Passwords do not match'
                        }}
                        variant="outlined"
                        required
                    />
                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password:"
                        validations={{
                            minLength: 8,
                            equalsField: "password"
                            
                        }}
                        validationErrors={{
                            minLength: 'Enter at least 8 characters.',                            
                            equalsField: 'Passwords do not match'
                        }}
                        variant="outlined"
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="RESET PASSWORD"
                        disabled={!canSubmit}
                        value="legacy"
                    >
                        Reset Password
                    </Button>

                </Formsy>

                <div className="flex flex-col items-center pt-24">
                    <Divider className="mb-16 w-256"/>

                </div>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setForgotPw : authActions.setForgotPw,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTResetPwdTab));
