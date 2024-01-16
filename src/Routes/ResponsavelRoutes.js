import  express  from "express";
import ResponsavelController from "../controllers/ResponsavelController.js";
import checkToken from "../middleware/autentification.js";

const router = express.Router();
router.use(checkToken)

router
.get("/responsavel", ResponsavelController.listResponsavel)
.get("/responsavel/:id", ResponsavelController.listresponsavelId)
.post("/responsavel", ResponsavelController.registerResponsavel)
.put("/responsavel/:id", ResponsavelController.updateResponsavel)
.delete("/responsavel/:id", ResponsavelController.deleteResponsavel)

export default router;