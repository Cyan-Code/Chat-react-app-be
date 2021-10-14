const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensajes');

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

const getUsuarios = async () => {
  try {
    const usuarios = await Usuario
      .find()
      .sort('-online');


    return usuarios    
  } catch (error) {
    console.log(error)
  }
  
}

const grabarMensajes = async(payload) => { // Funcion para crear mensajes
  try {
    const mensaje = new Mensaje(payload);
    await mensaje.save()

    return mensaje;
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  grabarMensajes,
}

