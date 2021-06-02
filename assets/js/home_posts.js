// const { toggleLike } = require("../../controllers/like_controller");

{
    // method to submit the form data for new post using AJAX
    let createPost = function(){
    let newPostForm = $('#new-post-form');
    
    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button',newPost));

                // call the create comment class
                new PostComments(data.data.post._id);

                new ToggleLike(' .toggle-like-button', newPost);


                // displaying noty notification in AJAX
                new Noty({
                    theme: 'relax',
                    text: 'Post published!',
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500

                }).show();


            },error: function(error){
                console.log(error.responseText);
            }
        });
    });
}

    // method to create post in DOM
    let newPostDom = function(post){
        return $(`<li id = "post-${ post._id }">
                    <p>

                            <small>
                                <a class = "delete-post-button" href = "/posts/destroy/${ post._id }">X</a>
                            </small>
                
                        
                        ${ post.content }
                            <br>
                        <small>
                            ${ post.user.name }
                        </small>
                        <br>
                        <small>
                                <a href = "/likes/toggle/?id=${post.id}&type=Post" class="toggle-like-button" data-likes = "<%= post.likes.length %>">0 Likes</a>      
                        </small>
                    </p>
                    <div class="post-comments">

                
                            <form action="/comments/create" id="post-${` post._id `}-comments-form" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comments..." required>
                                <input type="hidden" name="post" value="${ post._id }">
                                <input type="submit" value="Add Comments">
                            </form>
                        
                        <div class="post-comments-list">
                            <ul class="post-comment-${ post._id }">
                                
                            </ul>
                        </div>
                
                    </div>
                </li>`)
    }

    // method to delete post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${ data.data.post_id }`).remove();

                    // displaying noty notification while deleting post by ajax
                    new Noty({
                        theme: 'relax',
                        text: 'Post and associated comments deleted!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: '1500'

                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);

        });
    }
                
    createPost();
    convertPostsToAjax();
}