import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class ComplaintComponent extends Component {

    componentDidMount(){
        
    }
    render(){
        const {classes} = this.props;
        const typeString = ['Suggestion','Consult','Recharge Problem','Withdraw Problem','Other']
        const stateString = ['Waiting','Answered']
        return(
          
                    <div>
                        {this.props.complaints && (
                            <div>
                                {this.props.complaints.map((item,index)=>{
                                    console.log(item)
                                    return(
                                        <div key={index} style={{
                                            padding:"5px",
                                            margin:'10px',
                                            boxShadow: '0px 0px 1px 1px #8b7b36',
                                            borderRadius:'5px'
                                        }}>
                                            <div style={{
                                                padding:'5px'
                                            }}>
                                                <div style={{
                                                    textAlign:'right'
                                                }}>
                                                    {item.postdate}
                                                </div>
                                            </div>
                                            <div style={{
                                                padding:'5px',
                                                display:'flex',
                                                justifyContent:'space-between'
                                            }}>
                                                <div style={{
                                                    textAlign:'left'
                                                }}>
                                                    Type
                                                </div>
                                                <div style={{
                                                    textAlign:'right'
                                                }}>
                                                    {typeString[item.type]}
                                                </div>
                                            </div>
                                            <div style={{
                                                 padding:'5px',
                                                 display:'flex',
                                                 justifyContent:'space-between'
                                            }}>
                                                <div style={{
                                                    textAlign:'left'
                                                }}>
                                                    State
                                                </div>
                                                <div style={{
                                                    textAlign:'right'
                                                }}>
                                                    {stateString[item.state]}
                                                </div>
                                            </div>
                                            <div style={{
                                                padding:'5px',
                                                display:'flex',
                                                justifyContent:'space-between'
                                            }}>
                                                <div style={{
                                                    textAlign:'left'
                                                }}>
                                                    Description
                                                </div>
                                                <div style={{
                                                    textAlign:'right'
                                                }}>
                                                    {item.description}
                                                </div>
                                            </div>
                                            <div style={{
                                                padding:'5px',
                                                display:'flex',
                                                justifyContent:'space-between'
                                            }}>
                                                <div style={{
                                                    textAlign:'left'
                                                }}>
                                                    Answer
                                                </div>
                                                <div style={{
                                                    textAlign:'right'
                                                }}>
                                                    {item.answewr}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
               
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
export default (withStyles(styles, {withThemem: true})(connect(mapStateToProps)(ComplaintComponent)));

