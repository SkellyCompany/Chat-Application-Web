import { User } from 'src/domain/User';

export class LocalStorage {
	static usernameKey: string = "socketId";

	static getUser(): User | undefined {
		let userString = localStorage.getItem(this.usernameKey);
		if (userString != null) {
			return JSON.parse(userString);
		} else {
			return undefined
		}
	}

	static saveUser(user: User) {
		localStorage.setItem(this.usernameKey, JSON.stringify(user));
	}

	static cleanUser() {
		localStorage.removeItem(this.usernameKey);
	}
}
