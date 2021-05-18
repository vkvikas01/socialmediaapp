const User = require("../models/user");
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            title: "User Profile",
            profile_user: user
        });
    });
    
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     console.log('inside update controlle');
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
    //         req.flash('success','User Modified');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('success','User not authorized');
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.user.id == req.params.id){
        
        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        // if initially we does not have any image uploaded then it will give error because image is not there and we are finding it and to solve this condition we can solve it by fs(file system) search on google
                        fs.unlinkSync(path.join(__dirname, '..',user.avatar));
                    }

                    // this is saving path of uploaded file into the path field of user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');

            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
            req.flash('success','User not authorized');
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
        req.flash('error','password and conform password are different');
        return res.redirect('back');
    }

    User.findOne({email:req.body.email}, function(err,user){
        if(err){console.log('error in finding user in signup'); return}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){req.flash('error','error in creating user while signing in'); return res.redirect('back');}
                req.flash('success','New User Created');
                return res.redirect('/users/sign-in');
            })
        }else{
            res.redirect('back');
        }
    });

}

// sign in and create session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfuly');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have Logged out!');

    res.redirect('/');
}