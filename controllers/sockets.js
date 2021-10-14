const Usuario = require('../models/usuario');

const usuarioConectado = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = true; // Conectando a true en la base de datos (el online que creamos en el modelo)
  await usuario.save();
  return usuario;
}

const usuarioDesconectado = async (uid) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = false; // Desconectando
  await usuario.save();
  return usuario
}

module.exports = {
  usuarioConectado, usuarioDesconectado
}

