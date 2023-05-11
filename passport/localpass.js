import passport from 'passport'
import { User } from '../models/user.js'
import { LocalStrategy } from "passport-local"

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    const user = User.findOne({ email: email })
    if (user) {
        return done(null, false, { message: "Ya existe ese email" })
    }
    const newUser = new User()
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    await newUser.save()
    done(null, newUser)
}))

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await User.findOne({ email })
    if (!user) { return done(null, false, { message: "No user" }) }
    if (!comparePassword(password)) { return done(null, false, { message: "Incorrect Password" }) }
    done(null, user)
}))

module.exports = (passport)








