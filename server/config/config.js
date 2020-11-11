//declaraciones globales

//==================
//  Puerto
//==================
process.env.PORT = process.env.PORT || 3000;

//==================
//  Entorno
//==================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//==================
//  DB
//==================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://flisboa:5cLE2jhiCXwP5Qvd@cluster0.mmv3z.mongodb.net/test'
}

process.env.URLDB = urlDB;