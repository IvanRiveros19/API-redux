const controladorLaptops = {};
const {laptops} = require("../db");

controladorLaptops.add = async (req,res) => {
    const {marca, procesador, ram} = req.body;
    if (!marca || !procesador || !ram) {
        res.json({
            'status': false,
            'message': 'Datos insuficientes'
        });
    } else {
        laptops.push({id: await generarId(), marca: marca, procesador: procesador, ram: ram});
        res.json({
            'status': true,
            'message': 'Laptop añadida correctamente'
        });
    }
};

async function generarId() {
    const _sym = 'abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var id = '';
    for (var i = 0; i < 4; i++) {
        id += _sym[parseInt(Math.random() * (_sym.length))];
    }
    return id;
}


controladorLaptops.get = async (req,res) => {
    res.json({
        'status': true,
        'laptops': laptops
    });
};

module.exports = controladorLaptops;