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

import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class MyPromotionSubmit extends Component {

    componentDidMount(){
        console.log(this.props.match.who)
    }
    
    submitPromotionBalance = () => {

    }
    render(){
        const {classes} = this.props;

        let promotionLevel1 = []
        let promotionLevel2 = []
        promotionLevel1 = this.props.promotions.filter((item) => item.promotionLevel == 1)
        promotionLevel2 = this.props.promotions.filter((item) => item.promotionLevel == 2)
        
        let level1Balance = 0
        let level2Balance = 0

        promotionLevel1.map((item)=>{
            level1Balance += item.balance
        })
        promotionLevel2.map((item)=>{
            level2Balance += item.balance
        })
        
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
                        <div>
                            <h1 style={{backgroundColor:"#6B5F2A",color:'white'}}><center>My promotion report</center></h1>
                        </div>
                        <div>
                        <center>
                        <div style={{
                            margin:'20px 0px 20px 0px'
                        }}>
                            <p>Level1_Balance:<em style={{color:'blue'}} >{level1Balance}</em> * <em style={{color:'red'}}>  0.03   </em> = <em style={{color:'orange'}}>{level1Balance * 0.03}</em></p>
                        </div>
                        <div style={{
                            margin:'20px 0px 20px 0px'
                        }}>
                            <p>Level2_Balance:<em style={{color:'blue'}} >{level2Balance}</em> * <em style={{color:'red'}}>  0.015   </em> = <em style={{color:'orange'}}>{level2Balance * 0.015}</em></p>
                        </div>
                        <div style={{
                            margin:'20px 0px 20px 0px'
                        }}>
                            Total_Balance:<em style={{fontSize:'40px', color:'orange'}}>{level1Balance * 0.03 + level2Balance * 0.015}</em>
                        </div>
                        <div style={{
                            margin:'20px 0px 20px 0px'
                            
                        }}>
                            <Button variant="contained" color="primary" onClick={this.submitPromotionBalance}>Submit</Button>
                        </div>
                        </center>
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
        user:store.auth.user,
        promotions  :   store.myApp.promotions.promotions
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        submitPromotionBalance    :   Actions.submitPromotionBalance
    }, dispatch);
}
export default (withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyPromotionSubmit)));
