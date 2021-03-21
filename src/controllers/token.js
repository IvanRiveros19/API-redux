require("dotenv").config();
const jwt = require("jsonwebtoken");
const token = {encodeToken, validateToken};
const {users} = require("../db");

async function encodeToken(id) {
    return await jwt.sign({id: id}, process.env.SECRET_KEY);
}

async function validateToken(req, res, next) {
    try {
        const tokenHeader = req.header('x-access-token');
        if (!tokenHeader) {
            return res.json({'status': false, 'message': "La petición no tiene cabecera de autorización"});
        } else {
            const decoded = await jwt.verify(tokenHeader, process.env.SECRET_KEY);
            var isRegistered = null;
            users.forEach(registeredUser => {
                if (registeredUser.id === decoded.id) {
                    isRegistered = registeredUser;
                }
            });
            if (!isRegistered) return res.json({'status': false, 'message': 'Usuario no encontrado'});
            next();
        }
    } catch (e) {
        return res.json({'status': false, 'message': 'No autorizado'});
    }
}

module.exports = token;
