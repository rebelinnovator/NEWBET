import React, {Component} from 'react';
import {FusePageSimple, TextFieldFormsy} from '@fuse';
import {bindActionCreators} from 'redux';
import { withStyles, Button, TextField, InputAdornment, Icon } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import api, {BASE_URL} from 'app/ApiConfig'
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

const styles = theme => ({
    root: {
        background: 'black'
    },
});


class Contact extends Component {

    state = {
        
    };

    form = React.createRef();

    onSubmit = (model) => {
        api.post("/auth/contact", {
            ... model,
            userId: this.props.user.userId
        }).then(res => {
            if (!res.data.success) {
                return;
            }
            this.props.showMessage({message: 'Success!'});
        }).catch(err => console.error(err));
    }
    
    render()
    {
        const {classes} = this.props;

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

                            <Formsy
                                onValidSubmit={this.onSubmit}
                                ref={(form) => this.form = form}
                                className="flex flex-col justify-center w-full h-full"
                                style={{color: 'white', textAlign: 'center'}}
                            >

                                <h1 style={{color: 'white'}}>Contact Us</h1>
                                <br />

                                <TextFieldFormsy
                                    className={classNames(classes.input, "mb-16")}
                                    type="text"
                                    name="subject"
                                    label="Subject"
                                    validations={{
                                        minLength: 4
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 4'
                                    }}
                                    variant="outlined"
                                    required
                                />

                                <TextFieldFormsy
                                    className={classNames(classes.input, "mb-16")}
                                    type="text"
                                    name="message"
                                    label="Message"
                                    validations={{
                                        minLength: 4
                                    }}
                                    validationErrors={{
                                        minLength: 'Min character length is 4'
                                    }}
                                    multiline
                                    rows={15}
                                    fullWidth
                                    variant="outlined"
                                    required
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="w-full mx-auto mt-16 normal-case"
                                    aria-label="SEND"
                                    value="legacy"
                                    style={{background: 'linear-gradient(219deg, #867631 0%, #d8c884 73%, #d8c884d1 110%)'}}
                                >
                                    Send
                                </Button>

                            </Formsy>

                        </div>
                    }
                />
            </MuiThemeProvider>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        showMessage: Actions.showMessage
    }, dispatch);
}

function mapStateToProps(props)
{
    return {
        user:       props.auth.user       
    }
}
export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Contact));