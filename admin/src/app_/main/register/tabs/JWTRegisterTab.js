import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import {Button, InputAdornment, Icon,Grid} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';
import api from 'app/ApiConfig.js'

const styles = {
    root: {
      background: "black"
    },
    input: {
      color: "white",
      borderBottom: '1px solid #676767'
    }
};

class JWTRegisterTab extends Component {

    state = {
        canSubmit: false,
        otpnum:0,
       // phonenumber:0
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        this.props.submitRegister(model);
    };
    getOTP = () => {
        //

        api.post('/auth/otp',{
            'phonenumber':'917428730930'
        }).then(res=>{
         //   this.setState({...this.state,otpnum:res.sessionId})
         
        }).catch(err =>{
            console.log(err)
        })
        
    }
    componentDidUpdate(prevProps, prevState)
    {
        console.log(this.props.register.error)
        if ( this.props.register.error && (this.props.register.error.phonenumber || this.props.register.error.password || this.props.register.error.otpnumber|| this.props.register.error.recomnumber) )
        {
            this.form.updateInputsWithError({
                ...this.props.register.error
            });

            this.props.register.error = null;
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
                        placeholder="phonenumber"
                       
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
                        validations="equalsField:password-confirm"
                        validationErrors={{
                            equalsField: 'Passwords do not match'
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Icon className="text-20">vpn_key</Icon></InputAdornment>,
                            className: classes.input
                        }}
                        required
                    />

                    <TextFieldFormsy
                        className={classNames(classes.root, 'mb-16')}
                        type="password"
                        name="password-confirm"
                        placeholder="Confirm Password"
                        validations="equalsField:password"
                        validationErrors={{
                            equalsField: 'Passwords do not match'
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Icon className="text-20">vpn_key</Icon></InputAdornment>,
                            className: classes.input
                        }}
                        required
                    />
                    
                    <TextFieldFormsy
                        className={classNames(classes.root, 'mb-16' )}
                        type="number"
                        name="otpnumber"
                        placeholder="Verification Code"
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Button
                            type="button"
                            variant="contained"
                            color="primary"
                            aria-label="OTP"
                            value="legacy"
                            onClick={this.getOTP}

                        >OTP</Button></InputAdornment>,
                            className: classes.input
                        }}
                        required
                    />
                        
                      
                     <TextFieldFormsy
                        className={classNames(classes.root, 'mb-16')}
                        type="number"
                        name="recomnumber"
                        placeholder="Recommendation Code"
                        value={this.props.invite_key}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><Icon className="text-20">email</Icon></InputAdornment>,
                            className: classes.input
                        }}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="REGISTER"
                        value="legacy"
                    >
                        Register
                    </Button>

                </Formsy>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitRegister: authActions.submitRegister
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        register: auth.register,
        user    : auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTRegisterTab)));
