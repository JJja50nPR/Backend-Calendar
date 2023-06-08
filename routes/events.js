/*
    Rutas de eventos / Events
    host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require('../helpers/isDate')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Todas las peticiones pasan por la validacion JWT
router.use( validarJWT );

// Obtener eventos
router.get('/',  getEventos);

// Crear eventos
router.post(
    '/',  
    [
        check('title', 'El titulo es oblogatorio' ).not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria' ).custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria' ).custom( isDate ),
        validarCampos
    ],
    crearEvento
);

// Actualizar eventos
router.put('/:id',  actualizarEvento);

// Borrrar eventos
router.delete('/:id',  eliminarEvento);


module.exports = router;