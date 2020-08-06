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
                TotalBonus:{totalbonus}
                <Button variant="outlined" color="primary" value={10} onClick={this.acceptBonus}>Accept Bonus</Button>

                <ReactTable
                className="-striped -highlight border-0"
                getTrProps={(state, rowInfo, column) => {
                    return {
                        className: "cursor-pointer",
                        onClick  : (e, handleOriginal) => {
                            if ( rowInfo )
                            {
                             //   this.props.openEditTaskDialog(rowInfo.original);
                            }
                        }
                    }
                }}
                data={this.props.promotions}
                columns={[
                    {
                        Header    : "Sender",
                        accessor  : "sender.phonenumber",
                        className : "font-bold"
                    },
                    {
                        Header    : "BetPeriod",
                        accessor  : "betPeriod",
                        className : "font-bold"
                    },
                    {
                        Header    : "BetType",
                        accessor  : "betType",
                        className : "font-bold"
                    },
                    {
                        Header    : "Balance",
                        accessor  : "balance",
                        className : "font-bold"
                    },
                ]}
                defaultPageSize={10}
                noDataText="No contents found"
            />
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