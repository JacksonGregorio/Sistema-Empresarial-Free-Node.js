import mongoose from "mongoose";

const ColaboradorSchema = new mongoose.Schema({
    
    User:{type:String, required:true},
    Password:{type:String, required:true},
    Email_Colaborador:{type:String, required:true},
    parceiro:{type: mongoose.Schema.Types.ObjectId, ref:'Parceiro', required:true},
    Type:{type:String, required:true},
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
});

ColaboradorSchema.set('toJSON', {
    transform: function (doc, ret) {
      delete ret.Password;
    }
});

const colaborador = mongoose.model("Colaborador", ColaboradorSchema);

export default colaborador;