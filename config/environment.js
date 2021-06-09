const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan');

const logDirectory = path.join(__dirname, '../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    // asset_path: '/assets'
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'varunsharma55665@gmail.com',
            pass: ''
        }
    },
    google_client_id: "730748293697-s7iprpbjnsfeg02hh78gppmj1fuk6h7o.apps.googleusercontent.com",
    google_client_secret: "eyGf-WdtFg-n4om4prJtKWIr",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    // asset_path: '/assets'
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'varunsharma55665@gmail.com',
            pass: ''
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

console.log(process.env.CODEIAL_ENVIRONMENT);

// module.exports = development;

// npm install -g win-node-env use this to run the ===== npm run prod_start      (-g in the install command to install package globally)
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined?development:eval(process.env.CODEIAL_ENVIRONMENT);