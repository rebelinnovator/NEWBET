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
import * as service from 'app/services/utils'


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})

class MyApplyBonusRecord extends Component {

    state = {
        submitAmount:0
    }
    componentDidMount(){
        this.props.getApplyRecord({
            userId      :   this.props.user.userId
        })
    }
    
    render(){
        const {classes} = this.props;
        const statestring = ['pending','cancel','ignore','success','success']
        return(
            <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
               
                content={
                    <div style={{
                        /*
                        margin:"50px 100px 20px 100px",
                        padding:"50px 100px 20px 100px",
                        boxShadow:"0px 1px 2px 2px #a7986e"
                        */
                    }}>
                        <div className="flex" style={{
                                      margin:'10px',
                                      padding:'10px',
                            
                        }}>  
                            
                        </div>
                        <div>
                                {this.props.applybonus && this.props.applybonus.map((item,index)=>{
                                    return(
                                        <div key = {index} style={{
                                            display        :   'flex',
                                            justifyContent  :   'space-between' ,
                                            boxShadow   :   '-1px 0px 1px 0px #6b5003',
                                            margin:'10px',
                                            padding:'10px',
                                            
                                          //  backgroundColor:'#E6E0C6'
                                        }}>
                                            <div>
                                                <h3>applyAmount</h3>
                                                <div>{item.applyAmount}</div>
                                            </div>
                                            <div>
                                                <h3>realAmount</h3>
                                                <div>{item.realAmount}</div>
                                            </div>
                                            <div>
                                                <h3>state</h3>
                                                <div>{statestring[item.applyState]}</div>
                                            </div>
                                            <div>
                                                <h3>applyTime</h3>
                                                <div>{service.convertDateforPicker(item.applyTime)}</div>
                                            </div>
                                        </div>
                                    )
                                })}
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
        user            :   store.auth.user,
        applybonus      :   store.myApp.promotions.applybonus
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        getApplyRecord    :   Actions.getApplyRecord,
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyApplyBonusRecord)));

