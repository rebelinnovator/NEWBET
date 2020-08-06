import React, {Component} from 'react';
import {MuiThemeProvider, Hidden, Icon, IconButton, Input, Paper, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';

class UsersHeader extends Component {

    render()
    {
        const {setSearchText, searchText, pageLayout, mainTheme} = this.props;

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

                <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">

                    <MuiThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Paper className="flex p-4 items-center w-full max-w-512 px-8 py-4" elevation={1}>

                                <Icon className="mr-8" color="action">search</Icon>

                                <Input
                                    placeholder="Search for anything"
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    value={searchText}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={setSearchText}
                                />
                            </Paper>
                        </FuseAnimate>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSearchText: Actions.setSearchText
    }, dispatch);
}

function mapStateToProps({usersApp, fuse})
{
    return {
        searchText: usersApp.users.searchText,
        mainTheme : fuse.settings.mainTheme
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersHeader);
