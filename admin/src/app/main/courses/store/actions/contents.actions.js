import {FuseUtils} from '@fuse';
import * as Actions from 'app/store/actions';
import api from 'app/ApiConfig.js'
import history from 'history.js';

export const GET_COURSE = '[COURSES APP] GET COURSE';
export const SAVE_COURSE = '[COURSES APP] SAVE COURSE';
export const SET_COVER_IMAGE = '[COURSES APP] SET COVER IMAGE';
export const OPEN_NEW_CONTENT_DIALOG = '[COURSES APP] OPEN NEW CONTENT DIALOG';
export const CLOSE_NEW_CONTENT_DIALOG = '[COURSES APP] CLOSE NEW CONTENT DIALOG';
export const OPEN_EDIT_CONTENT_DIALOG = '[COURSES APP] OPEN EDIT CONTENT DIALOG';
export const CLOSE_EDIT_CONTENT_DIALOG = '[COURSES APP] CLOSE EDIT CONTENT DIALOG';
export const SAVE_CONTENT = '[COURSES APP] SAVE CONTENT';
export const REMOVE_CONTENT = '[COURSES APP] REMOVE CONTENT';


export function getCourse(params) {
	const request = api.get('/courses/contents', { params });
	
	return dispatch =>
		request.then(response =>{
			if (!response.data.success) {
				dispatch(Actions.showMessage({ message: 'Get Course Failed' }));
				history.push({
					pathname: '/manage/courses'
				})
			}
			dispatch({
				type: GET_COURSE,
				payload: response.data.data,
				params
			})
		});
}

export function saveCourse(data) {
	const request = api.post('/courses/contents/save', data);

	return dispatch =>
		request.then(response => {
			dispatch(Actions.showMessage({ message: 'Course Saved' }));

			return dispatch({
				type: SAVE_COURSE,
				payload: response.data,
				params: { courseId: response.data._id }
			});
		});
}

export function setCoverImage(data) {
	const request = api.post('/courses/setimage', data);

	return dispatch =>
		request.then(response => {
			return dispatch(getCourse({ courseId: data.courseId }))
		});
}

export function newCourse() {
	const data = {
		_id: '',
		name: 'New Course',
		description: '',
        slug: 'new-course',
        coverimage: '',
		contents: [],
		quizs: []
	};

	return {
		type: GET_COURSE,
		payload: data
	};
}


export function openNewContentDialog()
{
    return {
        type: OPEN_NEW_CONTENT_DIALOG
    }
}

export function closeNewContentDialog()
{
    return {
        type: CLOSE_NEW_CONTENT_DIALOG
    }
}

export function openEditContentDialog(data)
{
    return {
        type: OPEN_EDIT_CONTENT_DIALOG,
        data
    }
}

export function closeEditContentDialog()
{
    return {
        type: CLOSE_EDIT_CONTENT_DIALOG
    }
}

export function saveContent(data) {

	return (dispatch, getState) => {
		const {contents} = getState().coursesApp;
		api.post('/courses/contents/add', {
			...data,
			courseId: contents.data._id	
		}).then(response => {
			dispatch(Actions.showMessage({ message: 'Content Saved' }));

			Promise.all([
                dispatch({
                    type: SAVE_CONTENT
                }),
                dispatch({
					type: contents.contentDialog.type === 'new' ? 
						CLOSE_NEW_CONTENT_DIALOG : CLOSE_EDIT_CONTENT_DIALOG
                })
            ]).then(() => dispatch(getCourse(contents.params)))
		})
	};
}

export function removeContent(data) {
	return (dispatch, getState) => {
		const {contents} = getState().coursesApp;
		api.post('/courses/contents/remove', {
			...data,
			courseId: contents.data._id	
		}).then(response => {
			dispatch(Actions.showMessage({ message: 'Content Removed' }));

			Promise.all([
                dispatch({
                    type: REMOVE_CONTENT
                }),
                dispatch({
					type: contents.contentDialog.type === 'new' ? 
						CLOSE_NEW_CONTENT_DIALOG : CLOSE_EDIT_CONTENT_DIALOG
                })
            ]).then(() => dispatch(getCourse(contents.params)))
		})
	};
}