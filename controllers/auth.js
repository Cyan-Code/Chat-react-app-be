const { response } = require("express")
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

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

    const usuario = new Usuario(req.body) // Instancia creada

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en la base de datos
    await usuario.save(); // usuario grabado

    // Generar JWT
    const token = await generarJWT( usuario.id );

    return res.json({
      ok: true,
      usuario, token
    })

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    });
  }
}

const login = async (req, res) => {
  const {email, password} = req.body;

  try {
    
    // Verificar si existe el correo
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado'
      });
    }

    // Validar el password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    }

    // Generar el nuevo JWT
    const token = await generarJWT( usuarioDB.id );
    return res.json({
      ok: true,
      usuario: usuarioDB,
      token
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'hable con el administrador'
    });
  }
  
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
