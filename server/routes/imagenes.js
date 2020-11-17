const express = require('express');
const path = require('path');
const { verificaTokenImg } = require('../middlewares/autenticacion');

const fs = require('fs');

const app = express();


app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/not-found.jpg');
        res.sendFile(noImagePath);
    }


});

module.exports = app;