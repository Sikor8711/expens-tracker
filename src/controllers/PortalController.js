/**@typedef {import("../types.d.ts").Login } Login*/
/**@typedef {import("../types.d.ts").User } User*/
import asyncHandler from "npm:express-async-handler@1.2.0";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

export const portal_index = asyncHandler((req, res) => {
	res.render(path.join(__dirname, "../views/portal", "portal"));
});
