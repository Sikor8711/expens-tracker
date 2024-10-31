/**@typedef {import("../types.d.ts").Login } Login*/
/**@typedef {import("../types.d.ts").User } User*/
import asyncHandler from "npm:express-async-handler@1.2.0";
import { expressjwt as jwt2 } from "npm:express-jwt@8.4.1";
const secret = Deno.env.get("JWT_SECRET");

import * as path from "https://deno.land/std@0.188.0/path/mod.ts";
import { loginUser } from "../models/AuthModel.js";
import { addOneUser } from "../models/UserModel.js";
import { createJwt } from "../models/JwtModel.js";
/**
 * @typedef {Object} TokenExpiredError
 * @property {string} name - The name of the error, typically "TokenExpiredError".
 * @property {string} message - The error message.
 * @property {Date} expiredAt - The date and time when the token expired.
 */

/**
 * @typedef {Object} UnauthorizedError
 * @property {string} code - The error code, e.g., "invalid_token".
 * @property {number} status - The HTTP status code, typically 401.
 * @property {string} name - The name of the error, typically "UnauthorizedError".
 * @property {TokenExpiredError} inner - The inner error with details of token expiration.
 */

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

export const auth_index = asyncHandler((req, res) => {
	res.render(path.join(__dirname, "../views/auth", "auth"));
});

export const auth_login = asyncHandler(async (req, res, next) => {
	const { email, password } = await req.body;
	/**@type {User | null}*/
	const data = await loginUser(email, password);

	if (data) {
		console.log("login success");
		const { password, createdAt, ...user } = data;
		const token = await createJwt(user);
		res.cookie("token", token, {
			httpOnly: true,
			secure: false,
			maxAge: 24 * 60 * 60 * 1000,
		}).redirect("/");
		next();
	} else {
		console.log("login faild");
		res.redirect("/auth/notlogin");
		next();
	}
});

export const auth_signin = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, email, password } = await req.body;
	const sendUserData = await addOneUser(firstName, email, password, lastName);
	console.log(sendUserData);
	res.redirect("/");
	next();
});

export const jwtAuth = jwt2({
	secret: `${secret}`,
	algorithms: ["HS512"],
	getToken: (req) => {
		if (req.cookies["token"]) {
			return req.cookies["token"];
		} else {
			return null;
		}
	},
	requestProperty: "auth",
	/**@param {UnauthorizedError} err*/
	onExpired: async (req, err) => {
		/**@type {number}*/
		const dateNow = new Date().getTime();
		/**@type {number}*/
		const expireAt = err.inner.expiredAt.getTime();

		if (dateNow - expireAt < 5000) {
			return;
		}
		throw err;
	},
}).unless({
	path: ["/", "/auth", "/api/auth/login", "/api/auth/signin"],
});

export const noTokenError = (err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.redirect("/auth");
		next(err);
	} else {
		next(err);
	}
};
