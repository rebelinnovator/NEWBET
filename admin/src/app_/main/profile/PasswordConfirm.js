import React from 'react';
import { withStyles, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Icon, IconButton } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import api from 'app/ApiConfig';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const overrides = {
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
});

class PasswordConfirm extends React.Component {
    state = {

    }

    render() {
        const {classes} = this.props
        return (            
            <MuiThemeProvider theme={{
                ...this.props.theme,
                overrides: overrides
            }}>
                <Dialog
                    open={true}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        ENTER
                            <Icon>close</Icon> CURRENT1 PASSWORD
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            className="mt-16"
                            type="password"
                            name="password"
                            label="Password"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><Icon className="text-20">vpn_key</Icon></InputAdornment>
                            }}
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {}} color="primary">
                            Forgot Password?
                        </Button>
                        <Button onClick={() => {}} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiThemeProvider>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        
    }, dispatch);
}

function mapStateToProps(props,context)
{
    return {
        
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(PasswordConfirm));