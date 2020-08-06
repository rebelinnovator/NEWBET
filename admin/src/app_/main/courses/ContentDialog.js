import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {FuseUtils} from '@fuse';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';
import api, {BASE_URL} from 'app/ApiConfig.js'

const newContentState = {
    _id      : FuseUtils.generateGUID(),
    name     : '',
    description: '',
    file     : '',
    pic      : ''
};

class ContentDialog extends Component {

    state = {...newContentState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.contentDialog.props.open && this.props.contentDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.contentDialog.type === 'edit' &&
                this.props.contentDialog.data &&
                !_.isEqual(this.props.contentDialog.data, prevState) )
            {
                this.setState({...this.props.contentDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.contentDialog.type === 'new' &&
                !_.isEqual(newContentState, prevState) )
            {
                newContentState._id = FuseUtils.generateGUID();
                this.setState({...newContentState});
            }
        }
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
                mode: 'section',
                courseId: this.props.course._id
            }
        }
        return api.post("/upload", formData, config)
            .then(res => {
                this.setState({
                    pic: res.data.file.filename
                })
            });
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.contentDialog.type === 'edit' ? this.props.closeEditContentDialog() : this.props.closeNewContentDialog();
    };

    canBeSubmitted()
    {
        /*const {user_name} = this.state;
        return (
            user_name.length > 0
        );*/
        return true;
    }

    uploadFile = (file) => {
        const formData = new FormData();
        const prev_file = this.state.file;
        formData.append('file',file)

        console.log(file);
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            params: {
                mode: 'video',
                courseId: this.props.course._id
            }
        }
        return new Promise((resolve, reject) => {
            api.post("/upload", formData, config)
                .then(res => {
                    this.setState({
                        file: res.data.file.filename,
                        prev_file: prev_file
                    })
                    resolve();
                })
                .catch(err => reject);
        })
    }

    submitData = async () => {
        let file = document.getElementById('file_url').files[0];
        if (file) {
            await this.uploadFile(file)
        }
        this.props.saveContent(this.state);
    }

    render()
    {
        const {contentDialog, addUser, updateUser, removeUser} = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...contentDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {contentDialog.type === 'new' ? 'New Content' : 'Edit Content'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-24"}} style={{textAlign: 'center'}}>
                    <img src={this.state.pic === '' ? 'assets/images/blank.png' : `${BASE_URL}/uploads/${this.props.course._id}/${this.state.pic}?${Date.now()}`} alt="" onClick={() => document.getElementById('pic_url').click()}/>
                    <br />                    
                    <br />
                    <input type='file' id='pic_url' name='pic_url' style={{display: 'none'}}  onChange={this.handleFileSelect}/>
                    <div className="flex">  
                        <TextField
                            className="mb-24"
                            label="Section Name"
                            autoFocus
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">  
                        <TextField
                            className="mt-8 mb-16"
                            id="description"
                            name="description"
                            label="Section Description"
                            type="text"
                            value={this.state.description}
                            onChange={this.handleChange}
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex" style={{textAlign: 'left'}}>
                        <Typography variant="subtitle1" color="inherit" className="min-w-160 pt-20">
                                File
                        </Typography>
                    </div>
                    <input type='file' id='file_url' name='file_url'/>
                </DialogContent>

                {contentDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.submitData}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.submitData}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                if (window.confirm('Are you sure to delete it?')) {
                                    this.props.removeContent(this.state);
                                }
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditContentDialog  : Actions.closeEditContentDialog,
        closeNewContentDialog   : Actions.closeNewContentDialog,
        saveContent             : Actions.saveContent,
        removeContent           : Actions.removeContent
    }, dispatch);
}

function mapStateToProps({coursesApp})
{
    return {
        contentDialog: coursesApp.contents.contentDialog,
        course: coursesApp.contents.data
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentDialog);
