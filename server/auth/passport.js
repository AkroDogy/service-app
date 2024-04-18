const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userModel = require("../db/schemas/auth_schema");
const dotenv = require("dotenv");
dotenv.config();



passport.use(
  new GoogleStrategy({
      clientID        : process.env.GOOGLE_CLIENT_ID,
      clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
      callbackURL     : process.env.GOOGLE_CALLBACK_URI,
    },
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        profileImage: profile.photos[0].value,
        email: profile.emails[0].value,
      };

      try {
          let user = await userModel.findOne({ googleId: profile.id.toString() });
        if (user) {
          done(null, user);
        } else {
          user = await userModel.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
