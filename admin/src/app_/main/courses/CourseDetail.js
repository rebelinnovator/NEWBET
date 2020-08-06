import React, {Component} from 'react';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import { withStyles, Button, GridList, GridListTile, LinearProgress, Icon } from '@material-ui/core';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import api, {BASE_URL} from 'app/ApiConfig'
import * as Actions from 'app/store/actions';

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
    title: {
        color: 'white'
    }
});

class CourseDetail extends Component
{
    state = {

    }

    async componentWillMount() {
        await this.fetchCourse( { courseId: this.props.match.params.id} );
        await this.fetchActivity();
    }
    fetchCourse = (params) => {
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
            this.setState(res.data.data)
        });
    }
    fetchActivity = () => {
        api.post('/activity/get/course', {
            courseId: this.props.match.params.id,
            userId: this.props.user.userId,
        }).then(async (res) => {
            let activities = []
            await res.data.doc.forEach((el) => {
                activities.push(el.contentId);
            })
            this.setState({ activities: activities });
        })
    }

    startWatching = () => {
        this.props.history.push({
            pathname: `/browse/${this.state._id}/${this.state.contents[this.state.activities.length]._id}`
        })
    }

    render() {
        const { classes } = this.props
        
        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300} style={{background: 'black'}}>
                <div className={classNames(classes.root, "w-full pt-16")}> 
                    {this.state._id && this.state.contents && this.state.activities && (
                        <div>
                            <section className="container">
                            <img src={this.state.coverimage === '' ? `assets/images/img/icons/s1.png` : `${BASE_URL}/uploads/${this.state._id}/${this.state.coverimage}?${Date.now()}`} alt="" style={{width:'100%', height: '230px'}}/>
                                <br />
                                <h1 style={{textAlign: 'center'}} className={classes.title}>{this.state.name}</h1>
                                <h4 style={{textAlign: 'center', color:'#4f4f67'}}>{`${this.state.contents.length} courses`}</h4>
                                <br />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="w-full mx-auto normal-case"
                                    value="legacy"
                                    style={{background: 'linear-gradient(219deg, #867631 0%, #d8c884 73%, #d8c884d1 110%)'}}
                                    onClick={this.startWatching}
                                >
                                    { this.state.activities.length ? 'CONTINUE WATCHING' : 'START'}
                                </Button>
                            </section>
                            <section className="container">
                                <div className="section-head">
                                    <h4 className="title-main">Course Content</h4>
                                </div>
                                <div className="c-wrapper">
                                    <GridList cols={0} cellHeight={80}>
                                    {
                                        this.state.contents.map((val, idx) => {
                                            return (
                                                <GridListTile
                                                    classes={{
                                                        root: "w-full h-full",
                                                        tile: "rounded-8 text-center w-full"
                                                    }}
                                                    style={{display: 'flex', background: '#000', padding: '10px', margin: '0 0 10px', border: '1px solid #000', position: 'relative', boxShadow: '0px 0px 9px 1px rgba(252, 255, 255, 0.16)'}}
                                                    key={idx}
                                                >
                                                    <Link to={`/browse/${this.state._id}/${val._id}`} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            <img src={val.pic ? `${BASE_URL}/uploads/${this.state._id}/${val.pic}` : "assets/images/img/product/con1.png"} alt="Course image" style={{width: '70px', height: '70px'}}/>
                                                            <div style={{marginLeft: '10px'}}>
                                                                <h4 style={{margin: 0, fontWeight: '600', fontSize: '13px', textAlign: 'left'}} className={classes.title}>{val.name}</h4>
                                                                <small style={{color: '#828caa', marginTop: '10px', display: 'inherit', textAlign: 'left'}}>
                                                                    <LinearProgress
                                                                        style={{width: '150px'}}
                                                                        variant="determinate"
                                                                        value={ 0 }
                                                                        color="primary"
                                                                    />
                                                                </small>
                                                            </div>
                                                        </div>

                                                        { this.state.activities.indexOf(val._id) !== -1 ? (
                                                            <div style={{ background: '#73ef9f', color: '#000', width: '40px', height: '40px', fontSize: '40px', display: 'inline-block', borderRadius: '50%', lineHeight: '40px', textAlign: 'center', fontSize: '20px', position: 'absolute', top: '50%', right: '20px',transform: 'translateY(-50%)'}}>
                                                                <Icon className="w-40 h-40" style={{fontSize: '40px'}}>check</Icon>
                                                            </div>
                                                        ) : (
                                                            <div style={{ background: '#000', color: '#fff', width: '40px', height: '40px', fontSize: '40px', display: 'inline-block', borderRadius: '50%', lineHeight: '40px', textAlign: 'center', fontSize: '20px', position: 'absolute', top: '50%', right: '20px',transform: 'translateY(-50%)'}}>
                                                                
                                                            </div>
                                                        ) }                                                        
                                                        
                                                    </Link>
                                                </GridListTile>
                                            )
                                        })
                                    }
                                    </GridList>
                                </div>
                            </section> 
                        </div>
                    )}
                </div>
            </FuseAnimate>
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
        user:       props.auth.user
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(CourseDetail));