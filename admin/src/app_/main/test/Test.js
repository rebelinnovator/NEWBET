//recell / !brentisthehulk2020!

import React, {Component} from 'react';
import {FusePageSimple, FuseAnimate} from '@fuse';
import { Link } from 'react-router-dom';
import { withStyles, Button, GridList, GridListTile, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as authActions from 'app/auth/store/actions';
import classNames from 'classnames';
import {connect} from 'react-redux';
import api, {BASE_URL} from 'app/ApiConfig'
import _ from '@lodash';

const styles = theme => ({
    root: {
        background: 'black',
        '& .container': {
            padding: '0px 10px'
        },
        '& section': {
            '& .section-head': {
                '& .title-main': {
                    margin: '0',
                    fontSize: '16px',
                    color: '#9c9fa9',
                    flex: 8
                },
                display: 'flex',
                alignItems: 'center',
                marginTop: '30px',
                marginBottom: '15px'
            }
        }
    },
    moreButton: {
        color: 'white', 
        background: 'linear-gradient(219deg, #867631 0%, #d8c884 73%, #d8c884d1 110%)'
    },
    coverimage: {
        boxShadow: 'rgba(252, 255, 255, 0.16) 0px 0px 9px 5px',
        borderRadius: '10px',
        width: '140px',
        height: '100px'
    },
    banner: {
		'& .banner-content': {
			maxWidth: '60%',
			padding: '50px 15px'
        },
        '& h2': {
            marginTop: 0,
            fontSize: '19px',
            fontWeight: 700,
            color: '#13287e'
        },
		background: 'url(assets/images/img/banner.png) center no-repeat',
		backgroundSize: 'cover',
		marginTop: '20px'
	}
});



class Test extends Component {

    state = {
        continueWatch: [],
        recommended: [],
        recent: [],
        all: [],
        quiz: false,
        neverShow: false
    };
    
    componentDidMount()
    {
        /*
        if (!this.props.user.quiz.length) {
            this.setState({quiz: true})
        }
        this.fetchCourses(this.props.user.userId);
        */
    }

    fetchCourses = async (userId) => {
        const params = {
            userId: userId,
            mode: 'home'
        }
        api.get('/courses/get', {
            params
        }).then(res => {
            this.setState({
                continueWatch: res.data.data.continue,
                recommended: res.data.data.recommended,
                recent: res.data.data.recent,
                all: res.data.data.all
            })
        });
    }

    confirmQuiz = (val) => {
        if (val) {
            this.props.history.push({pathname: '/quiz'})
        } else {
            this.setState({quiz: false})
        }
        if (this.state.neverShow) {
            this.props.updateUserShortcuts({
                quiz: -1
            })
        }
    }
	
    render()
    {
        const {classes} = this.props;
        const { continueWatch, recommended, recent, all } = this.state;

        return (
            <div className={classNames(classes.root, 'w-full')}>
                
                <section className="container">
                    <div className={classNames(classes.banner, 'rounded-16')}>
                        <div className="banner-content">
                            <h2 className="banner-head">Best Asset Protection Platform</h2>
                        </div>
                    </div>
                </section>

                {continueWatch && (
                    <section className="container">
                        <div className="section-head">
                            <h4 className="title-main">Continue Watching</h4>
                            <Link to="/courses/list/continue-watch">
                                <Button className={classes.moreButton}>more</Button>
                            </Link>
                        </div>
                        <div className="c-wrapper h-full">
                            <GridList className="" spacing={8} cols={2} children="">
                                {
                                    continueWatch.map((val, idx) => {
                                        return (
                                            <GridListTile
                                                classes={{
                                                    root: "w-1 sm:w-1/2 md:w-1/2",
                                                    tile: "rounded-8 text-center"
                                                }}
                                                key={idx}
                                            >
                                                <Link to={"/courses/detail/"+val._id}>
                                                    <div className="provide-item s1-bg" style={{padding: '20px 10px', background: val.background}}>
                                                        <img className={classes.coverimage} src={val.coverimage === '' ? `assets/images/img/icons/s1.png` : `${BASE_URL}/uploads/${val._id}/${val.coverimage}?${Date.now()}`} alt="" style={{maxWidth: '140px', marginBottom: '10px'}}/>
                                                        <h4 className="b-text" style={{color: 'white'}}>{val.name}</h4>
                                                    </div>
                                                </Link>
                                            </GridListTile>
                                        )
                                    })
                                }                                
                            </GridList>
                        </div>
                    </section>

                )}

                {recommended && (
                    <section className="container">
                        <div className="section-head">
                            <h4 className="title-main">Recommended</h4>
                            <Link to="/courses/list/recommended">
                                <Button className={classes.moreButton}>more</Button>
                            </Link>
                        </div>
                        <div className="c-wrapper h-full">
                            <GridList className="" spacing={8} cols={2} children="">
                                {
                                    recommended.map((val, idx) => {
                                        return (
                                            <GridListTile
                                                classes={{
                                                    root: "w-1 sm:w-1/2 md:w-1/2",
                                                    tile: "rounded-8 text-center"
                                                }}
                                                key={idx}
                                            >
                                                <Link to={"/courses/detail/"+val._id}>
                                                    <div className="provide-item s1-bg" style={{padding: '20px 10px', background: val.background}}>
                                                        <img className={classes.coverimage} src={val.coverimage === '' ? `assets/images/img/icons/s1.png` : `${BASE_URL}/uploads/${val._id}/${val.coverimage}?${Date.now()}`} alt="" style={{maxWidth: '140px', marginBottom: '10px'}}/>
                                                        <h4 className="b-text" style={{color: 'white'}}>{val.name}</h4>
                                                    </div>
                                                </Link>
                                            </GridListTile>
                                        )
                                    })
                                }                                
                            </GridList>
                        </div>
                    </section>

                )}

                { recent && (
                    <section className="container">
                        <div className="section-head">
                            <h4 className="title-main">Recently Uploaded</h4>
                            <Link to="/courses/list/recent-uploaded">
                                <Button className={classes.moreButton}>more</Button>
                            </Link>
                        </div>
                        <div className="c-wrapper">
                            <GridList className="" spacing={8} cols={2} children="">
                                {
                                    recent.map((val, idx) => {
                                        return (
                                            <GridListTile
                                                classes={{
                                                    root: "w-1 sm:w-1/2 md:w-1/2",
                                                    tile: "rounded-8 text-center"
                                                }}
                                                style={{ display: 'block', width: '48%', background: '#000', float: 'left', border: '1px solid #000', borderRadius: '5px', margin: '2px'}}
                                                key={idx}
                                            >
                                                <Link to={"/courses/detail/"+val._id}>
                                                    <img className={classes.coverimage} src={val.coverimage === '' ? `assets/images/img/icons/s1.png` : `${BASE_URL}/uploads/${val._id}/${val.coverimage}?${Date.now()}`} alt="" style={{maxWidth: '140px', marginBottom: '10px'}}/>
                                                    <h2 className="product-title" style={{ color: 'white', display: 'block', margin: 0, padding: 0, fontSize: '14px', padding: '10px 10px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '700'}}>{val.name}</h2>
                                                </Link>
                                            </GridListTile>
                                        )
                                    })
                                }                                
                            </GridList>
                        </div>
                    </section>
                )}       

                { all && (
                    <section className="container">
                        <div className="section-head">
                            <h4 className="title-main">All courses</h4>
                            <Link to="/courses/list/all">
                                <Button className={classes.moreButton}>more</Button>
                            </Link>
                        </div>
                        <div className="c-wrapper">
                            <GridList className="" spacing={8} cols={2} children="">
                                {
                                    all.map((val, idx) => {
                                        return (
                                            <GridListTile
                                                classes={{
                                                    root: "w-1 sm:w-1/2 md:w-1/2",
                                                    tile: "rounded-8 text-center"
                                                }}
                                                style={{ display: 'block', width: '48%', background: '#000', float: 'left', border: '1px solid #000', borderRadius: '5px', margin: '2px'}}
                                                key={idx}
                                            >
                                                <Link to={"/courses/detail/"+val._id}>
                                                    <img className={classes.coverimage} src={val.coverimage === '' ? `assets/images/img/icons/s1.png` : `${BASE_URL}/uploads/${val._id}/${val.coverimage}?${Date.now()}`} alt="" style={{maxWidth: '140px', marginBottom: '10px'}}/>
                                                    <h2 className="product-title" style={{ color: 'white', display: 'block', margin: 0, padding: 0, fontSize: '14px', padding: '10px 10px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '700'}}>{val.name}</h2>
                                                </Link>
                                            </GridListTile>
                                        )
                                    })
                                }                                
                            </GridList>
                        </div>
                    </section>
                )}   


                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    maxWidth="xs"
                    aria-labelledby="confirmation-dialog-title"
                    open={this.state.quiz}
                    >
                    <DialogContent>
                        <p>Welcome to Protect Wealth, start by taking this quiz for us to recommend the most suitable courses to you.</p>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus color="primary" onClick={() => this.confirmQuiz(true)}>
                        Start
                        </Button>
                    </DialogActions>
                </Dialog>           
                

            </div>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        updateUserShortcuts: authActions.updateUserShortcuts
    }, dispatch);
}
function mapStateToProps({auth})
{
    return {
        user            : auth.user
    }
}
export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Test));