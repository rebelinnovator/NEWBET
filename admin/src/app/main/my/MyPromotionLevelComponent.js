import React, {Component} from 'react';
/**redux */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';

/**---redux */

import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';

import ReactTable from 'react-table';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class MyPromotionLevelComponent extends Component {

    acceptBonus = () =>{
        this.props.acceptPromotion({
            userId      :   this.props.user.userId,
            level       :   this.props.level
        })
    }
    render(){
        let totalbonus = 0
        if(this.props.promotions)
        {
            this.props.promotions.map((item)=>{
                totalbonus += item.balance * (this.props.level == 1 ? 0.03:0.015)
            })
        }
        return(
            <div>
                
                <Button hidden variant="outlined" color="primary" value={10} onClick={this.acceptBonus}>Accept Bonus</Button>

                {this.props.promotions.map((item)=>{

                    return(
                        <div style={{
                            display        :   'flex',
                            justifyContent  :   'space-between' ,
                            boxShadow   :   '-1px 0px 1px 0px #6b5003',
                            margin:'10px',
                            padding:'10px',
                          //  backgroundColor:'#E6E0C6'
                        }}>
                            <div>
                                <h3>Sender</h3>
                                <div>{item.sender.phonenumber}</div>
                            </div>
                            <div>
                                <h3>commission</h3>
                                <div>{item.balance}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(store)
{
 console.log(store.myApp.promotions)
    return {
        user        :   store.auth.user
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        acceptPromotion    :   Actions.acceptPromotion
    }, dispatch);
}
export default withReducer('myApp',reducer)(withStyles(styles, {withThemem: true})(connect(mapStateToProps,mapDispatchToProps)(MyPromotionLevelComponent)));