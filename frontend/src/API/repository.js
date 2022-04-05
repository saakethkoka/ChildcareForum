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
					resolve({ status: "test"});
				})
				.catch(err => {
					error(err);
					resolve({ status: false });
				});
		});
	}


	register(account) {
        return new Promise((resolve, reject) => {
            axios.post(hostname + '/newuser', { ...account })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    resolve(undefined);
                });
        });
    }

}

export default Repository;