require("dotenv").config(); // Ensure this is at the top

const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { Patient, Doctor } = require("../models");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET, // Ensure this is correctly set
};

passport.use(
    new Strategy(options, async (payload, done) => {
        try {
            let user = await Patient.findByPk(payload.id);
            if (!user) {
                user = await Doctor.findByPk(payload.id);
            }
            return user ? done(null, user) : done(null, false);
        } catch (err) {
            return done(err, false);
        }
    })
);

const authenticate = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        }

        console.log("debugging jwt")
        console.log(user)
        req.user = user;
        next();
    })(req, res, next);
};

const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

module.exports = { authenticate, generateToken };