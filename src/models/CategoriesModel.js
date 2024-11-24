/**@typedef {import("../types.d.ts").User } User*/
/**@typedef {import("../types.d.ts").Login } Login*/
import pgPromise from "npm:pg-promise";
import db from "../../db.js";
const PQ = pgPromise.ParameterizedQuery;

export async function getCategories() {
	const data = new PQ({
		text: "SELECT * FROM categories",
	});
	return await db.many(data);
}
