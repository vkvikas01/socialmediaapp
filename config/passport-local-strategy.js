const passport = require('passport');

const LocalStrategy = require('passport-local');

const User = require('../models/user');

// authenticate using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
},
    function(email,password,done){
        // find the username and establish the identity
        User.findOne({email:email}, function(err,user){
            if(err){
                console.log('Error in finding user --> Passport');
                done(err);
            }

            if(!user || user.password != password){
                return done(null,false);
            }

            return done(null,user);
        });
    }
    ));

// serialize the user to decide which key is to kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user);
});

// deserialize the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findOne(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

module.exports = passport;