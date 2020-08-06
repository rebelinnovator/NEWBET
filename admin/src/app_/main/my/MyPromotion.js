import React, {Component} from 'react';
/**redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';

/**---redux */
/**fuse */
import {FusePageSimple, DemoContent} from '@fuse';

/**--fuse */
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';

import {Avatar, Button,Card,Modal, Tab, Tabs,Dialog,DialogActions, DialogContent,DialogTitle,Icon,InputAdornment,TextField,IconButton} from '@material-ui/core';

import MyPromotionLevelComponent from './MyPromotionLevelComponent'

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
            id  :   this.props.user.userId
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
             promotionLevel1 = this.props.promotions.filter((item) => item.promotionLevel == 1)
             promotionLevel2 = this.props.promotions.filter((item) => item.promotionLevel == 2)
        }
        
        return(
            <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div>HI</div>

                }
                contentToolbar = {
                    <Tabs
                        value={selectedTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full h-64"
                    >
                        <Tab className="h-64" label="Level1"/>
                        <Tab className="h-64" label="Level2"/>
                    </Tabs>
                }
                content={
                    <div>
                        {selectedTab === 0 && (
                            <MyPromotionLevelComponent level={1} promotions={promotionLevel1} />
                        )}
                        {selectedTab === 1 && (
                            <MyPromotionLevelComponent level={2} promotions={promotionLevel2}/>
                        )}
                      
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
