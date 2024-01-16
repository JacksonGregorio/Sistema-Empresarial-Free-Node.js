import  express  from "express";
import ContatoController from "../controllers/ContatoController.js";
import checkToken from "../middleware/autentification.js";

const router = express.Router();
router.use(checkToken)

router
.get("/contato", ContatoController.listContato)
.get("/contato/:id", ContatoController.listContatoId)
.post("/contato", ContatoController.cadastraContato)
.put("/contato/:id", ContatoController.updateContato)
.delete("/contato/:id", ContatoController.deleteContato)

export default router;