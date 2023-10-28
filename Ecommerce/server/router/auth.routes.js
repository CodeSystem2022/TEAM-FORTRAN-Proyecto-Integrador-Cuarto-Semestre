import { Router} from 'express';    
import {ingresar} from "./auth.routes";

const router = new Router();

router.post('/singnin', ingresar);

router.post('/singout', (req, res) => res.send("Saliendo"));

router.post('/singup', (req, res) => res.send("Registrando"));

router.post('/Profile', (req, res) => res.send("perfil de usuario"))

export default router;