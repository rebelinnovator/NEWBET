import React, {Component} from 'react';
import GameResultTable from './gameResultTable';
import api from 'app/ApiConfig.js'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';

import TablePagination from '@material-ui/core/TablePagination';
import ReactTable from 'react-table';
import ColorItem from './coloritem';
import {FuseUtils, FuseAnimate} from '@fuse';

const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
const overrides = {
    MuiTableCell:{
        root:{
            padding:"1px 1px 1px 1px"
        }
    }
}
class GameResult extends Component{

    state = {
        info:[],
        page:0,
        loadingText:false
    }
    componentDidMount(){
        this.setState({loadingText:true})
        this.fetchData()
        this.getNewPage()
    }
    fetchData = () =>{
        console.log("Hey")
        console.log(this.props.match.params)
        
      
        
    }
  
    handleScroll = e => {
        let element = e.target
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
          // do something at end of scroll
          console.log("234")
        }
      }
      getNewPage = () =>{
        console.log(this.state.page)
        this.setState({loadingText:true})
        api.get('/game/bethistory',{
            params:{
              type:this.props.match.params.resultId,
              page:this.state.page
            }
         }
        
        ).then(res=>{
           console.log(res.data)
           if(res.data.result.length == 0)
           {
               this.prevPg()
           }else{
           this.setState({info:res.data.result})

            console.log(this.state)
           
           }
           this.setState({loadingText:false})
        })
      }
      prevPg = async () =>{
        if(this.state.page > 0)
        {
            await this.setState({page:this.state.page-1})
            this.getNewPage()
        }
      }
      nxtPg = async () =>{
        console.log(this.state.page)

        
        await this.setState({page:this.state.page + 1})
        

        this.getNewPage()
     //   console.log(this.state)
      }
    render()
    {
        const {classes} = this.props;
        const typeString=['GOLD','SILVER','BRONZE','OTHER']
        return(
            <MuiThemeProvider theme={{
                ...this.props.theme,
                overrides: overrides
            }}>
            <FusePageSimple
            classes={{
                content: classes.root,
                toolbar: "px-16 sm:px-24"
            }}
            content={
                <div style={{margin:"50px"}}>
                <Card className={classes.root} onScroll={this.handleScroll}>
                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <React.Fragment>
                                <div style={{
                                    margin:"10px",
                                    padding:"10px"
                                }}>
                                    <center>{typeString[this.props.match.params.resultId]}</center>
                                </div>
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
                                    data={this.state.info}
                                    columns={[
                                        {
                                            Header    : "BetTime",
                                            accessor  : "betDisplayTime",
                                            //width    : 64,
                                            /*
                                            Cell      : t =>{
                                                console.log(t)
                                                return service.formatDateString(t.value)
                                            },*/
                                            className : "justify-center",
                                            sortable : false
                                            
                                        },
                                        {
                                            Header    : "BetPrice",
                                            accessor  : "betPrice",
                                            className : "justify-center",
                                            sortable : false

                                        },
                                        {
                                            Header    : "BetNumber",
                                            accessor  : "betNumber",
                                            className : "justify-center",
                                            sortable : false
                                        },
                                        {
                                            Header    : "Betcolor",
                                            accessor  : "betColor",
                                            Cell        : t => {
                                                return <ColorItem value={t.value}/>
                                            },
                                            className : "justify-center",
                                            sortable : false
                                        }
                                    ]}
                                    defaultPageSize={20}
                                    noDataText="No contents found"
                                />
                            </React.Fragment>
                    </FuseAnimate>

                </Card>
                </div>
            }
            />
            </MuiThemeProvider>
        )
    }
}
export default (withStyles(styles, {withThemem: true})(GameResult))