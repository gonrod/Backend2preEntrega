import { Router}  from 'express';
import jwt from 'jsonwebtoken';

const users = []; //De momento se optará por una persistencia en memoria.

const router = Router();

/* {
        "name": "nahuel",
        "email": "example@gmail.com",
        "password" : "password"
} */
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    // Crear hash de la contraseña
    const hashedPassword = createHash(password);

    const newUser = new UserModel({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

//Login enviando JWT en cookie
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if(email === "coder@coder.com" && password === "password"){
        let token = jwt.sign( {email, role:"user"}, "coderSecret", { expiresIn : "24h"});
        res.cookie('tokenCookie', token, {httpOnly: true, maxAge:60*60*1000 }).send({message : "Login exitoso"});

    }else{
        res.status(401).send({message : "Credenciales inválidas"});
    }
});
//Login enviando JWT en la respuesta
router.post('/loginLocalStorage', (req, res) => {
    const { email, password } = req.body;
    if(email === "coder@coder.com" && password === "password"){
        let token = jwt.sign( {email, role:"user"}, "coderSecret", { expiresIn : "24h"});
        res.send({message : "Login exitoso", token: token});
    }else{
        res.status(401).send({message : "Credenciales inválidas"});
    }
});

export default router;