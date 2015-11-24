module.exports.routes = {

    //
    // Main page
    //
    'get  /': 'Index',


    //
    // Profile page
    //
    'get  /profile': 'Profile',


    // Settings
    'get  /settings': 'Settings',
    //---
    'post /settings/update': 'Settings.update',

    // Auth
    'get  /auth'                  : 'Auth',
    'get  /logout'                : 'Auth.logout',
    'get  /auth/:strategy'        : 'Auth.addStrategy',
    'get  /auth/:strategy/remove' : 'Auth.removeStrategy',
    //---
    'post /auth/:action'          : 'Auth.action', // 'login', 'register'


    //
    // About page
    //
    'get  /about': 'Static.about',


    //
    // Admin
    //
    'get  /admin'                    : 'Admin',
    'get  /admin/users'              : 'Admin.all_users',
    'get  /admin/users/:id/edit'     : 'Admin.userEditor',
    //---
    'post /admin/users'              : 'Admin.updateUserData',
};
