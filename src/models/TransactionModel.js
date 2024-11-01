/**@typedef {import("../types.d.ts").User } User*/
/**@typedef {import("../types.d.ts").Login } Login*/
import { hash, genSalt } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import pgPromise from "npm:pg-promise";
import db from "../../db.js";
const PQ = pgPromise.ParameterizedQuery;
/**@param {number} user_id*/
export const getTransaction = async (user_id) => {
	const data = new PQ({
		text: "SELECT * FROM transactions WHERE user_id = $1",
		values: [`${user_id}`],
	});
	return await db.many(data);
};
