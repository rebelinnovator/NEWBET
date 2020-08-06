import React, {Component} from 'react';
/**redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import {Link, withRouter} from 'react-router-dom';

/**---redux */
import {FusePageSimple, FuseAnimate,DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import {TextField,MenuItem, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import Formsy from 'formsy-react';
import {TextFieldFormsy} from '@fuse';
import MyBankInfo from './MyBankInfo'


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    },
    container:{
        margin:"50px"
    }

})
class MyBank extends Component {

    state = {
        canSubmit: false,
        actualName:"",
        isEdit:false
    }
    componentDidMount(){
        //console.log(this.props.match.who)
        this.props.getBank({
            userId:this.props.user.userId
        })
    }
    form = React.createRef();
    disableButton = () => {
        this.setState({canSubmit: false});
    }

    enableButton = () => {
        this.setState({canSubmit: true});
    }

    onEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit
        })
    }
    delete = () =>{
        this.props.deletebank({
            userId: this.props.user.userId
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
                    
                    <div className={classes.container}>
                        {this.props.bank == -1  && (
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                        <MyBankInfo info={this.props.bank}/>
                        </FuseAnimate>
                    )}
                    {this.props.bank != -1 && (
                        <div>
                            <div style={{
                                display:"flex",
                                justifyContent:"space-between",
                                boxShadow:'0px 0px 1px 1px #6b5003',
                                padding:'15px',
                                borderRadius:'5px',
                                backgroundColor:"#6B5F2A",
                                color:"white"

                            }}>

                                <div >
                                    <div>
                                        <h2>IFSC : {this.props.bank.ifsccode}</h2>
                                    </div>
                                    <div>
                                    <em><h3>{this.props.bank.phonenumber}</h3></em>
                                    </div>
                                </div>
                                <div>
                                    <button style={{color:'white'}} onClick={this.onEdit}>edit</button>
                                </div>
                            </div>
                            {this.state.isEdit && (
                                <div style={{
                                    boxShadow:'0px 0px 1px 1px #6b5003',
                                    padding:'15px',
                                }}>
                                <MyBankInfo info={this.props.bank}/>
                                <Button
                                    name="Hi"
                                    variant="contained"
                                    color=""
                                    className="w-full mx-auto mt-16 normal-case"
                                    aria-label="Submit"
                                    value="legacy"
                                    onClick={this.delete}
                                >
                                    Delete
                                </Button>
                                </div>
                            )}
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
        user:store.auth.user,
        bank:store.myApp.bank.bank
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        getBank    :   Actions.getBank,
        deletebank  :   Actions.deletebank
  //      setBank     :   Actions.setBank

    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyBank)));

