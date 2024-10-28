import { Router } from "npm:express@5.0.1";

const router = Router();

router.get("/api", (req, res) => {
	res.send("hej hej");
});

router.get("/api/test", (req, res) => {
	res.send("hej");
});
export default router;
