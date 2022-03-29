import { hostname } from './repositoryConfig';

import axios from 'axios';

function error(err) {
	console.error(err);
	alert("Error:\n" + err);
}

export class Repository {

	login(username, password) {
		return new Promise((resolve, reject) => {
			axios.get(hostname + '/logincheck', { username, password })
				.then(response => {
					resolve({ status: response.data.status});
					console.log(response)
				})
				.catch(err => {
					error(err);
					resolve({ status: false });
				});
		});
	}

}

export default Repository;