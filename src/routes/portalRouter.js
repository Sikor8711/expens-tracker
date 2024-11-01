import { Router } from "npm:express@5.0.1";
import { portal_index } from "../controllers/PortalController.js";

const router = Router();

router.get("/portal", portal_index);

export default router;
