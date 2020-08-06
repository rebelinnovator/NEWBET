import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import _ from '@lodash';

const newTaskState = {
    _id         :   -1,
    taskType    :   1,
    taskAmount  :   1,
    taskBonus   :   100,
    taskStatus  :   'going'
}

class TaskDialog extends Component {

    state = {
        ...newTaskState
    }
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !prevProps.contentDialog.props.open && this.props.contentDialog.props.open )
        {
            if( this.props.contentDialog.type === 'edit' &&
            this.props.contentDialog.data &&
            !_.isEqual(this.props.contentDialog.data,prevState))
            {
                this.setState({...this.props.contentDialog.data})
            }
        }
    }

    closeComposeDialog = () =>{
        console.log('close')
        this.props.contentDialog.type === 'edit' ? this.props.closeEditTaskDialog() : this.props.closeNewTaskDialog();

    }
    handleChange = (event) =>{
        console.log(event.target.name)
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
        console.log(this.state)
    }
    canBeSubmitted = () =>{
        return true
    }
    submitData = () =>{
        this.props.saveTask(this.state)
    }
    render(){
        console.log(this.props.contentDialog)
        const {contentDialog} = this.props;

        return(
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...contentDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {contentDialog.type === 'new' ? 'New Content' : 'Edit Content'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{textAlign: 'center'}}>
                   
                    <div className="flex">  
                        <TextField
                            className="mb-24"
                            label="TaskType"
                            autoFocus
                            id="taskType"
                            name="taskType"
                            type="number"
                            value={this.state.taskType}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">  
                        <TextField
                            className="mt-8 mb-16"
                            id="taskAmount"
                            name="taskAmount"
                            label="Number of referral people"
                            type="number"
                            value={this.state.taskAmount}
                            onChange={this.handleChange}
                            
                            
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className="flex">  
                        <TextField
                            className="mb-24"
                            label="Bonus"
                            autoFocus
                            id="taskBonus"
                            name="taskBonus"
                            type="number"
                            value={this.state.taskBonus}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">  
                        <TextField
                            className="mt-8 mb-16"
                            id="taskStatus"
                            name="taskStatus"
                            label="TaskStatus"
                            type="text"
                            type="number"
                            value={this.state.taskStatus}
                            onChange={this.handleChange}
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    
                </DialogContent>

                {contentDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.submitData}
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
                            onClick={this.submitData}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                if (window.confirm('Are you sure to delete it?')) {
                                    this.props.removeContent(this.state);
                                }
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        )
    }
}
function mapStateToProps(state)
{

    console.log(state)
    return{
        contentDialog:state.adminApp.task.contentDialog
    }
}
function mapDispatchToProps(dispatch){
    
    return bindActionCreators({
        saveTask                :   Actions.postTask,

        closeNewTaskDialog      :   Actions.closeNewTaskDialog,
        closeEditTaskDialog     :   Actions.closeEditTaskDialog
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)( TaskDialog)
