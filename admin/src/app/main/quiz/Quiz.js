import React, {Component} from 'react';
import {FuseAnimate, FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import { withStyles, Button, Typography, LinearProgress } from '@material-ui/core';
import classNames from 'classnames';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import api, {BASE_URL} from 'app/ApiConfig'
import * as authActions from 'app/auth/store/actions';
import _ from '@lodash';

const styles = theme => ({
    root: {
        background: 'black'
    },
    title: {
		color: 'white'
	},
	detail: {
		color: '#ffffff8f !important'
	}
});


class Contact extends Component {

    state = {
        quizs: [],
        active: 0,
        score: [],
        done: false
    };

    form = React.createRef();
    skip = [1, 3, 8, 11, 14]
    //offset = [1, 2, 1, ]

    componentWillMount() {
        this.fetchQuiz();
    }

    fetchQuiz = () => {
        api.get('/courses/quizs', {            
        }).then(res => {
            this.setState({
                quizs: res.data.data,
                active: 0,
                score: []
            })
        });
    }

    answerQuiz = (val) => {
        let { score, active, quizs } = this.state;
        score[active] = val;

        if (active + 1 >= quizs.length) {
            this.setState({done: true});
        }

        console.log(active);
        console.log(val);

        if (this.skip.indexOf(active) !== -1 && val === 0) {
            score[active+1] = 0;
            active ++;
        }
        if (active == 4 && val !== 0) {
            score[active+1]=0;
            active ++;
        }
        this.setState({score: score, active: active+1})
    }

    finish = () => {
        this.props.updateUserShortcuts({
            quiz: this.state.score
        });
        this.props.history.push({
            pathname: '/home'
        })
    }
    
    render()
    {
        const {classes} = this.props;
        const { quizs, active } = this.state;

        if (!quizs.length) {
            return (
                <div>
                    <h1>AAA</h1>
                </div>
            )
        }

        return (
            <FusePageSimple
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
                content={                        
                    <div className="p-16 sm:p-24">

                        <LinearProgress
                            style={{height: '20px', borderRadius: '10px'}} 
                            variant="determinate"
                            value={ (active+1)/20*100 }
                            color="primary"
                        />

                        <h2 style={{color: 'white', marginTop: '20px'}}>{`Question ${active+1 >= 19 ? 19 : active+1}/`}<small>19</small></h2>
                        <hr />

                        <div className="container" style={{padding: '10px'}}>
                            { !this.state.done ? (
                                <div>
                                    <div className="student-name" style={{ background: 'rgba(0,0,0,.2)',borderRadius: '10px',padding: '40px 15px 20px', textAlign: 'center', position: 'relative', marginBottom: '20px', minHeight: '200px'}}>
                                        <h3 style={{marginBottom: '10px', color: '#fff', fontSize: '20px'}}>{quizs[active].question}</h3>
                                    </div>
                                    <div style={{position: 'absolute', bottom: (10-quizs[active].answer.length)*10, left: '20px', right: '20px'}}>
                                        { quizs[active].answer.map((answer)=> {
                                            return (
                                                <Button 
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className="w-full mx-auto mt-16 normal-case"
                                                    aria-label="UPDATE"
                                                    value="legacy"
                                                    style={{color: 'white',  background: 'linear-gradient(219deg, #867631 0%, #d8c884 73%, #d8c884d1 110%)'}}
                                                    onClick={() => this.answerQuiz(answer.correct)}
                                                >
                                                    {answer.text}
                                                </Button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-32">
                                    <div className="max-w-512 text-center">
                                        <FuseAnimate animation="transition.expandIn" delay={100}>
                                            <Typography variant="h3" className={classNames(classes.title, "font-medium mb-16")}>
                                                Finished!
                                            </Typography>
                                        </FuseAnimate>

                                        <FuseAnimate delay={500}>
                                            <Typography variant="h5" className={classNames(classes.detail, "mb-16")}>
                                                Thank you!
                                            </Typography>
                                        </FuseAnimate>

                                        <Link className={classNames(classes.detail, "font-medium")} onClick={this.finish}>
                                            Go back to home
                                        </Link>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                }
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({      
        updateUserShortcuts: authActions.updateUserShortcuts
    }, dispatch);
}

function mapStateToProps(props)
{
    return {    
    }
}
export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Contact));