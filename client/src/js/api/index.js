import axios from 'axios';

import { apiPrefix } from '../../../../etc/config.json';

export default {
	listNotes() {
		return axios.get(`${apiPrefix}/notes`);
	},
	createNote(data) {
		return axios.post(`${apiPrefix}/notes`, data);
	},
	updateNote(data, id) {
		return axios.post(`${apiPrefix}/notes/update`, data)
	},
	deleteNote(idNote) {
		return axios.delete(`${apiPrefix}/notes/${idNote}`);
	}
}
