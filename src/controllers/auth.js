const {encodeToken} = require('./token');
const controladorAuth = {};
const {users} = require("../db");

controladorAuth.login = async (req,res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.json({
            'status': false,
            'message': 'Usuario y contraseña son requeridos '
        });
    } else {
        var isRegistered = null;
        users.forEach(registeredUser => {
            if (registeredUser.username === username && registeredUser.password === password){
                isRegistered = registeredUser;
            }
        });
        if (isRegistered){
            res.json({
                'status': true,
                'token': await encodeToken(isRegistered.id)
            });
        } else {
            res.json({
                'status': false,
                'message':'Usuario o Contraseña incorrecta'
            });
        }
    }
};

module.exports = controladorAuth;
