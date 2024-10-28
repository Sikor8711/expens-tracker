/**@typedef {import("../types.d.ts").Login } Login*/
import asyncHandler from "npm:express-async-handler@1.2.0";

import * as path from "https://deno.land/std@0.188.0/path/mod.ts";
import { addOneUser, loginUser } from "../models/authModel.js";
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

export const auth_index = asyncHandler(async (req, res, next) => {
	res.render(path.join(__dirname, "../views/auth", "auth"));
});

export const auth_login = asyncHandler(async (req, res, next) => {
	const { email, password } = await req.body;
	const data = await loginUser(email, password);

	if (data.login === true) {
		res.redirect("/auth");
	} else if (data.login === false) {
		res.redirect("/auth/notlogin");
	}
});

export const auth_signin = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, email, password } = await req.body;
	const sendUserData = await addOneUser(firstName, email, password, lastName);
	console.log(sendUserData);
	res.redirect("/");
});
