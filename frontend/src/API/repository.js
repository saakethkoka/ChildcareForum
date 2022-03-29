import { hostname } from './repositoryConfig';

import axios from 'axios';

function error(err) {
	console.error(err);
	alert("Error:\n" + err);
}

export class Repository {

	login(usernameInput, passwordInput) {
		return new Promise((resolve, reject) => {
			axios.get(hostname + '/logincheck', { 
				params: {
					username: usernameInput,
					password: passwordInput
				}
			})
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