const User = require("../models/user");

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            title: "User Profile",
            profile_user: user
        });
    });
    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Codeial | Sign Up"
    });
}

// get sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.conform_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signup'); return}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating user while signing in'); return}
                
                return res.redirect('/users/sign-in');
            })
        }else{
            res.redirect('back');
        }
    });

}

// sign in and create session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();

    res.redirect('/');
}