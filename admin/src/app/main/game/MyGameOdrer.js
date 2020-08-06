import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import api from 'app/ApiConfig.js'
import {Avatar, Button,Card,Modal, Tab, Tabs,Dialog,DialogActions, DialogContent,DialogTitle,Icon,InputAdornment,TextField,IconButton} from '@material-ui/core';


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class MyGameOrder extends Component {

    state={
        bets:[],
        selectedTab: 0,

    }
    handleTabChange = (event,newTab) => {

        this.setState({selectedTab: newTab})
    }
    componentDidMount(){
        console.log(this.props.match.params.id)

        api.get('/game/order',{
            params:{
                userId  :this.props.user.userId,
                type    :this.props.match.params.id
            }
        }).then((res)=>{
            this.setState({
                bets:res.data.bets
            })
        })
    }
    render(){
        const {classes} = this.props;
        const {selectedTab} = this.state
        let waiting = []
        let ordered = []
        waiting = this.state.bets?this.state.bets.filter((item)=>item.betOrdered == false):[]
        ordered = this.state.bets?this.state.bets.filter((item)=>item.betOrdered == true):[]

        return(
            <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
                
                content={
                    <div>
                        <Tabs
                            value={selectedTab}
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="off"
                            variant="fullWidth"

                            className="w-full h-64"
                        >
                            <Tab className="h-64" label="Waiting"/>
                            <Tab className="h-64" label="Historical"/>
            
                        </Tabs>
                        {selectedTab == 0 && (
                            <div>
                                {waiting && waiting.map((item,index)=>{
                                    
                                    return(
                                        <div key={index} style={{
                                            boxShadow:'0px 0px 1px 1px #8b7b36',
                                            borderRadius:'5px',
                                            margin:'10px',
                                            padding:'5px'
                                        }}>
                                            <div style={{
                                                textAlign:'right'
                                            }}>
                                                createTime:{item.betTime}
                                            </div>
                                            <div>
                                                {item.betCardAmount * item.betCardCount}US$
                                            </div>
                                            <div style={{
                                                display:'flex',
                                                
                                            }}>
                                                <div style={{flex:'1'}}>
                                                    Period
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betTime}
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    Select
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betCardType}
                                                </div>
                                            </div>
                                            <div style={{
                                                display:'flex',
                                                
                                            }}>
                                                <div style={{flex:'1'}}>
                                                    status
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betResult}
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    Delivery
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betDelevery}
                                                </div>
                                            </div>
                                            <div style={{
                                                display:'flex',
                                                
                                            }}>
                                                <div style={{flex:'1'}}>
                                                    Fee
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betFee}
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    Amount
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betAmount}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {selectedTab == 1 && (
                            <div>
                                {ordered && ordered.map((item,index)=>{
                                    
                                    return(
                                        <div key={index} style={{
                                            boxShadow:'0px 0px 1px 1px #8b7b36',
                                            borderRadius:'5px',
                                            margin:'10px',
                                            padding:'5px'
                                        }}>
                                            <div style={{
                                                textAlign:'right'
                                            }}>
                                                createTime:{item.betTime}
                                            </div>
                                            <div>
                                                {item.betCardAmount * item.betCardCount}US$
                                            </div>
                                            <div style={{
                                                display:'flex',
                                                
                                            }}>
                                                <div style={{flex:'1'}}>
                                                    Period
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betTime}
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    Select
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betCardType}
                                                </div>
                                            </div>
                                            <div style={{
                                                display:'flex',
                                                
                                            }}>
                                                <div style={{flex:'1'}}>
                                                    status
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betResult}
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    Delivery
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betDelevery}
                                                </div>
                                            </div>
                                            <div style={{
                                                display:'flex',
                                                
                                            }}>
                                                <div style={{flex:'1'}}>
                                                    Fee
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betFee}
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    Amount
                                                </div>
                                                <div style={{flex:'1'}}>
                                                    {item.betAmount}
                                                </div>
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
        user:store.auth.user
    }
}

export default (withStyles(styles, {withThemem: true})(connect(mapStateToProps)(MyGameOrder)));

