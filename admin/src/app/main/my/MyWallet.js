import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FusePageSimple, DemoContent} from '@fuse';

import {Link, withRouter} from 'react-router-dom';
import {withStyles,Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography} from '@material-ui/core';


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class MyWallet extends Component {

    componentDidMount(){
        console.log(this.props.match.who)
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
                        <center>
                        <div>
                            <p>My Balance : <em style={{fontSize:'40px', color:'orange'}}>{this.props.user.balance}</em></p>
                
                        </div>
                        <div style={{
                            margin:'30px'
                        }}>
                            <Button
                                to={`/my/invite/${this.props.user.userId}`}
                                component={Link}
                                className="px-4"
                                variant="outlined"
                                style={{
                                    marginRight:"30px"
                                }}
                            >
                                Recharge
                            </Button>
                            <Button
                                to={`/my/invite/${this.props.user.userId}`}
                                component={Link}
                                className="px-4"
                                variant="outlined"
                                style={{
                                    marginLeft:"30px"
                                }}
                            >
                                Withdrawl
                            </Button>
                        </div>

                        </center>
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
export default (withStyles(styles, {withThemem: true})(connect(mapStateToProps)(MyWallet)));
