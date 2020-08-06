import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';

import {TextField, Button} from '@material-ui/core';


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class Invite extends Component {

    state = {
        invite_url:""
    }

    componentDidMount(){
        console.log(this.props.match.who)
    }
    generateUrl = () => {
        var siteUrl = "http://localhost:3000"
        this.setState({
            invite_url : siteUrl + "/register?invite_key=" + this.props.user.invite_code
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
                    }}
                        
                    >
                        <div style={{
                            margin:'25px'
                        }}>
                            <center><h1 style={{marginBottom:"50px"}}>INVITE YOUR FRIEND TO GET MORE PROFIT!
                            </h1></center>
                            <div style={{
                                marginBottom:"20px",
                                display:"flex",
                                justifyContent:"space-between"
                            }}>
                             <h2>Invite_code:</h2>   
                             <h2 style={{color:'#6B5F2A'}}><center>{this.props.user.invite_code}</center></h2>
                            </div>
                            <Button
                                onClick={this.generateUrl} 
                                color="primary"
                                variant="outlined"
                                fullWidth

                            >
                                    Generate URL
                            </Button>

                            <TextField
                                id="date"
                                fullWidth
                                label="referralURL"
                                type="string"
                                id="startTime"
                                name="startTime"
                                value= {this.state.invite_url}
                                
                                className="mt-8 mb-16"
                                
                            />
                    
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
            user           :store.auth.user
            }
}
export default (withStyles(styles, {withThemem: true})(connect(mapStateToProps)(Invite)));
