import React, {Component} from 'react';
/**redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';

/**---redux */

import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {Avatar, Button,Card,Modal, Tab, Tabs,Dialog,DialogActions, DialogContent,DialogTitle,Icon,InputAdornment,TextField,IconButton} from '@material-ui/core';

import MyOwnTaskComponent from './MyOwnTaskComponent'

const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class MyOwnTask extends Component {
    state = {
        selectedTab: 0,
    }
    componentDidMount(){
        console.log(this.props.match.who)
        this.props.getOwnTasks({
            id      :   this.props.user.userId
        })
    }
    handleTabChange = (event,newTab) => {
        this.setState({selectedTab: newTab})
    }
    render(){
        const {classes} = this.props;
        const {selectedTab} = this.state;
        console.log(this.props.ownTasks)
        const finishedTasks = this.props.ownTasks.filter((item)=>item.status == 2)
        const unApply = this.props.ownTasks.filter((item)=>item.status != 2)
        return(
            <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
                contentToolbar = {
                    <Tabs
                        value={selectedTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full h-64"
                        variant="fullWidth"
                        
                    >
                        <Tab className="h-64" label="All"/>
                        <Tab className="h-64" label="Finished"/>
                        <Tab className="h-64" label="UnApply"/>
                    </Tabs>
                }
                content={
                    <div>
                        {selectedTab === 0 && (
                            <MyOwnTaskComponent tasks={this.props.ownTasks} />
                        )}
                        {selectedTab === 1 && (
                            <MyOwnTaskComponent tasks={finishedTasks} />
                        )}
                        {selectedTab === 2 && (
                            <MyOwnTaskComponent tasks={unApply} />
                        )}
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
        user        :   store.auth.user,
        ownTasks    :   store.myApp.owntasks.ownTasks 
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        getOwnTasks    :   Actions.getOwnTasks
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyOwnTask)));
