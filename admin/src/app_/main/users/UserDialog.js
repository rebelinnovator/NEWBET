import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const newUserState = {
    _id      : '',
    user_name: '',
    email   : '',
    role: '',
    account_type: '',
    membership: '',
    account_status: '',
    start_time: Date(),
    end_time: Date(),
    avatar  : 'assets/images/avatars/profile.jpg',
};

class UserDialog extends Component {

    state = {...newUserState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.userDialog.props.open && this.props.userDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.userDialog.type === 'edit' &&
                this.props.userDialog.data &&
                !_.isEqual(this.props.userDialog.data, prevState) )
            {
                this.setState({...this.props.userDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.userDialog.type === 'new' &&
                !_.isEqual(newUserState, prevState) )
            {
                this.setState({...newUserState});
            }

            this.setState({password: ''})
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.userDialog.type === 'edit' ? this.props.closeEditUserDialog() : this.props.closeNewUserDialog();
    };

    canBeSubmitted()
    {
        return true//here must repair
        const {user_name} = this.state;
        return (
            user_name.length > 0
        );
    }

    render()
    {
        const {userDialog, addUser, updateUser, removeUser} = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...userDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {userDialog.type === 'new' ? 'New User' : 'Edit User'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        <Avatar
                            className="w-96 h-96"
                            alt="user avatar"
                            src={this.state.avatar && this.state.avatar !== '' ? this.state.avatar : "assets/images/avatars/profile.jpg"}
                        />
                        {userDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.user_name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                PhoneNumber
                        </Typography>

                    </div>
                    <br/>
                    <div className="flex">  
                        <TextField
                            className="mb-24"
                            label="PhoneNumber"
                            autoFocus
                            id="user_name"
                            name="user_name"
                            value={this.state.phonenumber}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                            disabled
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">Balance</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Balance
                        </Typography>
                    </div>
                    <br/>
                    <div className="flex">                        
                        <TextField
                            className="mb-24"
                            label="Balance"
                            id="balance"
                            name="balance"
                            value={this.state.balance}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">vpn_key</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Password
                        </Typography>
                    </div>
                    <br/>
                    <div className="flex">                        
                        <TextField
                            className="mb-24"
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">accessibility</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Role
                        </Typography>
                    </div>
                    <br/>
                    <div className="flex">  
                        <Select
                            className="mb-24"
                            native
                            value={this.state.role}
                            onChange={this.handleChange}
                            input={
                            <OutlinedInput
                                name="role"
                                labelWidth={0}
                                id="role"
                            />
                            }
                            fullWidth
                        >
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </Select>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">people_outline</Icon>
                        </div>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                Account Status
                        </Typography>
                    </div>
                    <br/>
                    <div className="flex">  
                        <Select
                            className="mb-24"
                            native
                            value={this.state.account_status}
                            onChange={this.handleChange}
                            input={
                            <OutlinedInput
                                name="account_status"
                                labelWidth={0}
                                id="account_status"
                            />
                            }
                            fullWidth
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Closed">Closed</option>
                            <option value="Restricted">Restricted</option>
                        </Select>
                    </div>



                </DialogContent>

                {userDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addUser(this.state);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateUser(this.state);
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                if (window.confirm('Are you sure to delete it?')) {
                                    removeUser(this.state._id);
                                    //this.closeComposeDialog();
                                }
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditUserDialog: Actions.closeEditUserDialog,
        closeNewUserDialog : Actions.closeNewUserDialog,
        addUser            : Actions.addUser,
        updateUser         : Actions.updateUser,
        removeUser         : Actions.removeUser
    }, dispatch);
}

function mapStateToProps({usersApp})
{
    return {
        userDialog: usersApp.users.userDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDialog);
