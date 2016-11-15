const User = require('../models/user');
const Task = require('../models/task');
// const passport = require('../routes/passportSetup');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// passport.use(new GoogleStrategy({
//     clientID: "269725695221-9hi2t4e29fkntetkutt13hrn9dk1ebdo.apps.googleusercontent.com",
//     clientSecret: "UbVnBOudP25Yn5K1BUOVsQQ6",
//     callbackURL: "http://localhost:3000/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//        //   return done(err, user);
//        // });
//     process.nextTick(function(){
//     //   console.log('id : '+ profile.id);
//     //   console.log('name :'+ profile.displayName);
//     //   console.log('email :' + profile.emails);
//     //   console.log('token : '+ token);
//       console.log(profile);
//       return done(null, profile);
//     }); 
    
//   }
// ));


module.exports = [
  // {
  //   method: 'GET',
  //   path: '/auth/google',
  //   handler(request, reply) {
  //     passport.authenticate('google', { scope : ['profile'] })
  //     console.log("AsDf");
  //   }
  // },
  // {
  //   method: 'GET',
  //    path: '/auth/google/callback',
  //   handler(request, reply) {
  //     passport.authenticate('google', {successRedirect: '/api/test', failedRedirect: '/api/user'})
  //   }
  // },
  {
    method: 'POST',
    path: '/auth/login',
    handler(request, reply) {
      User.findOne({
        email: request.payload.email,
        password: request.payload.password
      }).exec()
        .then((doc) => {
          if (doc) reply({ status: true, doc })
          else reply({ status: false })
        })
    }
  },
  {
    method: 'POST',
    path: '/auth/validate',
    handler(request, reply) {
      console.log(request.query)
      if (request.payload.aud === '269725695221-9hi2t4e29fkntetkutt13hrn9dk1ebdo.apps.googleusercontent.com') reply({status: true})
      else replay({status: false})
    }
  }
]
