import  express  from "express";
import ColaboradorController from "../controllers/ColaboradorController.js";
import checkToken from "../middleware/autentification.js";



const router = express.Router();
router.use(checkToken)

router
.get('/colaborador', ColaboradorController.listColaborador)
.get('/colaborador/:id', ColaboradorController.listColaboradorId)
.post('/auth/colaborador', ColaboradorController.registerColaborador)
.put('/colaborador/:id', ColaboradorController.updateColaborador)
.delete('/colaborador/:id', ColaboradorController.deleteColaborador)

export default router;
