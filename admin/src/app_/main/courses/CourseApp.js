import React, {Component} from 'react';
import {withStyles, Fab, Icon, MuiThemeProvider, Input, Paper} from '@material-ui/core';
import {FuseUtils, FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import ReactTable from 'react-table';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class CourseApp extends Component {

    componentDidMount() {
        this.props.getCourses();
    }

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render()
    {
        const {classes, courses} = this.props;
        const data = this.getFilteredArray(courses, this.props.searchText);

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
                            <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
                                <MuiThemeProvider theme={this.props.mainTheme}>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Paper className="flex p-4 items-center w-full max-w-512 px-8 py-4" elevation={1}>

                                            <Icon className="mr-8" color="action">search</Icon>

                                            <Input
                                                placeholder="Search for anything"
                                                className="flex flex-1"
                                                disableUnderline
                                                fullWidth
                                                value={this.props.searchText}
                                                inputProps={{
                                                    'aria-label': 'Search'
                                                }}
                                                onChange={this.props.setSearchText}
                                            />
                                        </Paper>
                                    </FuseAnimate>
                                </MuiThemeProvider>
                            </div>
                        </div>
                    }
                    content={
                        <FuseAnimate animation="transition.slideUpIn" delay={300}>
                            <ReactTable
                                className="-striped -highlight border-0"
                                getTrProps={(state, rowInfo, column) => {
                                    return {
                                        className: "cursor-pointer",
                                        onClick  : (e, handleOriginal) => {
                                            if ( rowInfo )
                                            {
                                                this.props.history.push({
                                                    pathname: '/manage/courses/'+rowInfo.original._id
                                                });
                                            }
                                        }
                                    }
                                }}
                                data={data}
                                columns={[
                                    {
                                        Header    : "Name",
                                        accessor  : "name",
                                        filterable: true,
                                        className : "font-bold",
                                        width    : 160
                                    },
                                    {
                                        Header    : "Description",
                                        accessor  : "description",
                                        filterable: true,
                                        className : "font-bold",
                                        width     : 300
                                    },
                                ]}
                                defaultPageSize={10}
                                noDataText="No courses found"
                            />
                        </FuseAnimate>
                    }
                    innerScroll
                />
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        component={Link}
					    to="/manage/courses/new"
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSearchText: Actions.setCoursesSearchText,
        getCourses: Actions.getCourses
    }, dispatch);
}

function mapStateToProps({coursesApp, fuse})
{
    return {
        searchText        : coursesApp.courses.searchText,
        courses           : coursesApp.courses.entities,
        mainTheme         : fuse.settings.mainTheme
    }
}

export default withReducer('coursesApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseApp))));
