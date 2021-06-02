// const e = require("express");

class ToggleLike{
    constructor(toggleElements){
        this.toggler = toggleElements;
        this.toggleLike();
    }


    toggleLike(){

        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
        

            // New way to writting ajax, this might look same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted == true){
                    likesCount -= 1;
                }else{
                    likesCount += 1;
                }

                $(self).attr('data-likes', likesCount);
                $(self).html(` ${likesCount} Likes`);

            })
            .fail(function(data){
                console.log('error in completing the request');
            });


        });



    }

}