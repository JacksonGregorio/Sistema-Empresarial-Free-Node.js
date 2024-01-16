import  express  from "express";
import CertificadoController from "../controllers/CertificadoController.js";
import checkToken from "../middleware/autentification.js";

const router = express.Router();
router.use(checkToken)

router
.get("/certificado", CertificadoController.listCertificado)
.get("/certificado/:id", CertificadoController.listCertificadoId)
.get("/certificadoGet/:CNPJreq", CertificadoController.listCertificadoCNPJ)
.get("/certificadoGetExpired/:CNPJreq", CertificadoController.listCertificadoCNPJexpired)
.post("/certificado", CertificadoController.registerCertificado)
.put("/certificado/:id", CertificadoController.updateCertificado)
.delete("/certificado/:id", CertificadoController.deleteCertificado)



export default router;