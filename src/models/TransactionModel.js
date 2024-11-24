/**@typedef {import("../types.d.ts").User } User*/
/**@typedef {import("../types.d.ts").Category } Category*/
import pgPromise from "npm:pg-promise";
import db from "../../db.js";
const PQ = pgPromise.ParameterizedQuery;
/**@param {number} user_id*/
export async function getTransaction(user_id) {
	const data = new PQ({
		text: "SELECT * FROM transactions WHERE user_id = $1",
		values: [`${user_id}`],
	});
	return await db.many(data);
}
/**@param {string} name @param {number} amount@param {number} user_id @param {number} category_id  @param {Date} transaction_date  */
export async function addTransaction(
	name,
	amount,
	transaction_date,
	category_id,
	user_id
) {
	const data = new PQ({
		text: "INSERT INTO transactions(name, amount, transaction_date, category_id, user_id) VALUES($1, $2, $3, $4, $5)",
		values: [
			`${name}`,
			`${amount}`,
			`${transaction_date}`,
			`${category_id}`,
			`${user_id}`,
		],
	});
	return await db.none(data);
}
