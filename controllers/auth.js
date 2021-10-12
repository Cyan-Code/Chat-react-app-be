const { response } = require("express")
const Usuario = require('../models/usuario')

const crearUsuario = async (req, res = response) => {
  try {
    
    const {email, password} = req.body;

    //Verificar si existe el email
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya existe'
      })
    }

    // Encriptar contraseña


    // Guardar en la base de datos
    const usuario = new Usuario(req.body) // Instancia creada
    await usuario.save(); // usuario grabado

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    });
  }
}

const login = async (req, res) => {

  
  const {email, password} = req.body;
  res.json({
    ok: true,
    msg: 'login',
    email, password
  })
}

const revalidarToken = async (req, res) => {
  res.json({
    ok: true,
    msg: 'renew'
  })
}

module.exports = {
  crearUsuario,
  login,
  revalidarToken
}
