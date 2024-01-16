import mongoose from "mongoose";

const EmpresaSchema = new mongoose.Schema(
    {
    CNPJ:{type: String, required:true},
    Email_Empresa:{type:String, required:true},
    Tel_Empresa:{type:Number, required:true},
    Name_Empresa:{type:String, required:true},
    Razao_Social:{type:String, required:true},
    ID_Parceiro:{type: mongoose.Schema.Types.ObjectId, ref:'Parceiro', required:true}
}
);

const empresa = mongoose.model("Empresa", EmpresaSchema);

export default empresa;