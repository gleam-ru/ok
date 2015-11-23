module.exports.routes = {

    //
    // Main page
    //
    'get  /': 'Index',


    //
    // Profile page
    //
    'get  /me': 'Profile',


    // Settings
    'get  /settings'              : 'Settings',
    //---
    'post /settings/update'      : 'Settings.update',

    // Auth
    'get  /auth'                  : 'Auth',
    'get  /logout'                : 'Auth.logout',
    'get  /auth/:strategy'        : 'Auth.addStrategy',
    'get  /auth/:strategy/remove' : 'Auth.removeStrategy',
    //---
    'post /auth/:action'  : 'Auth.action', // 'login', 'register'


    //
    // About page
    //
    'get  /about'              : 'About',
    'get  /about/feedback'     : 'About.feedback',
    'get  /about/donation'     : 'About.donation',
    'get  /about/donation/thx' : 'About.thx',


    //
    // Admin
    //
    'get  /adm'                    : 'Admin',
    'get  /adm/users'              : 'Admin.all_users',
    'get  /adm/users/:id/edit'     : 'Admin.userEditor',
    //---
    'post /adm/users'              : 'Admin.updateUserData',
};
