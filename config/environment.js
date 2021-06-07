
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
    jwt_secret: 'codeial'
}

const production = {
    name: 'production'
}

module.exports = development;