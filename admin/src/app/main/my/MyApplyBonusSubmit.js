import React, {Component} from 'react';
/**redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import * as userActions from 'app/auth/store/actions';

import {Link, withRouter} from 'react-router-dom';

/**---redux */
import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import {Button,TextField} from '@material-ui/core';


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
var minval = 0
var maxval = 1000
class MyApplyBonusSubmit extends Component {

    state = {
        submitAmount:0
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextprops)
    {
       // console.log(nextprops)
        if(nextprops.applySubmitted == true)
        {
          //  console.log("ere")
          //  this.props.setTodaySubmit(1)
        }
    }
    
    submitAmountChanged = (event) =>{
        console.log(event.target.name)
        console.log(event.target.value)
        
        var val = event.target.value
        if((val <= this.props.user.bonus) && (val >= minval) && (val <= maxval))
            this.setState({
                submitAmount:event.target.value
            })
    }
    submit = () =>{
        
        this.props.submitApplyBonus({
            userId      :   this.props.user.userId,
            submitAmount:   this.state.submitAmount
        })
    }
    render(){
        const {classes} = this.props;

        return(
            <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
               
                content={
                    <div style={{
                        
                        margin:"50px 100px 20px 100px",
                        padding:"50px 100px 20px 100px",
                        boxShadow:"0px 1px 2px 2px #a7986e"
                    }}>
                        <div className="flex" style={{
                             marginBottom:"25px",
                        }}>  
                            <h1>MyBonus : {this.props.user.bonus}</h1>
                        </div>
                        <div className="flex" style={{
                             marginBottom:"20px",
                        }}>  
                            <TextField
                                className="mt-8 mb-16"
                                id="applyAmount"
                                name="applyAmount"
                                label="Apply Amount"
                                type="number"
                                value={this.state.submitAmount}
                                onChange={this.submitAmountChanged}
                                required
                                fullWidth
                            />
                        </div>
                        <div>
                            {this.props.user.todaySubmitBonus == 0 && (<Button variant="contained" color="primary" onClick={this.submit}>Sumbit</Button>)}
                            {this.props.user.todaySubmitBonus == 1 && (
                                <div>
                                    You've already submitted today's apply bonus!
                                </div>
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
    console.log(store)
    return {
        user            :   store.auth.user
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        submitApplyBonus    :   Actions.submitApplyBonus
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyApplyBonusSubmit)));

