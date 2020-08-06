import React, {Component} from 'react';
/**redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import {Link, withRouter} from 'react-router-dom';

/**---redux */
import LinearProgress from '@material-ui/core/LinearProgress';

import {withStyles,Box,Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography} from '@material-ui/core';

import * as service from 'app/services/utils'

function LinearProgressWithLabel(props) {
    return (
            <div style={{
              margin:"10px"
            }}> 
          <LinearProgress variant="determinate" {...props} />
       
            <Typography variant="body2" color="textPrimary">
              {props.done}/{props.limit}
            </Typography>
            </div>
    );
  }

const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})

class MyOwnTaskComponent extends Component {

    taskGiveup = (e)=>{
        //alert(id)
        console.log(e)
        this.props.giveupTask({
            userId      :   this.props.user.userId
        })
    }
    render(){
        return(
            <div>
                {this.props.tasks.map((item,index)=>{
                    
                    let doing = false
                    let clr = '#AAA'
                    //0 doing
                    //1 complet but not accept
                    //2 complte and success
                    //3 finished by time
                    //4 give up
                    let biglabels = ['Finish','Request','Success','End','GiveUp']
                    let clrs=['#665C32','#665C32','#665C32','#AAA','#AAA']
                    if(item.status == 0 || item.status == 1)//doing
                    {
                        clr = '#665C32'
                        doing = true
                    }
                    return(
                        <div key={index} className="taskComponent" style={{
                            display:'flex',
                            justifyContent:'space-between',
                            margin:'10px',
                            boxShadow:`0px 1px 2px 1px ${clrs[item.status]}`,
                            //opacity:`${}`
                        }}>

                            <div style={{
                                padding:'5px',
                                margin:'5px'
                            }}>
                                <p>
                                Task {item.taskTypeId.taskType}:{item.taskTypeId.referralAmount}referral to recharge and complete the transaction,the reward is{item.taskTypeId.taskBonus}
                                </p>
                                <LinearProgressWithLabel value={100 * item.referralUsers.length / item.referralAmount} limit={item.referralAmount} done={item.referralUsers.length}/>
                                <p style={{
                                    opacity:.5
                                }}>
                                Get  Time: 
                                </p>
                                <p style={{
                                    opacity:.5
                                }}>
                                StartTime:{service.convertDateforPicker(item.taskTypeId.startTime)}
                                </p>
                                <p style={{
                                    opacity:.5
                                }}>
                                End  Time:{service.convertDateforPicker(item.taskTypeId.endTime)}
                                </p>
                            </div>
                            {!doing && (
                                <div style={{
                                    margin:'3rem',
                                    width:'15rem',
                                    transform:'rotate(-10deg)',
                                    boxShadow:`0px 0px 2px 2px ${clrs[item.status]}`,
                                    display:'flex',
                                    justifyContent:'center',
                                    color:`${clr[item.status]}`
                                }}>
                                    <h2>
                                    {biglabels[item.status]}
                                    </h2>
                                </div>
                            )}
                            
                            <div style={{
                                padding:'15px',
                                margin:'5px'
                            }}>
                                {doing && (
                                    <div>
                                    <Button style={{
                                        width:'7rem'
                                    }} variant="outlined" color="primary"
                                    to={`/my/invite/${this.props.user.userId}`}
                                    component={Link}>
                                        {biglabels[item.status]}
                                    </Button>
                                    {item.status == 0 && (
                                        <Button variant="outlined" color="secondary" onClick={this.taskGiveup}>GiveUp</Button>
                                    )}
                                    </div>
                                )}
                                {!doing && (
                                    <Button style={{
                                        width:'7rem'
                                    }} variant="contained" disabled color="primary">
                                        {biglabels[item.status]}
                                    </Button>
                                )}
                            </div>
                           
                        </div>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(store)
{
    return {
        user        :   store.auth.user
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
    //    acceptPromotion    :   Actions.acceptPromotion
        giveupTask      :   Actions.giveupTask
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyOwnTaskComponent)));

