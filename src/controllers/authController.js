import asyncHandler from "npm:express-async-handler@1.2.0";

import * as path from "https://deno.land/std@0.188.0/path/mod.ts";
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

export const auth_index = asyncHandler(async (req, res, next) => {
	res.render(path.join(__dirname, "../views/auth", "auth"));
});

export const auth_login = asyncHandler(async (req, res, next) => {
	res.render(path.join(__dirname, "../views/auth", "auth"));
});

export const auth_signin = asyncHandler(async (req, res, next) => {
	const { email } = await req.body;
	console.log("something");
	console.log(email);
	res.status(201).json({ message: "user created" });
	// res.render(path.join(__dirname, "../views/auth", "auth"));
});
