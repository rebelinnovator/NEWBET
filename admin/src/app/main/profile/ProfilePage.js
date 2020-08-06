import React, {Component} from 'react';
import api, {BASE_URL} from 'app/ApiConfig'
import {withStyles, Avatar, Button, Checkbox, Dialog, DialogActions, DialogContent, IconButton, DialogTitle, FormControlLabel, TextField, InputAdornment, Icon} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import {FusePageSimple, FuseAnimate} from '@fuse';
import AvatarEditDialog from './AvatarEditDialog'
import PasswordConfirm from './PasswordConfirm'
import classNames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'app/auth/store/actions';
import * as Actions from 'app/store/actions';
import _ from '@lodash';

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
            },
            '&$disabled': {
                color: "#ffffff59"
            }
        }
    },
    MuiCheckbox: {
        root: {
            color: "white"
        }
    },
    MuiFormControlLabel: {
        label: {
            color: 'white'
        }
    },
    MuiOutlinedInput: {
        notchedOutline: {
            borderColor: "#bfbab28c !important"
        }
    },
}

const overrideBlack = {
    MuiInputBase: {
        root: {
            color: "black"
        }
    },
    MuiFormLabel: {
        root: {
            color: "black",
            '&$focused': {
                color: "black"
            }
        }
    },
    MuiOutlinedInput: {
        notchedOutline: {
            borderColor: "black !important"
        }
    },
}

const styles = theme => ({
    root: {
        background: 'black'
    },
    input: {
        
    },
    checkbox: {
        color: 'white'
    },
    layoutHeader : {
        height                        : 320,
        minHeight                     : 320,
        [theme.breakpoints.down('md')]: {
            height   : 240,
            minHeight: 240
        }
    },
    profileBg: {
        textAlign : 'center',
        background : 'linear-gradient(219deg, #867631 0%, #d8c884 73%, #d8c884d1 110%)'
    }
});

class ProfilePage extends Component {

    state = {
        confirm: false,
        changepass: false
    };

    form = React.createRef();

    componentDidMount() {
        this.setState({confirm: false})
    }

    onSubmit = (model) => {
        const { userId } = this.props.user
        if (model.password && model.password !== '') {
            const password = model.password

            api.post('/auth/user/updatepwd', {
                userId, password
            }).then(res => {
                
            });
        }
        
        this.props.updateUserShortcuts({
            nickname: model.nickname
        })
        this.form.reset({
            nickname: model.nickname
        })
        this.setState({changepass: false});
    };

    confirmPassword = () => {
        const { userId } = this.props.user
        const { model, password } = this.state


        api.post('/auth/user/checkpwd', {
            userId, password
        }).then(res => {
            if (!res.data.success) {
                this.props.showMessage({message: res.data.message})
                return;
            }
            this.setState({confirm: false, changepass: true})
        })
    }

    handleChange = (e) => {
        this.setState({password: e.target.value});
    }

    handleCheckbox = (e) => {
        if (!this.state.changepass && e.target.checked) {
            this.setState({confirm: true});
        }
        if (!e.target.checked) {
            this.form.reset({
                username: this.form.getModel().username,
                email: this.form.getModel().email
            })
            this.setState({changepass: false});
        }
    }

    handleSaveAvatar = path => {
        var user_id = this.props.user.userId;
        console.log(path)
        this.props.updateUserShortcuts({
            userId: user_id,
            avatar: path
        })
    }

