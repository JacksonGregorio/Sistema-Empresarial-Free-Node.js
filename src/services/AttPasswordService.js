import crypto from 'crypto';
import nodemailer from 'nodemailer';
import colaborador from "../models/Colaborador.js";
import bcrypt from "bcryptjs";

class PasswordService{

    static async forgotPassword(req, res) {
        const { Email_Colaborador } = req.body;
    
        try {
            const Colaborador = await colaborador.findOne({ Email_Colaborador });
    
            if (!Colaborador) {
                return res.status(404).json({ message: 'No user found with that email address' });
            }
    
            const token = crypto.randomBytes(20).toString('hex');
    
            Colaborador.resetPasswordToken = token;
            Colaborador.resetPasswordExpires = Date.now() + 3600000; 
    
            await Colaborador.save();
    
            res.status(200).json({ 
                message: 'Password reset token generated', 
                resetPasswordToken: Colaborador.resetPasswordToken, 
                resetPasswordExpires: Colaborador.resetPasswordExpires 
            });
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
    
    static async resetPassword(req, res) {
        const { token } = req.body;
        const { newPassword } = req.body;

        try {
            
            const Colaborador = await colaborador.findOne({resetPasswordToken:token});

            if (!Colaborador) {
                return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            Colaborador.Password = hashedPassword;
            Colaborador.resetPasswordToken = undefined;
            Colaborador.resetPasswordExpires = undefined;

            await Colaborador.save();

            res.status(200).json({ message: 'Password updated successfully'});
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
    
}

export default PasswordService;