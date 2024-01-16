import db from "../config/dbconnection";
import contato from "../models/Contato";
import nodemailer from "nodemailer";

const mongoUrl = db;
const dbName = Colobe; 
const collectionName = contato;

const nodemailer = require('nodemailer');
const MongoClient = require('mongodb').MongoClient;


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'secret',
        pass: 'secret'
    }
});

MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");

    let today = new Date();
    let todayStr = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');

    dbo.collection("users").find({birthday: todayStr}).toArray(function(err, result) {
        if (err) throw err;
        result.forEach(function(user) {
            let mailOptions = {
                from: 'secret',
                to: user.email,
                subject: 'Feliz Aniversário!',
                text: `Feliz Aniversário, ${user.name}!`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email enviado: ' + info.response);
                }
            });
        });
        db.close();
    });
});