import React, {Component} from 'react';
/**redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import {Link, withRouter} from 'react-router-dom';
import * as globalActions from 'app/store/actions';

/**---redux */
import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';

import {TextField,MenuItem,Select, Button, Dialog, DialogActions,InputAdornment, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import Formsy from 'formsy-react';
import api from 'app/ApiConfig.js'
import {TextFieldFormsy} from '@fuse';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import _ from '@lodash';



const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class ComlaintNew extends Component {

    state={
        type:0,
        description:""
    }
    componentDidMount(){
        console.log(this.props.match.who)
    }
    handleChange = (event) =>{
        console.log(event)
        console.log(event.target.name)
        console.log(event.target.value)

        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));

    }
    onSubmit = (model) =>{
        console.log(model)
        
        this.props.submitCompliant({
            userId:this.props.user.userId,
            complaint:{...model,
                type:this.state.type    
            }
        })
        
    }
    render(){
        const {classes} = this.props;

        return(
            <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
               
                content={
                    <div style={{
                        margin:"50px"
                    }}>
                        <Formsy
                            onValidSubmit={this.onSubmit}
                            onValid={this.enableButton}
                            onInvalid={this.disableButton}
                            ref={(form) => this.form = form}
                            className="flex flex-col justify-center w-full h-full"
                        >
                             <div className="flex">
                            
                                <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                        Type
                                </Typography>
                                <TextField
                                    className="mt-8 mb-16"
                                    id="type"
                                    name="type"
                                    label="Type"
                                    type="text"
                                    value={this.state.type}
                                    onChange={this.handleChange}
                                    fullWidth
                                    select
                                >
                                    <MenuItem value={0}>Suggestion</MenuItem>
                                    <MenuItem value={1}>Consult</MenuItem>
                                    <MenuItem value={2}>Recharge Problem</MenuItem>
                                    <MenuItem value={3}>Withdraw Problem</MenuItem>
                                    <MenuItem value={4}>Other</MenuItem>
                                    
                                </TextField>
                            </div>
                            <div className="flex">
                            
                                <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                        Description
                                </Typography>
                                <TextFieldFormsy
                                    className="mt-8 mb-16"
                                    id="description"
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    fullWidth
                                    required
                                    multiline
                                    rows={4}
                                >
                                </TextFieldFormsy>
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-16 normal-case"
                                aria-label="Submit"
                                value="legacy"
                            >
                                Submit
                            </Button>
                        </Formsy>
                    </div>
                }
                />
        )
    }
}
function mapStateToProps(store)
{
    console.log(store)
    return {
        user:store.auth.user
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
      
        submitCompliant :Actions.newComplaint,
        showMessage     :globalActions.showMessage   
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(ComlaintNew)));

