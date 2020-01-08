// import { use } from 'passport';
// import { FacebookStrategy } from 'passport-facebook';

// use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     profileFields: ['id', 'displayName', 'email']
// },
//     function (accessToken, refreshToken, profile, cb) {
//         // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         //   return cb(err, user);
//         // });
//     }
// ));