    render()
    {
        const { classes, user } = this.props;
        console.log("render")
        console.log(user)
        //this.props.theme.overrides = overrides;

        return (
            <MuiThemeProvider theme={{
                ...this.props.theme,
                overrides: overrides
            }}>
                <FusePageSimple
                    classes={{
                        content: classes.root,
                        toolbar: "px-16 sm:px-24"
                    }}
                    content={
                        
                        <div className="p-16 sm:p-24">
                            <div className={classes.profileBg}>
                                <br />
                                <div className="form-row ">
                                    <div className="profile-image" style={{ width: '110px', height: '110px', padding: '5px', borderRadius: '50%', display: 'inline-block', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)', position: 'relative'}}>
                                        
                                        <Avatar
                                            className="w-96 h-96"
                                            alt="user photo"
                                            src={user.avatar && user.avatar !== '' ? `${BASE_URL}/uploads/${user.avatar}` : "assets/images/avatars/profile.jpg"}
                                        />

                                        <div style={{ position: 'absolute',display: 'block',width: '32px',height: '32px',borderRadius: '50%',boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.2)',backgroundColor: '#fff',right: 0,bottom: 0,textAlign: 'center', lineHeight: '32px'}}>
                                            <AvatarEditDialog type="avatar" onSave={this.handleSaveAvatar} />
                                        </div>

                                    </div>
                                </div>
                                <br />
                                <div className="container" style={{padding: '10px'}}>
                                    <div className="student-name" style={{ background: 'rgba(0,0,0,.2)',borderRadius: '10px',padding: '40px 15px 20px', textAlign: 'center', position: 'relative', marginBottom: '20px'}}>
                                        <h3 style={{marginBottom: '10px', color: '#fff', fontSize: '20px'}}>{user.userName}</h3>
                                        <p style={{color: '#e2e9ef'}}>{user.nickname}</p>
                                    </div>
                                </div>
                            </div>

                            <br />

                            <div className="form-label-divider" style={{display: 'block',width: '100%',clear: 'both',height: '1px',backgroundColor: '#DDD',textAlign: 'center',opacity: '0.5'}}>
                                <span style={{ position: 'relative', top: '-8px', fontWeight: '700', display: 'inline-block', backgroundColor: '#000', color: '#F5F6F8', padding: '0 10px'}}>ACCOUNT INFO</span>
                            </div>

                            <br />

                            <Formsy
                                onValidSubmit={this.onSubmit}
                                ref={(form) => this.form = form}
                                className="flex flex-col justify-center w-full h-full"
                                style={{color: 'white'}}
                            >
                                
                                <TextFieldFormsy
                                    className={classNames(classes.input, "mb-16")}
                                    type="text"
                                    name="nickname"
                                    label="Nickname"
                                   
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Icon className="text-20">person</Icon></InputAdornment>,
                                    }}
                                    variant="outlined"
                                    value={user.nickname}
                                    required
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.changepass}
                                            onChange={this.handleCheckbox}
                                            name="checkedB"
                                            color="secondary"
                                        />
                                    }
                                    className={classNames(classes.checkbox, "mb-16")}
                                    label="Change password"
                                />


                                <TextFieldFormsy
                                    className={classNames(classes.input, "mb-16")}
                                    type="password"
                                    name="password"
                                    label="Password"
                                    validations="equalsField:password-confirm"
                                    validationErrors={{
                                        equalsField: 'Passwords do not match'
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Icon className="text-20">vpn_key</Icon></InputAdornment>
                                    }}
                                    disabled={!this.state.changepass} 
                                    variant="outlined"
                                />

                                <TextFieldFormsy
                                    className={classNames(classes.input, "mb-16")}
                                    type="password"
                                    name="password-confirm"
                                    label="Confirm Password"
                                    validations="equalsField:password"
                                    validationErrors={{
                                        equalsField: 'Passwords do not match'
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><Icon className="text-20">vpn_key</Icon></InputAdornment>
                                    }}
                                    disabled={!this.state.changepass} 
                                    variant="outlined"
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="w-full mx-auto mt-16 normal-case"
                                    aria-label="UPDATE"
                                    value="legacy"
                                    style={{background: 'linear-gradient(219deg, #867631 0%, #d8c884 73%, #d8c884d1 110%)'}}
                                >
                                    Update
                                </Button>

                            </Formsy>

                        </div>
                    }
                />
                <MuiThemeProvider theme={{
                    ...this.props.theme,
                    overrides: overrideBlack
                }}>
                    <Dialog
                        open={this.state.confirm}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title" disableTypography style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <h2>ENTER CURRENT PASSWORD</h2>
                            <IconButton style={{right: '-25px', top: '-30px'}} onClick={()=>this.setState({confirm: false})}>
                                <Icon>close</Icon>
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <TextField
                                className="mt-16"
                                type="password"
                                name="password"
                                label="Current Password"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Icon className="text-20">vpn_key</Icon></InputAdornment>
                                }}
                                onChange={this.handleChange}
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            
                            <Button onClick={this.confirmPassword} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>
            </MuiThemeProvider>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        updateUserShortcuts: authActions.updateUserShortcuts,
        showMessage: Actions.showMessage
    }, dispatch);
}

function mapStateToProps(props,context)
{
 //   console.log(props.auth.user.balance)
    console.log(props.auth.user)
    return {
        user            : props.auth.user
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
