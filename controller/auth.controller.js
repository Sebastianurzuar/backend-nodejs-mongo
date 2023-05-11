import { User } from '../models/user.js'
import passport from 'passport'

export const register = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) { throw new Error('Ya existe este email') }
        else {
            user = new User({ email, password })
            await user.save()
        }
        res.json(user)
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) throw new Error('No existe este email')
        if (!(await user.comparePassword(password))) throw new Error('Contraseña no correcta')
        req.login(user, function (err) {
            if (err) throw new Error('Error al crear la sesión')
            res.redirect('/home')
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const cerrarSesion = (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
};




export const registerPage = (req, res) => {
    res.render("createaccount");
};

export const loginPage = (req, res) => {
    res.render("login");
};

export const homePage = async (req, res) => {
    try {
        res.render("home", { e: req.user });
    } catch (error) {
        console.log(error)
    }
}
