const User = require("../models/User");
const Merchant =require("../models/Merchant");
const Admin = require("../models/Admin")
const { SECRET } = require("../config");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

module.exports = passport => {
  passport.use('passport-user',
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload.user_id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          return done(null, false);
        });
    })
  );
  passport.use('passport-merchant',
  new Strategy(opts, async (payload, done) => {
    await Merchant.findById(payload.user_id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => {
        return done(null, false);
      });
    })
  );

  passport.use('passport-admin',
  new Strategy(opts, async (payload, done) => {
    await Admin.findById(payload.user_id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => {
        return done(null, false);
      });
    })
  );


};
