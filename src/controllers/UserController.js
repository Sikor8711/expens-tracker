/**@typedef {import("../types.d.ts").Login } Login*/
/**@typedef {import("../types.d.ts").User } User*/
import asyncHandler from "npm:express-async-handler@1.2.0";
import { addTransaction, getTransaction } from "../models/TransactionModel.js";

export const getUserTransaction = asyncHandler(async (req, res) => {
	console.log(req.auth.id);
	if (req.auth.id) {
		const data = await getTransaction(req.auth.id);
		res.json(data);
	}
});

export const addUserTransaction = asyncHandler(async (req, res) => {
	if (req.auth.id) {
		console.log(req.body);
		await addTransaction(
			req.body.name,
			req.body.value,
			req.body.date,
			req.body.category,
			req.auth.id
		);
		res.redirect("/portal");
	}
});
