/**@typedef {import("../types.d.ts").User } User*/
/**@typedef {import("../types.d.ts").Login } Login*/
import { compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { checkUser } from "./UserModel.js";

/**@function loginUser @param {string} email @param {string} password @returns {Promise<User | null>}*/
export async function loginUser(email, password) {
	/**@type {User | null}*/
	const user = await checkUser(email);
	if (user) {
		if (await compare(password, user.password)) {
			return user;
		} else {
			return null;
		}
	} else {
		return null;
	}
}
