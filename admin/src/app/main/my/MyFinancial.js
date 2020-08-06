import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';

import ReactTable from 'react-table';
import {FuseUtils, FuseAnimate} from '@fuse';

import api from 'app/ApiConfig.js'
import * as service from 'app/services/utils'


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class MyFinancial extends Component {

    state = {
        financials:[]
    }
    componentDidMount(){
        //console.log(this.props.match.who)
        this.fetchFinancials()
    }
    fetchFinancials = () => {
        api.get('/financial',{
            params:{
                id:this.props.user.userId
            }
        })
        .then(res=>{
            console.log(res.data)
            this.setState({
                financials:res.data.financials
            })
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
                        margin:'30px'
                    }}>
                        <FuseAnimate animation="transition.slideUpIn" delay={300}>

                                <ReactTable
                                    className="-striped -highlight border-0"
                                    getTrProps={(state, rowInfo, column) => {
                                        return {
                                            className: "cursor-pointer",
                                            onClick  : (e, handleOriginal) => {
                                                if ( rowInfo )
                                                {
                                                    //this.props.openEditTaskDialog(rowInfo.original);
                                                }
                                            }
                                        }
                                    }}
                                    data={this.state.financials}
                                    columns={[
                                        {
                                            Header    : "CreateTime",
                                            accessor  : "createTime",
                                            Cell      : t =>{
                                                console.log(t)
                                                return service.formatDateString(t.value)
                                            },
                                            className : "justify-center",
                                            sortable : false
                                            
                                        },
                                        {
                                            Header    : "FinancialType",
                                            accessor  : "financialType",
                                            className : "justify-center",
                                            sortable : false

                                        },
                                        {
                                            Header    : "Amount",
                                            accessor  : "amount",
                                            className : "justify-center",
                                            sortable : false

                                        }
                                    ]}
                                    defaultPageSize={20}
                                    noDataText="No contents found"
                                />
                        </FuseAnimate>

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
export default (withStyles(styles, {withThemem: true})(connect(mapStateToProps)(MyFinancial)));
