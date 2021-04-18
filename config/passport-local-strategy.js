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

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is signed in then pass on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending it to locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;