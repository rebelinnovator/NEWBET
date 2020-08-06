import React, {Component} from 'react';
import ManageGameOne from './manageOne'
import {connect} from 'react-redux';

import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {Avatar, Button,Card,Modal, Tab, Tabs,Dialog,DialogActions, DialogContent,DialogTitle,Icon,InputAdornment,TextField,IconButton} from '@material-ui/core';
import io from 'socket.io-client';

let socket = null;

const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class ManageGame extends Component {

    state = {
        countdownInterval : null,
        nowCountdownTime: 0,
        enableButton:true,
        
        selectedType: 0,
        calcdone:0,
        bettingNum:0,
        resultOne:[],
        resultTwo:[],
        resultThree:[],
        resultFour:[]
    }
    componentDidMount(){
//        socket = io('https://rosenfeldpublishing.com')
        socket = io('https://localhost:8888')

        //console.log(this.props.user.userId)
        socket.emit("connectedManager",{user:this.props.user.userId})
        socket.on('recomResult',(data)=>{
            console.log('totalResut')
            console.log(data)
            this.setState({
                bettingNum:data.nowBettingNum,
                calcdone:data.calcdone,
                resultOne:data.result[0],
                resultTwo:data.result[1],
                resultThree:data.result[2],
                resultFour:data.result[3]

            })
            this.setTimer(Math.floor(data.remain / 1000))

        })
    
    }
    setTimer = (num) =>{
        clearInterval(this.state.countdownInterval)
        this.setState({ nowCountdownTime : num })
        let me = this
        this.setState({enableButton:true})

        this.state.countdownInterval = setInterval(()=>{
            me.setState({nowCountdownTime: --this.state.nowCountdownTime})
            if(this.state.nowCountdownTime <= 30)
            {
            //    this.setState({enableButton:false})
            //    this.setState({showAmountDlg:false})
            }
           if(this.state.nowCountdownTime == 0)
           {
               clearInterval(this.state.countdownInterval)
           }
        //   console.log(this.state.bettingNum)
        },1000)
    }
    componentWillUnmount()
    {
      //  console.log("WillUNMount")
      clearInterval(this.state.countdownInterval)

        socket.disconnect()
    }
    handleBetTypeChange = (event,newTab) => {
        console.log("TabChanged")
    //    this.fetchGlobalBettingHistory()
        this.setState({selectedType: newTab})
    }
    setBetResult = (type,result)=>{
        console.log(result)
        socket.emit('setBetResultByAdmin',{
            type:type,
            result:result
        })
    }
    render(){
        const {classes} = this.props;
        const {selectedType} = this.state;

        return(
             <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div className="flex flex-col flex-1" style={{
                        backgroundColor: '#665c32',
                        color: '#ffffff',
                        border: '10px #332323'}}>
                             <center><h2>MANAGE BETTING</h2></center>
                        <div className="items-center py-24 px-24"
                            style={{
                                display:"flex",
                                justifyContent:"space-between"
                            }}>
                                <div>
                               
                                <h3>Period:</h3>
                                <h3>Time:</h3>
                                </div>
                                <div>
                                    
                                <h3>{this.state.bettingNum}</h3>
                                
                                <h3>{this.state.nowCountdownTime}</h3>
                                </div>
                        </div>
                        </div>
                }
                contentToolbar={
                    <Tabs
                    value={selectedType}
                    onChange={this.handleBetTypeChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="off"
                    className="w-full h-64"
                    style={{
                        display:"flex",
                        justifyContent: "space-around"
                    }}
                >
                    <Tab className="h-64" label="Golden"/>
                    <Tab className="h-64" label="Silver"/>
                    <Tab className="h-64" label="Bronze"/>
                    <Tab className="h-64" label="Other"/>
                </Tabs>
                }
                content={
                    <div>
                        <div>
                         {selectedType === 0 && (
                            <ManageGameOne setBetResult={this.setBetResult} type={0} calcdone={this.state.calcdone} result={this.state.resultOne}/>
                        )}
                        {selectedType === 1 && (
                            <ManageGameOne setBetResult={this.setBetResult} type={1} calcdone={this.state.calcdone} result={this.state.resultTwo}/>
                        )}
                        {selectedType === 2 && (
                            <ManageGameOne setBetResult={this.setBetResult} type={2} calcdone={this.state.calcdone} result={this.state.resultThree}/>
                        )}
                        {selectedType === 3 && (
                            <ManageGameOne setBetResult={this.setBetResult} type={3} calcdone={this.state.calcdone} result={this.state.resultFour}/>
                        )}
                        </div>
                    </div>
                }
                />
        )
    }
}
function mapStateToProps(store)
{
    return {
        user:store.auth.user
    }
}
export default (withStyles(styles, {withThemem: true}))(connect(mapStateToProps)(ManageGame))