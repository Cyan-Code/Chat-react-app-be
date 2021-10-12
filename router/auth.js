/**
 * Path: /api/login
 */

const {Router} = require('express')
const { check } = require('express-validator')

// Controladores
const { crearUsuario, login, revalidarToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

// Crear nuevos usuarios
router.post('/new', [
  check('email', 'El email es obligatorio').isEmail(),
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('password', 'El password es obligatorio').notEmpty(),
  validarCampos
], crearUsuario)

// Crear nuevos usuarios
router.post('/', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').notEmpty(),
  validarCampos
], login)

// Revalidar Token
router.get('/renew', revalidarToken)



module.exports = router
