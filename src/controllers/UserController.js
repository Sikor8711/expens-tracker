/**@typedef {import("../types.d.ts").Login } Login*/
/**@typedef {import("../types.d.ts").User } User*/
import asyncHandler from "npm:express-async-handler@1.2.0";
import { getTransaction } from "../models/TransactionModel.js";

export const getUserTransaction = asyncHandler(async (req, res) => {
	console.log(req.auth.id);
	if (req.auth.id) {
		const data = await getTransaction(req.auth.id);
		res.json(data);
	}
});
