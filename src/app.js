import  express  from "express";
import db from "./config/dbconnection.js";
import routes from "./Routes/index.js"

db.on("error", console.log.bind(console, 'Erro conexão'));

db.once("open", () => {
    console.log('Conexão feita corretamente')
});

const app= express();

app.use(express.json());

routes(app);

export default app;

