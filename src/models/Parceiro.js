import mongoose from "mongoose";

const ParceiroSchema = new mongoose.Schema(
    {
    CNPJ:{type:String, required:true},
    CPF:{type:String, required:true},
    Name_Parceiro:{type:String, required:true},
    Email_Parceiro:{type:String, required:true},
    Razao_Social:{type:String, required:true},
    Tel_Parceiro:{type:String, required:true},
    Name_Convenio:{type: mongoose.Schema.Types.String, ref:'certValor', required:true}
});


const parceiro = mongoose.model("Parceiro", ParceiroSchema);

export default parceiro;