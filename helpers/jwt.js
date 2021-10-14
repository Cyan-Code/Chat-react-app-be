const jwt = require('jsonwebtoken');

const generarJWT = (uid) => { // agnostico, no depende ni de login ni del renew
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el JWT');
      } else {
        resolve(token);
      }
    });
  });
}

const comprobarJWT = (token = '') => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY) //Leyendo token enviado en el query
    return [true, uid]
  } catch (error) {
    return [false, null]
  }
}


module.exports = {
  generarJWT, comprobarJWT
}
