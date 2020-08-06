import React, {Component} from 'react';
import {withStyles, Button, Fab, Icon, Tab, Tabs, Select, OutlinedInput} from '@material-ui/core';
import {TextFieldFormsy, FusePageSimple, FuseAnimate, FuseChipSelect} from '@fuse';
import UploadPreview from 'material-ui-upload/UploadPreview';
import {bindActionCreators} from 'redux';
import Formsy from 'formsy-react';
import {withRouter,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import ReactTable from 'react-table';
import _ from '@lodash';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import ContentDialog from './ContentDialog';
import api, {BASE_URL} from 'app/ApiConfig'

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class CourseContents extends Component {

    state = {
        tabValue : 0,
        changed : false,
        coverimage: '',
        quizs: [],
        selected: []
    }
    form = React.createRef();

    componentWillMount() {
        const {courseId} = this.props.match.params;
        if (courseId === 'new') {
            this.props.newCourse();
        } else {
            this.props.getCourse(this.props.match.params);
        }

        this.fetchQuiz();
    }

    componentWillReceiveProps(p) {
        this.setState({
            selected: p.course.quizs
        })
    }

    fetchQuiz = () => {
        api.get('/courses/quizs', {            
        }).then(res => {
            this.setState({
                quizs: res.data.data
            })
        });
    }

    onSubmit = (model) => {
        this.props.saveCourse({
            ...this.props.course,
            name: model.name,
            description: model.description,
            quizs: this.state.selected
        })
    }

    removeCourse = () => {
        if (!window.confirm("Are you sure to delete this course?"))  {
            return;
        }
        api.post("/courses/remove", {
            courseId: this.props.course._id
        }).then(res => {
            if (!res.data.success) {
                return;
            }
            this.props.history.push({
                pathname: '/manage/courses'
            })
        });
    }

    handleChangeTab = (event, value) => {
        if (value === 1 && this.props.course._id === '') {
            return;
        }
        if (value === 1 && this.state.changed) {
            this.form.submit();
        }
        if (value === 0) {
            this.setState({ changed: false })
        }
		this.setState({ tabValue: value});
    }

    handleFileSelect = (e) => {
        let file = e.target.files[0];
        const formData = new FormData();

        if (!file) {
            return;
        }

        formData.append('file',file)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            params: {
                mode: 'coverimage',
                courseId: this.props.course._id
            }
        }
        return api.post("/upload", formData, config)
            .then(res => {
                this.props.setCoverImage({
                    file: res.data.file,
                    courseId: this.props.course._id
                })
            });
    }

    quizChange = (value) => {
        let sel = []
        value.map(v => {
            sel.push(v.value)
        })
        this.setState({selected: sel})
    }

    render()
    {
        const {tabValue} = this.state
        const {classes, course} = this.props;

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    contentToolbar={
                        <Tabs
                            value={tabValue}
                            onChange={this.handleChangeTab}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{ root: 'w-full h-64' }}
                        >
                            <Tab className="h-64 normal-case" label="Basic Info" />
                            <Tab className="h-64 normal-case" label="Contents" />
                        </Tabs>
                    }
                    content={ course && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 && (
                                <div style={{textAlign: 'center'}}>
                                    <img src={course.coverimage === '' ? 'assets/images/img/avatar-bg.jpg' : `${BASE_URL}/uploads/${course._id}/${course.coverimage}?${Date.now()}`} alt=""/>
                                    <input type='file' id='pic_url' name='pic_url' style={{display: 'none'}}  onChange={this.handleFileSelect}/>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="w-full mx-auto mt-16 mb-16 normal-case"
                                        aria-label="UPLOAD PICTURE"
                                        value="legacy"
                                        onClick={() => document.getElementById('pic_url').click() }
                                        disabled={course._id === ''}
                                    >
                                        UPLOAD PICTURE
                                    </Button>

                                    <Formsy
                                        onValidSubmit={this.onSubmit}
                                        ref={(form) => this.form = form}
                                    >                                    
                                        <TextFieldFormsy
                                            className="mt-8 mb-16"
                                            //error={form.name === ''}
                                            required
                                            label="Name"
                                            autoFocus
                                            id="name"
                                            name="name"
                                            value={course.name}
                                            onChange={() => this.setState({changed: true})}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <TextFieldFormsy
                                            className="mt-8 mb-16"
                                            id="description"
                                            name="description"
                                            label="Description"
                                            type="text"
                                            value={course.description}
                                            onChange={() => this.setState({changed: true})}
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            fullWidth
                                        />

                                        <FuseChipSelect
                                            className=""
                                            value={this.state.selected.map(id => {
                                                const label = _.find(this.state.quizs, { _id: id });
                                                return (
                                                    label && {
                                                        value: id,
                                                        label: label.title,
                                                        class: ''
                                                    }
                                                );
                                            })}
                                            onChange={this.quizChange}
                                            placeholder="Select quiz"
                                            isMulti
                                            textFieldProps={{
                                                variant: 'outlined'
                                            }}
                                            options={this.state.quizs.map(quiz => ({
                                                value: quiz._id,
                                                label: quiz.title
                                            }))}        
                                        />

                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className="w-full mx-auto mt-16 normal-case"
                                            aria-label="SAVE"
                                            value="legacy"
                                        >
                                            Save
                                        </Button>

                                        {course._id && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className="w-full mx-auto mt-16 normal-case"
                                                aria-label="REMOVE"
                                                value="legacy"
                                                onClick={this.removeCourse}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </Formsy>
                                </div>
                            )}
                            {tabValue === 1 && (
                                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                                    <ReactTable
                                        className="-striped -highlight border-0"
                                        getTrProps={(state, rowInfo, column) => {
                                            return {
                                                className: "cursor-pointer",
                                                onClick  : (e, handleOriginal) => {
                                                    if ( rowInfo )
                                                    {
                                                        this.props.openEditContentDialog(rowInfo.original);
                                                    }
                                                }
                                            }
                                        }}
                                        data={course.contents}
                                        columns={[
                                            {
                                                Header    : "Name",
                                                accessor  : "name",
                                                filterable: true,
                                                className : "font-bold"
                                            },
                                            {
                                                Header    : "File",
                                                accessor  : "file",
                                                filterable: true,
                                                className : "font-bold"
                                            },
                                        ]}
                                        defaultPageSize={10}
                                        noDataText="No contents found"
                                    />
                                </FuseAnimate>
                            )}
                        </div>
                    )}
                    innerScroll
                />

                {tabValue === 1 && (
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Fab
                            color="primary"
                            aria-label="add"
                            className={classes.addButton}
                            onClick={this.props.openNewContentDialog}
                        >
                            <Icon>add</Icon>
                        </Fab>
                    </FuseAnimate>
                )}
                
                <ContentDialog />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        newCourse: Actions.newCourse,
        getCourse: Actions.getCourse,
        saveCourse: Actions.saveCourse,
        setCoverImage: Actions.setCoverImage,
        openNewContentDialog: Actions.openNewContentDialog,
        openEditContentDialog: Actions.openEditContentDialog
    }, dispatch);
}

function mapStateToProps({coursesApp})
{
    return {
        course: coursesApp.contents.data
    }
}

export default withReducer('coursesApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseContents))));
