import React, {Component} from 'react';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';


import {Avatar, Button,Card,Modal,Typography, Tab, Tabs,Dialog,DialogActions, DialogContent,DialogTitle,Icon,InputAdornment,TextField,IconButton} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';

import {FusePageSimple, DemoContent} from '@fuse';
import { connect } from 'react-redux';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    },
    media: {
        height: 140,
      },
    item:{
        transitionProperty      : 'box-shadow',
        
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        boxShadow               : '0px 0px 1px 1px #665C32',
        '&:hover'               : {
                      
            boxShadow           : '0px 0px 3px 3px #665C32',
        },
    }
})
class My extends Component {

    render(){
    const {classes} = this.props;

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
                            <h4>Avaliable Balance</h4>
                            <br/>
                            <h2> {parseFloat(this.props.user.balance).toFixed(2)} US$</h2>
                        </div>
                   
                    </div>
            }
            content={
                <div className="flex justify-center  flex-wrap" style={{padding:"30px"}}>
                    
                    <Card className={classes.item} style={{
                        margin:"30px",
                        width:"300px",

                    }}>
                        <CardActionArea
                        to={`/my/task`}
                        component={Link}>
                            <CardMedia
                            className={classes.media}
                            //image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <center>
                            <Typography gutterBottom variant="h5" component="h5">
                                Task Center
                            </Typography>
                            </center>
                            <Typography variant="body2" color="textSecondary" component="p">
                                  
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card className={classes.item} style={{
                        margin:"30px",
                        width:"300px",

                    }}>
                        <CardActionArea
                         to={`/my/promotion`}
                        component={Link}>
                            <CardMedia
                            className={classes.media}
                           
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <center>

                            <Typography gutterBottom variant="h5" component="h2">
                                Promotion
                            </Typography>
                            </center>
                            <Typography variant="body2" color="textSecondary" component="p">
                                  
                                  </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className={classes.item} style={{
                        margin:"30px",
                        width:"300px",

                    }}>
                        <CardActionArea
                        to={`/my/wallet`}
                        component={Link}>
                            <CardMedia
                            className={classes.media}
                           // image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <center>

                            <Typography gutterBottom variant="h5" component="h2">
                                Wallet
                            </Typography>
                            </center>
                            <Typography variant="body2" color="textSecondary" component="p">
                                  
                                  </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className={classes.item} style={{
                        margin:"30px",
                        width:"300px",

                    }}>
                        <CardActionArea
                        to={`/my/bank`}
                        component={Link}>
                            <CardMedia
                            className={classes.media}
                           // image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <center>

                            <Typography gutterBottom variant="h5" component="h2">
                                Bank
                            </Typography>
                            </center>

                            <Typography variant="body2" color="textSecondary" component="p">
                                  
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className={classes.item} style={{
                        margin:"30px",
                        width:"300px",

                    }}>
                        <CardActionArea
                        to={`/my/financial`}
                        component={Link}>
                            <CardMedia
                            className={classes.media}
                            //image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <center>

                            <Typography gutterBottom variant="h5" component="h2">
                                Financial
                            </Typography>
                            </center>
                            <Typography variant="body2" color="textSecondary" component="p">
                                  
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className={classes.item} style={{
                        margin:"30px",
                        width:"300px",

                    }}>
                        <CardActionArea
                        to={`/my/complaint`}
                        component={Link}>
                            <CardMedia
                            className={classes.media}
                            //image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <center>

                            <Typography gutterBottom variant="h5" component="h2">
                                Complaint && suggestion
                            </Typography>
                            </center>
                            <Typography variant="body2" color="textSecondary" component="p">
                                  
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
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
        user        :   store.auth.user,
    }
}
export default (withStyles(styles, {withThemem: true})(withReducer('myApp',reducer)(connect(mapStateToProps)(My))))