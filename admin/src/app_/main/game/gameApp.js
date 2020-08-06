import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';
import {Avatar, Button,Card,Modal, Tab, Tabs,Dialog,DialogActions, DialogContent,DialogTitle,Icon,InputAdornment,TextField,IconButton} from '@material-ui/core';
import classNames from 'classnames';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import io from 'socket.io-client';
import api from 'app/ApiConfig.js'
import withReducer from 'app/store/withReducer';
//import reducer from './store/reducers';
import {Link, withRouter} from 'react-router-dom';
import GameButtonGroup from './gameButtonGroup';
import GameTimeCount from './gameTimeCount';
import GameResultTable from './gameResultTable';
import GameWaitingBet from './gameWaitingBets';

import { actions } from 'react-table';

let socket = null;

const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
const overrides = {
    MuiInputBase: {
        root: {
            color: "black"
        }
    },
    MuiCheckbox: {
        root: {
            color: "white"
        }
    },
    MuiFormControlLabel: {
        label: {
            color: 'black'
        }
    },
    MuiOutlinedInput: {
        notchedOutline: {
            borderColor: "#bfbab28c !important"
        }
    },
    MuiButtonBase:{
        root:{
            color:"white",
            minWidth:"10px"
        }
    },
 //  MuiTypography-root-28365 MuiTypography-body2-28373 MuiFormControlLabel-label-28406
    MuiTableCell:{
        root:{
            padding:"1px 1px 1px 1px"
        }
    },
    MuiTypography:{
        root:{
            color:"black"
        }
       
    },
    //MuiPaper-root-71288 MuiPaper-elevation24-71314 MuiPaper-rounded-71289 MuiDialog-paper-71166 MuiDialog-paperScrollPaper-71167 MuiDialog-paperWidthSm-71170

    MuiDialog:{
        paper:{
            width:"100%",
            margin:"10px 5px 1px 5px"
        }
        /*,
        scrollPaper:{
            justifyContent:"flex-end !important",
            alignItems:"center"
        }
        */
    },
    //MuiDialogTitle-root-23386
    MuiDialogTitle:{
        root:{
            height:"30px",
            margin:"10px 5px 1px 5px",
            backgroundColor:"white",
            borderBottom:"2px #332e19!important"
        }
    }
}


class Game extends Component {

    state = {
        selectedTab: 0,
        countdownInterval : null,
        nowCountdownTime: 0,
        enableButton:true,

        showAmountDlg:false,
        nowSelectCard:0,
        nowSelectAmountCard:0,
        nowSelectCardCount:0,

        resultHistory0:null,
        resultHistory1:null,
        resultHistory2:null,
        resultHistory3:null,

        balance:0,
        waitingBets:[],

        bettingNum:"",

        loadingText:false,
        showMsg:false,
        errInfo:"",
        msgType:0

    }

 
    componentDidMount(){
    //    this.props.getUserInfo()
        
    //loading enable
        this.setState({loadingText:true})
        socket = io('http://localhost:8888')
    //      socket = io('https://rosenfeldpublishing.com')
        socket.emit("connectedUser",{user:this.props.user.userId})

        socket.on("startNewBetting",(data)=>{
            console.log(data)
            this.setTimer(Math.floor(data.remain / 1000))
            this.setState({
                resultHistory0:data.history.type0,
                resultHistory1:data.history.type1,
                resultHistory2:data.history.type2,
                resultHistory3:data.history.type3,
                balance:data.balance,
                bettingNum:data.nowBettingNum,
                waitingBets:data.waitingBets
            })
            //set balance
            //set history

            //loading disable
            this.setState({loadingText:false})
        })
        socket.on('bettingFinished', () =>
            {
        
            //loading enable
            this.setState({loadingText:true})

            }
        )
 
        console.log(this.props.user)    
        
    }
    componentWillUnmount()
    {
        console.log("WillUNMount")
        socket.disconnect()
        clearInterval(this.state.countdownInterval)

    }
   
