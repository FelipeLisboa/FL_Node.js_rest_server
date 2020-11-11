const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: { //required false
        type: String,
        required: false

    },
    role: { //default 'USER_ROLE'
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: { //boolean
        type: Boolean,
        default: true
    },
    google: { //boolean
        type: Boolean,
        default: false
    }
});

//función para ocultar la psw
usuarioSchema.methods.toJSON = function() {

    let user = this; //toma el usuario que tiene en ese momento
    let userObject = user.toObject(); //pasa el usuario a un objeto
    delete userObject.password; //elimina la psw del objeto

    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });


module.exports = mongoose.model('Usuario', usuarioSchema);