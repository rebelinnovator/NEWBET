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
class MyPromotionRecord extends Component {

    state = {
        selectedTab:0
    }
    componentDidMount(){
        /*
        this.props.getPromotion({
            id          :   this.props.user.userId,
            invite_code :   this.props.user.invite_code
        })
        */
       if(!this.props.promotions)
       {
           this.props.getPromotion({
            id          :   this.props.user.userId,
            invite_code :   this.props.user.invite_code
        })
       }
    }

    handleTabChange = (event,newTab) => {
        
        this.setState({selectedTab: newTab})
    }
    render(){
        const {classes} = this.props;
        const {selectedTab} = this.state;
        const levelones = this.props.promotions.levelones
        const leveltwos = this.props.promotions.leveltwos
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
                                {levelones && levelones.map((item,index)=>{
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
                                                <h3>Phonenumber</h3>
                                                <div>{item.phonenumber}</div>
                                            </div>
                                            <div>
                                                <h3>CreateTime</h3>
                                                <div>{item.start_time}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {selectedTab === 1 && (
                            <div>
                                {leveltwos && leveltwos.map((item,index)=>{
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
                                                <h3>Phonenumber</h3>
                                                <div>{item.phonenumber}</div>
                                            </div>
                                            <div>
                                                <h3>CreateTime</h3>
                                                <div>{item.start_time}</div>
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
        promotions  :   store.myApp.promotions.promotions
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        getPromotion    :   Actions.getPromotion
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyPromotionRecord)));