    fetchGlobalBettingHistory = () =>{
        console.log("FETCH")
        api.get('/game/bethistory',{
            headers: {
            "Access-Control-Allow-Origin": "*",
         }
            
        }
        ).then(res=>{
            console.log("234234")
            console.log(res.data.result)
            
            this.setState({
                resultHistory0:res.data.result.type0,
                resultHistory1:res.data.result.type1,
                resultHistory2:res.data.result.type2,
                resultHistory3:res.data.result.type3
            })
            /*
            console.log(this.state)
            res.data.result.type0.map((item)=>{
                console.log(item)
            })
            */
        })
    }
    handleTabChange = (event,newTab) => {
        console.log("TabChanged")
    //    this.fetchGlobalBettingHistory()
        this.setState({selectedTab: newTab})
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
                this.setState({enableButton:false})
                this.setState({showAmountDlg:false})
            }
           if(this.state.nowCountdownTime == 0)
           {
               clearInterval(this.state.countdownInterval)
           }
        //   console.log(this.state.bettingNum)
        },1000)
    }
    betClicking = (value) =>{
        console.log(value)
        console.log(value.target.parentElement.value)
        if(value.target.parentElement.value){
            this.setState({showAmountDlg:true})
            this.setState({nowSelectCard:value.target.parentElement.value})
        }
    }

    //carddlg
    cardAmountTypeChange = (value) =>{
        console.log(value.target.value)
        this.setState({
            
            nowSelectAmountCard:value.target.value
        })
    }
    cardNumTypeChange = (value) => {
        this.setState({
            nowSelectCardCount:value.target.value
        })
    }
    postCardInfo = () => {
        this.setState({showAmountDlg:false})
        console.log("before post")
        console.log(this.state.nowSelectCard)
        api.post('/game/bet', {
            'user':this.props.user,
            'type': this.state.selectedTab,
            'cardType': this.state.nowSelectCard,
            'cardAmount': this.state.nowSelectAmountCard,
            'cardCount': this.state.nowSelectCardCount
        }).then(res=>{
            console.log(res)
            if(res.data.success == true){
                this.setState({
                    balance:res.data.remain,
                    waitingBets:res.data.waitingBet
                })
                console.log("HHHHHHH")
                console.log(this.state.waitingBets)
                
                this.setState({msgType:1})
            }else
            {
                this.setState({msgType:2})
                this.setState({errInfo:res.data.msg})

                this.setState({showMsg:true})
                setTimeout(()=>{
                    this.setState({showMsg:false})
                },5000)
                    
            }
            
            
        })
    }
    modalClose = () =>{
        
    }
    render()
    {
        const {classes} = this.props;
        const {selectedTab} = this.state;
        const waitingBets0 = this.state.waitingBets.filter((item)=>item.betType == 0)
        const waitingBets1 = this.state.waitingBets.filter((item)=>item.betType == 1)
        const waitingBets2 = this.state.waitingBets.filter((item)=>item.betType == 2)
        const waitingBets3 = this.state.waitingBets.filter((item)=>item.betType == 3)

        return (
            <MuiThemeProvider theme={{
                ...this.props.theme,
                overrides: overrides
            }}>
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
                        { this.state.loadingText && (
                            <div>
                                Loading...
                            </div>
                        )}
                        {this.state.showMsg && (
                         <div style={{
                                            border:"1px solid #93d8aa",
                                            backgroundColor:"#e0ffd7",
                                            margin:"5px",
                                            padding:"10px 5px 10px 5px",
                                            borderRadius:"3px",
                                            color:"#332e19",
                                            fontSize:"1.4rem",
                                            fontFamily:"Helvetica",
                                            position:'fixed',
                                            top:'100px',
                                            right:'4px',
                                            hegiht:'50px',
                                            zIndex:'-1!important'
                                            
                                            }}>

                            {this.state.errInfo}
                        </div>
                        )}
                        <div className="items-center py-24 px-24">
                            <h2>Avaliable Balance</h2>
                            <br/>
                            <h4>{this.state.balance} US$</h4>
                        </div>
                    </div>
                }
                contentToolbar={
                    <Tabs
                        value={selectedTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full h-64"
                    >
                        <Tab className="h-64" label="Gold"/>
                        <Tab className="h-64" label="Silver"/>
                        <Tab className="h-64" label="Bronze"/>
                        <Tab className="h-64" label="Other"/>
           
                    </Tabs>
                }
                content={
                    <React.Fragment>
                    <div className="p-8">
                        <div className="flex flex-col flex-1">
                           <div style={{
                               display:"flex",
                               justifyContent:'space-between'
                           }}>
                                <h5>Period</h5>
                                <h5>Count down</h5>
                            </div>
                            <br/>
                            <div style={{
                               display:"flex",
                               justifyContent:'space-between'
                           }}>
                            <p style={{
                                fontSize:"20px"
                            }}>{this.state.bettingNum}</p>
                            <GameTimeCount remainTime = {this.state.nowCountdownTime}/>
                            </div>
                        </div>
                        <br/>
                         <div>
                           
                            <GameButtonGroup enabled = {this.state.enableButton} buttonClick = {this.betClicking}/>
                          </div>
                           <br/>
                        <div style={{
                               display:"flex",
                               justifyContent:'space-between'
                           }}>
                            <h2>Record</h2>
                        <Button
                            to={`/result/${this.state.selectedTab}`}
                            component={Link}
                            className="px-4"
                            color="primary"
                        >
                            View more
                        </Button>
                        </div>
                        {selectedTab === 0 && (
                            <GameResultTable limit={10} list={this.state.resultHistory0}/>
                        )}
                        {selectedTab === 1 && (
                            <GameResultTable limit={10} list={this.state.resultHistory1}/>

                        )}
                        {selectedTab === 2 && (
                            <GameResultTable limit={10} list={this.state.resultHistory2}/>
                        )}
                        {selectedTab === 3 && (
                            <GameResultTable limit={10} list={this.state.resultHistory3}/>
                        )}
                    </div>
                    
                    <div className="p-8">
                    <h2>Waiting Bets</h2>
                       {selectedTab === 0 && (
                            <GameWaitingBet bets={waitingBets0}/>
                        )}
                        {selectedTab === 1 && (
                            <GameWaitingBet bets={waitingBets1}/>
                        )}
                        {selectedTab === 2 && (
                            <GameWaitingBet bets={waitingBets2}/>
                        )}
                        {selectedTab === 3 && (
                            <GameWaitingBet bets={waitingBets3}/>
                        )}
                    </div>
                    
                        <MuiThemeProvider theme={{
                            ...this.props.theme,
                            overrides: overrides
                        }}>
                            <Dialog
                                open={this.state.showAmountDlg}
                                aria-labelledby="form-dialog-title"
                            >
                                <DialogTitle id="form-dialog-title" disableTypography style={{display: 'flex', justifyContent: 'space-between', alignItems: 'bottom'}}>
                                    <h2>Select Bid Card</h2>
                                    <IconButton style={{right: '-25px', top: '-10px'}} onClick={()=>this.setState({showAmountDlg: false})}>
                                        <Icon>close</Icon>
                                    </IconButton>
                                </DialogTitle>
                                <br/>
                                <DialogContent>
                                    <div className="p-16">
                                    <div style={{
                                            display:"flex",
                                            justifyContent:'space-between'
                                        }}>
                                    <h3>Card Amount(US$)</h3>
                                    <RadioGroup row aria-label="gender"  name="cardType" value={this.state.nowSelectAmountCard} onChange={this.cardAmountTypeChange}>
                                        <FormControlLabel value='10' control={<Radio />} label="10" />
                                        <FormControlLabel value='100' control={<Radio />} label="100" />
                                        <FormControlLabel value='1000' control={<Radio />} label="1000" />
                                        <FormControlLabel value='10000' control={<Radio />} label="10000" />
                                    </RadioGroup>
                                    </div>
                                    <div style={{
                                            display:"flex",
                                            justifyContent:'space-between'
                                        }}>
                                              <h3>Number of Cards</h3>
                                    <RadioGroup row aria-label="gender"  name="cardNumType" value={this.state.nowSelectCardCount} onChange={this.cardNumTypeChange}>
                                        <FormControlLabel value='1' control={<Radio />} label="1" />
                                        
                                        <FormControlLabel value='3' control={<Radio />} label="3" />
                                        <FormControlLabel value='5' control={<Radio />} label="5" />
                                        <FormControlLabel value='7' control={<Radio />} label="7" />                                        
                                    </RadioGroup>
                                        </div>

                                        <div style={{border:"1px solid #93d8aa",
                                            backgroundColor:"#e0ffd7",
                                            margin:"5px",
                                            padding:"10px 5px 10px 5px",
                                            borderRadius:"3px",
                                            color:"#332e19",
                                            fontSize:"1.4rem",
                                            fontFamily:"Helvetica"
                                            
                                            }}>

                                             {this.state.nowSelectCardCount} of {this.state.nowSelectAmountCard} (US$) cards are selected!
                                            </div>
                                    </div>
                                </DialogContent>
                                <DialogActions>

                                    <Button variant="outlined" color="secondary"  onClick={()=>{this.setState({showAmountDlg:false})}}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="primary"  onClick={this.postCardInfo} color="primary">
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </MuiThemeProvider>
                    </React.Fragment>

                }
            />
            </MuiThemeProvider>
        )
    }
    
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
    //   getUserInfo:Actions.getUserInfo,
    }, dispatch);
}
function mapStateToProps(store)
{
    console.log(store)
    return {
        user:store.auth.user
    }
}
export default (withStyles(styles, {withThemem: true})(connect(mapStateToProps, mapDispatchToProps)(Game)));