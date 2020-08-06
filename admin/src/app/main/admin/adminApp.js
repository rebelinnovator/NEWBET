import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import {connect} from 'react-redux';

class Admin extends Component {

    render(){
        return(
            <div>This is AdminXXX Panel</div>
        )
    }
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
     
    }, dispatch);
}

function mapStateToProps({coursesApp, fuse})
{
    return {
      mainTheme         :   fuse.settings.mainTheme
    }
}
export default withReducer('adminApp', reducer)(Admin)