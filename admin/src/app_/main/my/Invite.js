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

    state = {
        invite_url:""
    }

    componentDidMount(){
        console.log(this.props.match.who)
    }
    generateUrl = () => {
        var siteUrl = "http://localhost:3000"
        this.setState({
            invite_url : siteUrl + "/register?invite_key=" + this.props.user.invite_code
        })
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
                    <div>{this.props.user.invite_code}</div>

                }
                content={
                    <div>
                        
                        <button onClick={this.generateUrl}>Generate</button>
                        <br/>
                        {this.state.invite_url}
                    </div>
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
