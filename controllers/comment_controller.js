const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function(req,res){
    let post = await Post.findById(req.body.post);

    try{
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            // handle error
    console.log('fdajfhkadffdahdf');
            if(req.xhr){
console.log("bfdnfndjfdfjkndfdfhbdsfwehjbnfdcdf");
                // if we want to populate just the name of the user(we'll not want to send the passpword in the API), this is how we do it!
            comment = await comment.populate('user', 'name').execPopulate();

                post.comments.push(comment);   // updating in ram
                post.save();                  // saving in database
                return res.status(200).json({
                    data:{
                        comment: comment
                    },
                    message: "Comment Created"
                });
            }

            post.comments.push(comment);   // updating in ram
            post.save();                  // saving in database

            req.flash('success','Comment Posted');
            
            res.redirect('back');
        }
    }catch{
        // console.log('Error',err);
        req.flash('error',err);
    }

}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();
console.log(req.xhr);
            if(req.xhr){
                // Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}} );
                console.log('fjafhafadf');
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted"
                });
            }

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err,post){
                return res.redirect('back');
            });


            req.flash('success','Comment deleted');
        }else{
            req.flash('error','Cannot delete Comment');
            return res.redirect('back');
        }
        
    }catch(err){
        // console.log('Error',err);
        req.flash('error',err);
        return res.redirect('back');
    }
    
}