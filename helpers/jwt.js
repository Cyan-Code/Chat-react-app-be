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


module.exports = {
  generarJWT
}
