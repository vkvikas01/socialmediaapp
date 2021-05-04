const { populate } = require('../models/post.js');
const Post = require('../models/post.js');

module.exports.home = function(req, res){
    // res.end('<h1>Express is up for Codeial</h1>');
    // insted of home we can also write ../views/home it will also run

    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    // Post.find({}, function(err,posts){
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // })

    // Populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts
        });
    })
    
}

// module.exports.actionName = function(req,res){}