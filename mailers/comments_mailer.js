const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method (as file in javascript considered as module)
exports.newComment = (comment) => {
    // console.log('Inside newComment mailer', comment);

    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'varunsharma55665@gmail.com',
        to: comment.user.email,
        subject: "New Comment published!",
        // html: '<h1>Yup, your comment is now published!</h1>'
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent!', info);
        return;
    });

}
