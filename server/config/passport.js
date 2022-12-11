import pkg from "passport-jwt";

const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;
import UserModel from "../models/UserModel.js";

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "some secret.";

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      UserModel.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
