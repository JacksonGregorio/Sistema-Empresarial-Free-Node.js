import  express  from "express";
import EmpresaController from "../controllers/EmpresaController.js";
import checkToken from "../middleware/autentification.js";

const router = express.Router();
router.use(checkToken)

router
.get("/empresa", EmpresaController.listEmpresa)
.get("/empresa/:id", EmpresaController.listEmpresaId)
.get("/empresaName", EmpresaController.listAllEmpresaNames)
.post("/empresa", EmpresaController.registerEmpresa)
.put("/empresa/:id", EmpresaController.updateEmpresa)
.delete("/empresa/:id", EmpresaController.deleteEmpresa)

export default router;