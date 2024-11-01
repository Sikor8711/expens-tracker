import { Router } from "npm:express@5.0.1";
import {
	auth_index,
	auth_login,
	auth_signin,
} from "../controllers/AuthController.js";

const router = Router();

router.get("/auth", auth_index);
router.post("/api/auth/login", auth_login);
router.post("/api/auth/signin", auth_signin);

export default router;
