import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {TextField,MenuItem, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';

import _ from '@lodash';
import * as service from 'app/services/utils'

const newTaskState = {
    _id         :   -1,
    taskType    :   1,
    referralAmount  :   1,
    taskBonus   :   100,
    taskStatus  :   'going',
    startTime   :   service.convertDateforPicker(Date.now()),
    endTime     :   service.convertDateforPicker(Date.now())

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
        console.log(this.state)
    }

    closeComposeDialog = () =>{
        console.log('close')
        this.props.contentDialog.type === 'edit' ? this.props.closeEditTaskDialog() : this.props.closeNewTaskDialog();

    }
    handleChange = (event) =>{
        console.log(event.target.name)
        console.log(event.target.value)
        if(event.target.name == "startTime")
        {
            if(!service.valideDate(event.target.value,service.convertDateforPicker(this.state.endTime)))
            return
        }
        if(event.target.name == "endTime")
        {
            console.log(service.convertDateforPicker(this.state.startTime))

            if(!service.valideDate(service.convertDateforPicker(this.state.startTime),event.target.value))
            return
        }
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
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">  
                        <TextField
                            className="mt-8 mb-16"
                            id="referralAmount"
                            name="referralAmount"
                            label="Number of referral people"
                            type="number"
                            value={this.state.referralAmount}
                            onChange={this.handleChange}
                            required
                            fullWidth
                        />
                    </div>
                    <div className="flex">  
                        <TextField
                            className="mb-24"
                            label="Bonus"
                            id="taskBonus"
                            name="taskBonus"
                            type="number"
                            value={this.state.taskBonus}
                            onChange={this.handleChange}
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
                            value={this.state.taskStatus}
                            onChange={this.handleChange}
                            fullWidth
                            select
                        >
                            <MenuItem value="going">Going</MenuItem>
                            <MenuItem value="finish">Finish</MenuItem>
                        </TextField>
                       
                    </div>
                    <div className="flex">
                         <TextField
                            id="date"
                            fullWidth
                            label="StartDate"
                            type="date"
                            id="startTime"
                            name="startTime"
                            value={service.convertDateforPicker(this.state.startTime)}
                            onChange={this.handleChange}
                            defaultValue={service.convertDateforPicker(Date.now())}
                            className="mt-8 mb-16"
                            
                        />
                    </div>
                    <div className="flex">
                         <TextField
                            id="date"
                            fullWidth
                            label="EndDate"
                            type="date"
                            id="endTime"
                            name="endTime"
                            value={service.convertDateforPicker(this.state.endTime)}
                            onChange={this.handleChange}
                            defaultValue={service.convertDateforPicker(Date.now())}
                            className="mt-8 mb-16"
                            
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
