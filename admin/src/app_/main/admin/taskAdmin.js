import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import {TextFieldFormsy, FusePageSimple, FuseAnimate, FuseChipSelect} from '@fuse';
import ReactTable from 'react-table';
import {withStyles, Button, Fab, Icon, Tab, Tabs, Select, OutlinedInput} from '@material-ui/core';
import  TaskDialog  from './taskDialog'

class TaskAdmin extends Component {

    componentDidMount()
    {
        console.log("tast")
        this.props.allTask()
        /*
        this.props.saveTask({
            task:{
                type:1,
                amount:1,
                bonus:100
            }
        })
        */
        
    }
   
    render(){
        return(
            <FusePageSimple
                    classes={{
                        contentCardWrapper: "sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    content={
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <React.Fragment>
            <ReactTable
                className="-striped -highlight border-0"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick  : (e, handleOriginal) => {
                            if ( rowInfo )
                            {
                                this.props.openEditTaskDialog(rowInfo.original);
                            }
                        }
                    }
                }}
                data={this.props.tasks}
                columns={[
                    {
                        Header    : "TaskType",
                        accessor  : "taskType",
                        className : "font-bold"
                    },
                    {
                        Header    : "ReferralAmount",
                        accessor  : "referralAmount",
                        className : "font-bold"
                    },
                    {
                        Header    : "TaskBonus",
                        accessor  : "taskBonus",
                        className : "font-bold"
                    },
                    {
                        Header    : "TaskStatus",
                        accessor  : "taskStatus",
                        className : "font-bold"
                    },
                ]}
                defaultPageSize={10}
                noDataText="No contents found"
            />
            <Fab
                            color="primary"
                            aria-label="add"
                            onClick={this.props.openNewTaskDialog}
                        >
                            <Icon>add</Icon>
                        </Fab>
                        <TaskDialog/>
                </React.Fragment>
                
        </FuseAnimate>
        
                    }
                    />
        )
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        saveTask            :   Actions.postTask,
        allTask             :   Actions.getTask,
        
        openNewTaskDialog   :   Actions.openNewTaskDialog,
        openEditTaskDialog  :   Actions.openEditTaskDialog

    }, dispatch);
}

function mapStateToProps(props)
{
    console.log(props.adminApp.task)
    return {
        user:       props.auth.user,
        tasks:      props.adminApp.task.task
    }
}
export default withReducer('adminApp',reducer)(connect(mapStateToProps,mapDispatchToProps)(TaskAdmin))