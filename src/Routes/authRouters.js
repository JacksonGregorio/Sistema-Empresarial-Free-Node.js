import  express  from "express";
import AuthController from "../controllers/authController.js";
import ValidityService from "../services/AttValidityService.js";
import PassWordService from "../services/AttPasswordService.js";

const router = express.Router();

router
.post('/auth/login/colaborador', AuthController.login)
.get('/UpadateVality', ValidityService.updateVencimentos)
.post('/UpadatePassword', PassWordService.forgotPassword)
.post('/ResetPassword', PassWordService.resetPassword)



export default router