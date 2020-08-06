import React, {Component} from 'react';
/**redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import {Link, withRouter} from 'react-router-dom';

/**---redux */
import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import {TextField,MenuItem, Button, Dialog, DialogActions,InputAdornment, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import api from 'app/ApiConfig.js'
import * as globalActions from 'app/store/actions';


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class MyBankInfo extends Component {

    state = {
         actualname : "",
         ifsccode : "",
         accountnumber : "",
         state : "",
         city : "",
         phonenumber : "",
         otpnumber:0
    }
    form = React.createRef();
    componentDidMount(){
        console.log("234")
        console.log(this.props.info)
        if(this.props.info != -1)
        {
            this.setState({
                actualname : this.props.info.actualname,
                ifsccode : this.props.info.ifsccode,
                accountnumber : this.props.info.accountnumber,
                state : this.props.info.state,
                city : this.props.info.city,
                phonenumber : this.props.info.phonenumber,
            })
           
        }
    }
   
    disableButton = () => {
        this.setState({canSubmit: false});
    }

    enableButton = () => {
        this.setState({canSubmit: true});
    }
    onSubmit = (model) => {
        alert("asdf")
       // this.props.submitRegister(model);
        console.log(model)
       console.log(this.state)
       
        this.props.setBank({
            userId      :this.props.user.userId,
            sessionId   :this.state.otpsession,
            bank        :model
        })
        
    };
    handleChange = (event) =>{
        console.log("asdf")
        if(event.target.name == "phonenumber")
        {
            console.log(event.target.value)
            this.setState({
                phonenumber:event.target.value
            })
        }
    }
    getOTP = () => {
        console.log(this.state.phonenumber)
        if(this.state.phonenumber)
        {
            api.get('/otp',{
                'phonenumber':this.state.phonenumber
            }).then(res=>{
            //   this.setState({...this.state,otpnum:res.sessionId})
                
                this.setState({
                    otpsession:res.data.sessionId
                })
                this.props.showMessage({message:res.data.tip})
            }).catch(err =>{
                console.log(err)
                this.props.showMessage({message:"Unexpected Error Occured!"})
            })
        }else
        {
            this.props.showMessage({message:"phonenumber is missing"})
        }
        
    }
    render(){
        const {classes} = this.props;
   //     console.log(this.state)
       
        return(
            <div  id="New">
                        <Formsy
                            onValidSubmit={this.onSubmit}
                            onValid={this.enableButton}
                            onInvalid={this.disableButton}
                            ref={(form) => this.form = form}
                            className="flex flex-col justify-center w-full h-full"
                        >
                            <div className="flex">
                            
                                <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                        Actual Name
                                </Typography>
                                <TextFieldFormsy
                                    className="mt-8 mb-16"
                                    id="actualname"
                                    name="actualname"
                                    label="Actual Name"
                                    variant="outlined"
                                    type="text"
                                    value={this.state.actualname}
                                  //onChange={this.handleChange}
                                    fullWidth
                                    required
                                >
                                </TextFieldFormsy>
                            </div>
                            <div className="flex">
                            
                                <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                        IFSCCode
                                </Typography>
                                <TextFieldFormsy
                                    className="mt-8 mb-16"
                                    id="ifsccode"
                                    name="ifsccode"
                                    label="IFSC Code"
                                    variant="outlined"
                                    validations={{
                                        isLength: 11,
                                        isAlphanumeric : true
                                    }}
                                    validationErrors={{
                                        isLength: 'IFSC code must 11 characters',
                                        isAlphanumeric:'IFSC code must contain alphanumberic'
                                    }}
                                    type="text"
                                    value={this.state.ifsccode}
                                    fullWidth
                                    required
                                >
                                
                                </TextFieldFormsy>
                            </div>
                            <div className="flex">
                            
                                <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                        Account Number
                                </Typography>
                                <TextFieldFormsy
                                    className="mt-8 mb-16"
                                    id="accountnumber"
                                    name="accountnumber"
                                    label="AccountNumber"
                                    variant="outlined"
                                    validations={{
                                    //    isLength: 11,
                                    //    isAlphanumeric : true
                                    }}
                                    validationErrors={{
                                     //   isLength: 'IFSC code must 11 characters',
                                     //   isAlphanumeric:'IFSC code must contain alphanumberic'
                                    }}
                                    type="text"
                                    value={this.state.accountnumber}
                                  //onChange={this.handleChange}
                                    fullWidth
                                    required
                                >
                                
                                </TextFieldFormsy>
                            </div>
                            <div className="flex">
                            
                                <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                        Confirm Number
                                </Typography>
                                <TextFieldFormsy
                                    className="mt-8 mb-16"
                                    id="confirmnumber"
                                    name="confirmnumber"
                                    label="ConfirmNumber"
                                    variant="outlined"
                                    validations="equalsField:accountnumber"
                                    validationErrors={{
                                        equalsField: 'Confirm Number must match to Account Number',
                                       
                                    }}
                                    type="text"
                                  //onChange={this.handleChange}
                                    fullWidth
                                    required
                                >
                                
                                </TextFieldFormsy>
                            </div>
                            <div className="flex">
                            
                                <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                        State
                                </Typography>
                                <TextFieldFormsy
                                    className="mt-8 mb-16"
                                    id="state"
                                    name="state"
                                    label="State"
                                    variant="outlined"
                                    //validations="equalsField:accountnumber"
                                    //validationErrors={{
                                      //  equalsField: 'Confirm Number must match to Account Number',
                                       
                                    //}}
                                    type="text"
                                    value={this.state.state}
                                  //onChange={this.handleChange}
                                    fullWidth
                                    required
                                >
                                
                                </TextFieldFormsy>
                            </div>
                            <div className="flex">
                            
                                <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                        City
                                </Typography>
                                <TextFieldFormsy
                                    className="mt-8 mb-16"
                                    id="city"
                                    name="city"
                                    label="City"
                                    variant="outlined"
                                    //validations="equalsField:accountnumber"
                                    //validationErrors={{
                                      //  equalsField: 'Confirm Number must match to Account Number',
                                       
                                    //}}
                                    type="text"
                                    value={this.state.city}
                                  //onChange={this.handleChange}
                                    fullWidth
                                    required
                                >
                                
                                </TextFieldFormsy>
                            </div>
                            <div className="flex">
                            
                                <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                        Mobile Number
                                </Typography>
                                <TextFieldFormsy
                                    className="mt-8 mb-16"
                                    id="phonenumber"
                                    name="phonenumber"
                                    label="MobileNumber"
                                    variant="outlined"
                                    validations="isLength:10"
                                    validationErrors={{
                                        isLength: 'Phone number must be 10 numbers',
                                       
                                    }}
                                    type="text"
                                    value={this.state.phonenumber}
                                    onChange={this.handleChange}
                                    fullWidth
                                    required
                                >
                                
                                </TextFieldFormsy>
                            </div>
                            <div className="flex">
                            
                                <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                        Verification Number
                                </Typography>
                                <TextFieldFormsy
                                    className="mt-8 mb-16"
                                    id="verficationnumber"
                                    name="verficationnumber"
                                    label="VerificationNumber"
                                    variant="outlined"
                                    /*
                                    validations="isLength:10"
                                    validationErrors={{
                                        isLength: 'Phone number must be 10 numbers',
                                       
                                    }}
                                    */
                                    type="number"
                                    //value={this.state.phonenumber}
                                 // onChange={this.handleChange}
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end"><Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    aria-label="OTP"
                                    value="legacy"
                                    onClick={this.getOTP}
        
                                >OTP</Button></InputAdornment>,
                                    className: classes.input
                                }}
                                    fullWidth
                                    required
                                >
                                
                                </TextFieldFormsy>
                               
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-16 normal-case"
                                aria-label="Submit"
                                value="legacy"
                            >
                                Submit
                            </Button>

                        </Formsy>
                    </div>
        )
    }
}
function mapStateToProps(store)
{
    console.log(store)
    return {
        user:store.auth.user,
        //bank:store.myApp.bank.bank

    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
      
        setBank     :Actions.setBank,
        showMessage :globalActions.showMessage   
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyBankInfo)))

