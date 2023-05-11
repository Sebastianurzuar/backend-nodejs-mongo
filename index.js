import express from "express";
import "dotenv/config";
import "./database/connectdb.js";
import authRouter from "./routes/auth.route.js";
import ejs from "ejs";
import session from 'express-session';
import passport from "passport";
import flash from 'express-flash'
import { User } from "./models/user.js";


const app = express();

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'misecreto',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

passport.serializeUser(function (user, done) {
  done(null, user.email)
})
passport.deserializeUser(async (email, done) => {
  const user = await User.findOne({ email })
  return done(null, user)
})



app.use("/", authRouter);

const puerto = process.env.PUERTO || 5000;
app.listen(puerto, () => {
  console.log(`Aplicación corriendo en el puerto ${puerto}`);
});
