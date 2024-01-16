import  express  from "express";
import ParceiroController from "../controllers/ParceiroController.js";
import checkToken from "../middleware/autentification.js";

const router = express.Router();
router.use(checkToken)

router
.get("/parceiro", ParceiroController.listParceiro)
.get("/parceiro/busca", ParceiroController.listParceiroCertificado)
.get("/parceiro/:id", ParceiroController.listParceiroId)
.post("/parceiro", ParceiroController.registerParceiro)
.put("/parceiro/:id", ParceiroController.updateParceiro)
.delete("/parceiro/:id", ParceiroController.deleteParceiro)


export default router;