import { Router } from "npm:express@5.0.1";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

const router = Router();

router.get("/", (req, res) => {
    // res.render(path.join(__dirname, "src/views", "index"));
    res.render(path.join(__dirname, "../views", "index"));
});

export default router;
