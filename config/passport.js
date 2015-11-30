module.exports.passport = {

    successRedirect: '/',
    fillCredentials: '/profile/settings',

    local: {
        usernameField: 'identifier',
        successRedirect: '/',
        failureRedirect: '/auth',
        failureFlash: true,
    },

    rememberme: {
        key: 'token',
    },

    strategies: {
        // https://vk.com/dev/auth_sites
        vkontakte: {
            passReqToCallback: true,
            name: 'Vkontakte',
            icon: 'fa-vk',
            clientID: '', // docs call it 'APP ID'
            clientSecret: '',
            callbackURL: '/auth/vkontakte',
        },

        // https://console.developers.google.com/project/calcium-adapter-447/apiui/credential?authuser=0
        google: {
            passReqToCallback: true,
            name: 'Google',
            icon: 'fa-google',
            clientID: '',
            clientSecret: '',
            callbackURL: '/auth/google',
            // https://developers.google.com/identity/protocols/OAuth2UserAgent
            // https://developers.google.com/+/api/oauth#login-scopes
            scope: [
                'profile',
                'email',
            ],
        },

        // https://oauth.yandex.ru/client/new
        yandex: {
            passReqToCallback: true,
            name: 'Yandex',
            icon: 'fa-yahoo',
            clientID: '',
            clientSecret: '',
            callbackURL: '/auth/yandex',
        },

        // http://api.mail.ru/sites/my/733695
        mailru: {
            passReqToCallback: true,
            name: 'Mail.ru',
            icon: 'fa-at',
            clientID: '',
            clientSecret: '',
            callbackURL: '/auth/mailru',
        },

        // https://apps.twitter.com/app/8316700/keys
        twitter: {
            passReqToCallback: true,
            name: 'Twitter',
            icon: 'fa-twitter',
            consumerKey: '',
            consumerSecret: '',
            callbackURL: '/auth/twitter',
        },

        // https://developers.facebook.com/apps
        facebook: {
            passReqToCallback: true,
            name: 'Facebook',
            icon: 'fa-facebook',
            clientID: '',
            clientSecret: '',
            callbackURL: '/auth/facebook',
            enableProof: false
        },
    },

};
