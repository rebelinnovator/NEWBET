import React, {Component} from 'react';
/**redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import {Link, withRouter} from 'react-router-dom';

/**---redux */
import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import {Avatar, Button,Card,Modal, Tab, Tabs,Dialog,DialogActions, DialogContent,DialogTitle,Icon,InputAdornment,TextField,IconButton} from '@material-ui/core';


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class MyBonusRecord extends Component {

    state = {
        selectedTab:0
    }
    componentDidMount(){
        this.props.getBonus({
            id          :   this.props.user.userId
        })
    }
    handleTabChange = (event,newTab) => {
        
        this.setState({selectedTab: newTab})
    }
    render(){
        const {classes} = this.props;
        const {selectedTab} = this.state;
        
        const levelOneBonus = this.props.bonus?this.props.bonus.filter((item)=>item.promotionLevel == 1):[]
        const levelTwoBonus = this.props.bonus?this.props.bonus.filter((item)=>item.promotionLevel == 2):[]

        return(
            <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
                contentToolbar={
                    <div style={{
                        width: '-webkit-fill-available'
                    }}>
                    <Tabs
                        value={selectedTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollButtons="off"
                        className="w-full h-64"
                        variant="fullWidth"
                    >
                        <Tab className="h-64" label="Level1"/>
                        <Tab className="h-64" label="Level2"/>

                    </Tabs>
                    </div>
                }
                content={
                    <div>
                        {selectedTab === 0 && (
                            <div>
                                {levelOneBonus.map((item,index)=>{
                                    return(
                                        <div key={index} style={{
                                            display        :   'flex',
                                            justifyContent  :   'space-between' ,
                                            boxShadow   :   '-1px 0px 1px 0px #6b5003',
                                            margin:'10px',
                                            padding:'10px',
                                          //  backgroundColor:'#E6E0C6'
                                        }}>
                                            <div>
                                                <h3>Sender</h3>
                                                <div>{item.sender.phonenumber}</div>
                                            </div>
                                            <div>
                                                <h3>Date</h3>
                                                <div>{item.createtime}</div>
                                            </div>
                                            <div>
                                                <h3>Balance</h3>
                                                <div>{item.balance}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {selectedTab === 1 && (
                            <div>
                                {levelTwoBonus.map((item,index)=>{
                                    console.log(item)
                                    return(
                                        <div key={index} style={{
                                            display        :   'flex',
                                            justifyContent  :   'space-between' ,
                                            boxShadow   :   '-1px 0px 1px 0px #6b5003',
                                            margin:'10px',
                                            padding:'10px',
                                          //  backgroundColor:'#E6E0C6'
                                        }}>
                                            <div>
                                                <h3>Sender</h3>
                                                <div>{item.sender.phonenumber}</div>
                                            </div>
                                            <div>
                                                <h3>Date</h3>
                                                <div>{item.createtime}</div>
                                            </div>
                                            <div>
                                                <h3>Balance</h3>
                                                <div>{item.balance}</div>
                                            </div>
                                        </div>
                                    )
                                })}
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
    console.log(store)
    return {
        user        :   store.auth.user,
        bonus       :   store.myApp.promotions.bonus
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        getBonus    :   Actions.getBonus
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyBonusRecord)));

