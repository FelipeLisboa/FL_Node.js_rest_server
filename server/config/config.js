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
//  Fecha expiración del token
//==================
//60 seg
//60 minutos
//24 días
//30 días

process.env.CADUCIDAD_TOKEN = '48h';

//==================
//  Seed - semilla de autenticación 
//==================variable en heroku que es el seed de la app
process.env.SEED = process.env.SEED_DESARROLLO || 'este-es-el-seed-de-desarrollo';

//==================
//  GOOGLE CLIENT
//==================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1040056687506-q49vufi39876bpfme5ag7lvs09bjk4k8.apps.googleusercontent.com';

//==================
//  DB
//==================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;