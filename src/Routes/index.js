import  express  from "express";
import contato from "./ContatoRoutes.js";
import certificados from "./CertificadoRoutes.js";
import colaborador from "./ColaboradorRoutes.js";
import parceiro from "./ParceiroRoutes.js";
import empresa from "./EmpresaRoutes.js";
import certValor from "./ValorRouters.js";
import responsavel from "./ResponsavelRoutes.js";
import auth from "./authRouters.js";


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo:"node"})
    })

    app.use(
        express.json(),
        auth,
        certificados,
        colaborador,
        contato,
        parceiro,
        empresa,
        certValor,
        responsavel

    )
}

export default routes;