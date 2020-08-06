import api from 'app/ApiConfig.js'

export const GET_COURSES = '[COURSES APP] GET COURSES';
export const SET_COURSES_SEARCH_TEXT = '[COURSES APP] SET COURSES SEARCH TEXT';

export function getCourses() {
	const request = api.get('/courses/get', { params: {mode:'all'} });

	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_COURSES,
				payload: response.data.doc
			})
		);
}

export function setCoursesSearchText(event) {
	return {
		type: SET_COURSES_SEARCH_TEXT,
		searchText: event.target.value
	};
}
