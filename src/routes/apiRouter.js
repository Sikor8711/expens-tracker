import { Router } from "npm:express@5.0.1";
import { getUserTransaction } from "../controllers/UserController.js";

const router = Router();

router.post("/api/transactions", getUserTransaction);

router.get("/api/test", (req, res) => {
	res.send("hej");
});

export default router;
