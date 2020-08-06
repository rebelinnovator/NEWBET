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
        return(
            <MuiThemeProvider theme={{
                ...this.props.theme,
                overrides: overrides
            }}>
            <FusePageSimple
            classes={{
                content: "flex flex-col flex-auto overflow-hidden",
                header : "h-72 min-h-72"
            }}
            header={
                <div></div>
            }
            content={
                
                <Card className={classes.root} onScroll={this.handleScroll}>
                    <CardContent>
                    
                    <div><GameResultTable limit={10} list={this.state.info} /></div>
                    
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={this.prevPg}>Prev</Button>
                        <p>{this.state.page + 1}</p>
                        <Button size="small" onClick={this.nxtPg}>Next</Button>
                    </CardActions>
                </Card>

            }
            />
            </MuiThemeProvider>
        )
    }
}
export default (withStyles(styles, {withThemem: true})(GameResult))