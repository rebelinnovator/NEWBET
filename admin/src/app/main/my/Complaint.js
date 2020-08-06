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

import {Avatar, Button,Card,Modal, Tab, Tabs,Dialog,DialogActions, DialogContent,DialogTitle,Icon,InputAdornment,TextField,IconButton} from '@material-ui/core';
//import {Link, withRouter} from 'react-router-dom';
import ComplaintComponent from './ComplaintComponent'
import ComplaintNew from './ComplaintNew';
const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class Complaint extends Component {

    state = {
        selectedTab:0
    }
    componentDidMount(){
        console.log(this.props.match.who)
        this.props.getComplaint({
            userId:this.props.user.userId
        })
    }
    handleTabChange = (event,newTab) => {
        
        this.setState({selectedTab: newTab})
    }
    render(){
        const {classes} = this.props;
        const {selectedTab} = this.state;
        const answeredComplaints = this.props.complaints.filter((item)=>item.state==1)
        const waitingComplaints = this.props.complaints.filter((item)=>item.state==0)

        return(
            <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
               
                content={
                    <div>
                        <div>
                         <Tabs
                            value={selectedTab}
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            scrollButtons="off"
                            className="w-full h-64"
                            variant="fullWidth"

                        >
                            <Tab className="h-64" label="Answered"/>
                            <Tab className="h-64" label="Waiting"/>

                        </Tabs>
                            <div style={{
                                textAlign:"right"
                            }}>
                                <Link to={'/my/complaint/new'}>add new</Link>
                                
                            </div>
                        </div>
                     
                        {selectedTab === 0 && (
                            <div>
                                <ComplaintComponent complaints={answeredComplaints} />
                            </div>
                        )}
                        {selectedTab === 1 && (
                            <div>
                                <ComplaintComponent complaints={waitingComplaints} />

                            </div>
                        )}
                    </div>
                }
                />
        )
    }
}
function mapStateToProps(store)
{
    console.log(store.myApp.complaint)
    return {
        user        :store.auth.user,
        complaints  :store.myApp.complaint.complaints
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
      
        getComplaint    :Actions.getComplaint,
        //showMessage     :globalActions.showMessage   
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(Complaint)));

