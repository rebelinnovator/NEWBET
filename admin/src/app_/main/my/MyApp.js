import React, {Component} from 'react';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';


import {Avatar, Button,Card,Modal, Tab, Tabs,Dialog,DialogActions, DialogContent,DialogTitle,Icon,InputAdornment,TextField,IconButton} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';

import {FusePageSimple, DemoContent} from '@fuse';
const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class My extends Component {

    render(){
    const {classes} = this.props;

        return(
            <FusePageSimple 
            classes={{
                content: classes.root,
                toolbar: "px-16 sm:px-24"
            }}
            header={
                <div  className="flex flex-col flex-1" style={{
                    backgroundColor: '#665c32',
                    color: '#ffffff',
                    border: '10px #332323'}}>HEADER</div>
            }
            content={
                <div>
                <Button
                            to={`/my/task`}
                            component={Link}
                            color="primary"
                            fullWidth="true"
                            
                            variant="contained"
                            style={{
                                margin:'30px',
                                marginBottom:'0px',
                                minHeight:'50px'
                            }}
                        >
                        Task Center
                </Button>
                            <Button
                            to={`/my/promotion`}
                            component={Link}
                            color="primary"
                            fullWidth="true"
                            variant="contained"
                            style={{
                                margin:'30px',
                                marginBottom:'0px',
                                minHeight:'50px'
                            }}
                        >
                        Promotion
                </Button>
                </div>
            }
               
            />
        )
    }
}

export default (withStyles(styles, {withThemem: true})(withReducer('myApp',reducer) (My)))