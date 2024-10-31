/**@typedef {import("../types.d.ts").User } User*/
import jwt from "npm:jsonwebtoken@9.0.2";

const secret = Deno.env.get("JWT_SECRET");
/**@function createJwt @param {User} payload @returns {Promise<string>} token*/
export async function createJwt(payload) {
	const token = await jwt.sign(payload, secret, {
		algorithm: "HS512",
		expiresIn: "1h",
	});
	return token;
}
