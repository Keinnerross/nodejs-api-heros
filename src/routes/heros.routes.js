import { Router } from "express";
import { getHeros, getOneHeros, pushHeros, patchHeros, deleteHeros,
} from "../controllers/heros.controllers.js";

const router = Router();

router.get("/heros", getHeros);
router.get("/heros/:id", getOneHeros);

router.post("/heros",pushHeros );
router.patch("/heros/:id", patchHeros);
router.delete("/heros/:id", deleteHeros);

export default router;
