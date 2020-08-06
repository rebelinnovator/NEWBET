import React, {Component} from 'react';
/**redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import {Link, withRouter} from 'react-router-dom';

/**---redux */
/**fuse */
import {FusePageSimple, DemoContent} from '@fuse';

/**--fuse */
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';

import {Avatar, Button,Card,Modal, Tab, Tabs,Dialog,DialogActions, DialogContent,DialogTitle,Icon,InputAdornment,TextField,IconButton} from '@material-ui/core';

import MyPromotionLevelComponent from './MyPromotionLevelComponent'
import MyPromotionRecord from './MyPromotionRecord'
const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class MyPromotion extends Component {

    state = {
        selectedTab: 0,
    }
    componentDidMount(){
        console.log(this.props.user.userId)
        
        this.props.getPromotion({
            id          :   this.props.user.userId,
            invite_code :   this.props.user.invite_code
        })
        
    }
    handleTabChange = (event,newTab) => {
        this.setState({selectedTab: newTab})
    }
   
    render(){
        const {classes} = this.props;
        const {selectedTab} = this.state;
        
        let promotionLevel1 = []
        let promotionLevel2 = []
        if(this.props.promotions){
             promotionLevel1 = this.props.promotions.levelones
             promotionLevel2 = this.props.promotions.leveltwos
        }

        return(
            <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div  className="flex flex-col flex-1" style={{
                        backgroundColor: '#665c32',
                        color: '#ffffff',
                        border: '10px #332323'}}>
                             <div className="items-center py-24 px-24">
                            <h4>Avaliable Bonus</h4>
                            <br/>
                            <h2> {parseFloat(this.props.user.bonus).toFixed(2)} US$</h2>
                        </div>
                    </div>

                }
               
                content={
                    <div>
                        <div className="w-full" style={{
                            margin:"10px",
                            padding:"2.4rem!important"
                            
                        }}>
                            <Button 
                                variant="outlined"
                                className="px-4"

                                value={10} 
                                //onClick={this.acceptBonus}
                                to={"/my/promotion/promotionrecord"}
                                component={Link}
                                fullWidth
                                color="primary"
                                style={{
                                    marginTop:'5px'
                                }}
                            >
                                    Promotion Record
                            </Button>
                            <Button 
                                    variant="outlined"
                                    className="px-4"
                                    color="primary"
                                    value={10} 
                                    to={"/my/promotion/bonusrecord"}
                                    component={Link}
                                    fullWidth
                                    style={{
                                                marginTop:'5px'
                                            }}
                                    >
                                   Bonus Record
                            </Button>
                            <Button 
                                    variant="outlined"
                                    className="px-4"
                                    color="primary"
                                    value={10} 
                                    to={"/my/promotion/applybonus"}
                                    component={Link}
                                    fullWidth
                                    style={{
                                                marginTop:'5px'
                                            }}
                                    >
                                   Apply Bonus Record
                            </Button>
                            <Button 
                                    variant="outlined"
                                    className="px-4"
                                    color="primary"
                                    value={10} 
                                    to={"/my/promotion/submitbonus"}
                                    component={Link}
                                    fullWidth
                                    style={{
                                                marginTop:'5px'
                                            }}
                                    >
                                   submit Bonus
                            </Button>
                            <Button 
                                    variant="outlined"
                                    className="px-4"
                                    color="primary"
                                    value={10} 
                                    to={`/my/invite/${this.props.user.userId}`}
                                    component={Link}
                                    fullWidth
                                    style={{
                                                marginTop:'5px'
                                            }}
                                    >
                                   invite Friends
                            </Button>
                        </div>
                        <div>
                        <Tabs
                            value={selectedTab}
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            scrollButtons="off"
                            
                        >
                            <Tab className="h-32" label="Level1"/>
                            <Tab className="h-32" label="Level2"/>

                        </Tabs>
                            {selectedTab === 0 && (
                                <div style={{
                                    display:'flex',
                                    margin:"25px 10px 10px 10px"
                                }}>
                                    <div style={{
                                        flex:1
                                    }}>
                                        <div style={{
                                            opacity:.7
                                        }}>
                                        Total People
                                        </div>
                                        <div>
                                            <h2>
                                            {promotionLevel1 && (<div>
                                                {promotionLevel1.length}
                                            </div>)}
                                            </h2>
                                        </div>
                                       
                                    </div>
                                    <div style={{
                                        flex:1
                                    }}>
                                         <div style={{
                                            opacity:.7
                                        }}>
                                           Contirbution
                                        </div>
                                        <div>
                                            <h2>
                                            {promotionLevel1 && (<div>
                                                {promotionLevel1.length}
                                            </div>)}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {selectedTab === 1 && (
                                <div style={{
                                    display:'flex',
                                    margin:"25px 10px 10px 10px"
                                }}>
                                    <div style={{
                                        flex:1
                                    }}>
                                        <div style={{
                                            opacity:.7
                                        }}>
                                        Total People
                                        </div>
                                        <div>
                                            <h2>
                                            {promotionLevel2 && (<div>
                                                {promotionLevel2.length}
                                            </div>)}
                                            </h2>
                                        </div>
                                       
                                    </div>
                                    <div style={{
                                        flex:1
                                    }}>
                                         <div style={{
                                            opacity:.7
                                        }}>
                                           Contirbution
                                        </div>
                                        <div>
                                            <h2>
                                            {promotionLevel2 && (<div>
                                                {promotionLevel2.length}
                                            </div>)}
                                            </h2>
                                        </div>
                                    </div>
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
 console.log(store.myApp.promotions)
    return {
        user        :   store.auth.user,
        promotions  :   store.myApp.promotions.promotions
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        getPromotion    :   Actions.getPromotion
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyPromotion)));
