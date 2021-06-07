const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

// tell passport to use a new google strategy for google user
passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url
    },
    function(accessToken, refresh, profile, done){
        // find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy', err); return; 
            }
            console.log(profile);

            if(user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found create the user and set as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.email[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('error in creating  user google strategy-password', err); return;}

                    return done(null, user);
                });
            }

        });
    }
));