import { Router } from "npm:express@5.0.1";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
import asyncHandler from "npm:express-async-handler@1.2.0";

const router = Router();

router.get(
	"/portal",
	asyncHandler(async (req, res, next) => {
		res.render(path.join(__dirname, "../views/portal", "portal"), {
			data: req.auth.id,
		});
		next();
	})
);

export default router;