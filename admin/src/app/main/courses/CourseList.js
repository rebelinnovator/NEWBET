import React, {Component} from 'react';
import { withStyles, GridList, GridListTile, Typography, Icon, LinearProgress} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import api, {BASE_URL} from 'app/ApiConfig'

const styles = theme => ({
    root: {
        background: 'black'
	},
	title: {
		color: 'white'
	}
});

class CourseList extends Component {

    state = {
        courses: []
    };

    componentDidMount()
    {
        this.fetchCourse( { mode: this.props.match.params.mode, userId: this.props.user.userId } );
        this.fetchActivity();
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.fetchCourse( { mode: this.props.match.params.mode, userId: this.props.user.userId} );
            this.fetchActivity();
        }
    }

    fetchCourse = (params) => {
        api.get('/courses/get', {
            params
        }).then(res => {
            this.setState({
                courses: res.data.doc
            })
        });
    }

    fetchActivity = () => {
        api.post('/activity/get/user', {
            userId: this.props.user.userId
        }).then(async (res) => {
            this.setState({ activities: res.data.data });
        })
    }

    render()
    {
        const { courses, activities } = this.state;
        const {classes} = this.props

        if ( !courses || !activities || courses.length === 0 )
        {
            return (
                <div className={classNames(classes.root, "flex items-center justify-center h-full")}>
                    <Typography variant="h5" className={classes.title}>
                        No courses found
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <GridList cols={0} cellHeight={80} className={classNames(classes.root, "p-16")}>
                {
                    courses.map((val, idx) => {
                        const done = Object.keys(this.state.activities).indexOf(`${val._id}`) !== -1 ? this.state.activities[`${val._id}`].length : 0

                        return (
                            <GridListTile
                                classes={{
                                    root: "w-full h-full",
                                    tile: "rounded-8 text-center w-full"
                                }}
                                style={{display: 'flex', background: '#000', padding: '10px', margin: '0 0 10px', border: '1px solid #000', position: 'relative', boxShadow: '0px 0px 9px 1px rgba(252, 255, 255, 0.16)'}}
                                key={idx}
                            >
                                <Link to={`/courses/detail/${val._id}`} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <img src={val.coverimage === '' ? `assets/images/img/icons/s1.png` : `${BASE_URL}/uploads/${val._id}/${val.coverimage}?${Date.now()}`} alt="" style={{width: '70px', height: '60px', borderRadius: '10px', border: '4px solid white'}}/>
                                        <div style={{marginLeft: '10px'}}>
                                            <h4 style={{margin: 0, fontWeight: '600', fontSize: '13px', textAlign: 'left'}} className={classes.title}>
                                                {`${val.name} (${done}/${val.contents.length})`}
                                            </h4>
                                            <small style={{color: '#828caa', marginTop: '10px', display: 'inherit', textAlign: 'left'}}>

                                                <LinearProgress
                                                    style={{width: '300px'}}
                                                    variant="determinate"
                                                    value={ done && val.contents.length ? done / val.contents.length * 100 : 0 }
                                                    color="primary"
                                                />
                                            </small>
                                        </div>
                                    </div>
                                </Link>
                            </GridListTile>
                        )
                    })
                }
                </GridList>
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        
    }, dispatch);
}

function mapStateToProps(props)
{
    return {
        user : props.auth.user
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(CourseList));
