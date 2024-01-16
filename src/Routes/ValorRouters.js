import  express  from "express";
import CertificadoValorController from "../controllers/ValorController.js";
import checkToken from "../middleware/autentification.js";

const router = express.Router();
router.use(checkToken)

router
.get("/valor", CertificadoValorController.listCertificadoValor)
.get("/valor/:id", CertificadoValorController.listCertificadoValorId)
.post("/valor", CertificadoValorController.registerCertificadoValor)
.put("/valor/:id", CertificadoValorController.updateCertificadoValor)
.delete("/valor/:id", CertificadoValorController.deleteCertificadoValor)

export default router;