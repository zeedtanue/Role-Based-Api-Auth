const User = require("../models/User");
const Merchant =require("../models/Merchant");
const Admin = require("../models/Admin");
const { SECRET } = require("../config");
const { Strategy, ExtractJwt } = require("passport-jwt");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook")


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



  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: "http://localhost:5000/api/users/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ email: profile.emails[0].value }).then(user => {
      if(user) return done(null, user);
      User.create({
        name 		: profile.displayName,
        username: profile.emails[0].value,
        email 		: profile.emails[0].value,
        gateway		: 'google',
        role 		: 'user'
      }).then(new_user => {
        return done(null, new_user);
      }).catch(err => {
        return done(err, null);
      });


    }).catch(err=>{
      return done(err, null);
    })
    
  }
));


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_OAUTH_ID,
  clientSecret: process.env.FACEBOOK_OAUTH_SECRET,
  callbackURL: "http://localhost:5000/api/users/auth/facebook/callback"
},
(accessToken, refreshToken, profile, cb)=> {
  console.log('access token', accessToken)
}
));



};
