import React, {Component} from 'react';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import { withStyles, Card, CardHeader, Button, CardContent, CardActions, Icon, Avatar, IconButton, Typography, Dialog, DialogTitle, DialogActions  } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import api, {BASE_URL} from 'app/ApiConfig'
import * as Actions from 'app/store/actions';

const styles = theme => ({
    root: {
        background: 'black',
        overflow: 'auto'
    },
    title: {
        color: 'white'
    },
    subheader: {
        color: '#9c9fa9'
    },
    card: {
        
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class Browse extends Component
{
    state = {
        finish: false
    }

    componentDidMount() {
        this.fetchData( this.props.match.params )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.fetchData( this.props.match.params );
        }
    }

    fetchData = (params) => {
        api.get('/courses/contents', { 
            params 
        }).then(res => {
            if (!res.data.success) {                
				this.props.showMessage({ message: 'Get Course Failed' });
				this.props.history.push({
					pathname: '/courses'
                })
                return;
            }
            
            let content = {};
            res.data.data.contents.forEach(element => {
                if (element._id === params.contentId) {
                    content = element;
                }
            });
            if (content.file === '') {
                this.props.showMessage({message: 'No videos.'});
            }
            this.setState({
                course: res.data.data,
                content: content
            })
        });
    }

    finish = () => {
        let params = this.props.match.params;
        params.userId = this.props.user.userId
        api.post('/activity/finish', params)
            .then(res => {
                this.props.history.push({
                    pathname: '/courses/detail/'+params.courseId
                })
            })
    }
    
    render() {
        const { classes } = this.props
        const { course, content } = this.state

        if ( !course || !content )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No section found
                    </Typography>
                </div>
            );
        }
        
        return (
            <div style={{overflow: 'auto'}}>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Card className={classNames(classes.card, classes.root, "w-full h-full p-16")}>
                        <CardHeader
                            action={
                            <IconButton aria-label="settings">
                                
                            </IconButton>
                            }
                            title={ course.name }
                            subheader={ content.name }
                            classes={{
                                title: classes.title,
                                subheader: classes.subheader
                            }}
                        />
                        <video src={`${BASE_URL}/uploads/${course._id}/${content.file}?${Date.now()}`} style={{width: '100%', height: 'calc(100% - 250px)', background: 'black'}} controls autoPlay></video>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton aria-label="add to favorites">
                                <Icon>favorite</Icon>
                            </IconButton>
                            <Button 
                                variant="contained"
                                color="primary"
                                style={{position: 'absolute', right: '10px',background: 'linear-gradient(219deg, #867631 0%, #d8c884 73%, #d8c884d1 110%)'}}
                                value="legacy"
                                onClick={() => this.setState({finish: true})}
                            >
                                Finish
                            </Button>
                        </CardActions>                    

                        <Dialog
                            disableBackdropClick
                            disableEscapeKeyDown
                            maxWidth="xs"
                            aria-labelledby="confirmation-dialog-title"
                            open={this.state.finish}
                            >
                            <DialogTitle id="confirmation-dialog-title">FINISHED?</DialogTitle>
                            <DialogActions>
                                <Button autoFocus color="primary" onClick={this.finish}>
                                Yes
                                </Button>
                                <Button color="primary" onClick={() => this.setState({finish: false})}>
                                No
                                </Button>
                            </DialogActions>
                        </Dialog>          
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        showMessage: Actions.showMessage
    }, dispatch);
}

function mapStateToProps(props)
{
    return {
        user: props.auth.user
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Browse));