const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
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

    try{
        // Populate the user of each post
        // Populate the likes of each post and comment (Added when doing likes feature)
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
        })
        .populate({
            path: 'comments',
            populate: {
                path: 'likes'
            }
        })
        .populate('likes');
        
        let users = await User.find({});

        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    }catch{
        console.log('Error',err);
    }

    
    
}

// module.exports.actionName = function(req,res){}