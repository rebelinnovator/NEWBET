import React, {Component} from 'react';
import {connect} from 'react-redux';

import {FusePageSimple, DemoContent} from '@fuse';
import {withStyles, MuiThemeProvider} from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        backgroundColor: 'white'
    },
    headerButton: {
        fontSize: '30px'
    }
})
class Invite extends Component {

    componentDidMount(){
        console.log(this.props.match.who)
    }
    render(){
        const {classes} = this.props;

        return(
            <FusePageSimple 
                classes={{
                    content: classes.root,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div>HI</div>

                }
                content={
                    <div>Hello</div>
                }
                />
        )
    }
}
function mapStateToProps(store)
{
    console.log(store)
    return {
        user:store.auth.user
    }
}
export default (withStyles(styles, {withThemem: true})(connect(mapStateToProps)(Invite)));
