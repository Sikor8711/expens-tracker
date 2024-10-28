/**@typedef {import("../types.d.ts").User } User*/
/**@typedef {import("../types.d.ts").Login } Login*/
import { hash, genSalt } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import pgPromise from "npm:pg-promise";
import db from "../../db.js";
const PQ = pgPromise.ParameterizedQuery;

/**@function checkUser
 * @param {string} email
 * @returns {Promise<User | null>} */
export async function checkUser(email) {
	const data = new PQ({
		text: "SELECT * FROM users WHERE email = $1",
		values: [`${email}`],
	});
	return await db.oneOrNone(data);
}

/**@function addOneUser
 * @param {string} firstName
 * @param {string} email
 * @param {string} password
 * @param {string} [lastName = ""]
 * @returns {Promise<object>} */
export async function addOneUser(firstName, email, password, lastName) {
	/**@type {User | null}*/
	const userExist = await checkUser(email);
	if (userExist) {
		console.log(userExist);
		return { message: "User already exists" };
	} else {
		const hashedPssw = await hash(password, await genSalt(10));
		const data = new PQ({
			text: "INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4)",
			values: [firstName, lastName, email, hashedPssw],
		});
		return await db
			.none(data)
			.then(() => {
				return { userAdded: true };
			})
			.catch((error) => {
				return { userAdded: false, error };
			});
	}
}
