import { Router } from 'express';
import {
    loginInicioController,
    loginIniciarSesionController,
    registrarinicioController,
    registrarController,
    cerrarSesionController
} from '../controllers/login.controller.js';
import passport from 'passport';
import { sessionValidation, authMiddleware } from '../middlewares/auth.middleware.js'


const loginRouter = Router();

loginRouter.get('/', (req, res) =>{
    res.redirect('/login');
});
loginRouter.get('/login', sessionValidation, loginInicioController); // ok
loginRouter.post('/login', loginIniciarSesionController); // ok
loginRouter.get('/registrar', registrarinicioController); // ok
//loginRouter.post('/registrar', registrarController); // ok
loginRouter.post('/registrar', passport.authenticate('register',{failureRedirect:'/failregister'}), async (req, res) => {
    res.json({status:"success", message:"Registrado correctamente"});
}); // ok
loginRouter.get('/failregister', async (req, res) =>{
    res.json({status:"error", message:"Usuario ya se encuentra registrado."});
}); // ok
loginRouter.get('/cerrarSesion', cerrarSesionController); // ok

export default loginRouter;