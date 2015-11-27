module.exports.routes = {

///////////////
// Main page //
///////////////
    'get  /': 'Index',


//////////
// Blog //
//////////
    'get  /blog'            : 'Blog',
    'get  /blog/get/:id'    : 'Blog.get',
    'get  /blog/tags/:tag'  : 'Blog.tag',



//////////
// paid //
//////////
    'get  /paid'                 : 'Paid',
    'get  /paid/pay'             : 'Paid.pay',
    'get  /paid/ideas'           : 'Paid.ideas',
    'get  /paid/ideas/get/:id'   : 'Paid.idea',
    'get  /paid/archive'         : 'Paid.archive',
    'get  /paid/allocation'      : 'Paid.allocation',



///////////
// About //
///////////
    'get  /about': 'Static.about',



////////
// QA //
////////
    'get  /qa'      : 'QA',
    'post /qa'      : 'QA.posted',



/////////////
// Profile //
/////////////
    'get  /profile'           : 'Profile.get',
    'get  /profile/settings'  : 'Profile.settings',
    'get  /profile/get/:id'   : 'Profile.get',



//////////
// Auth //
//////////
    'get  /auth'                  : 'Auth',
    'get  /logout'                : 'Auth.logout',
    'get  /auth/:strategy'        : 'Auth.addStrategy',
    'get  /auth/:strategy/remove' : 'Auth.removeStrategy',
    //---
    'post /auth/:action'          : 'Auth.action', // 'login', 'register'



///////////
// Admin //
///////////
    'get  /admin'                    : 'Admin',
    'get  /admin/users'              : 'Admin.users',
    'get  /admin/users/:id/edit'     : 'Admin.user',
    //---
    'post /admin/users'              : 'Admin.updateUserData',



//////////////
// Settings //
//////////////
    // Settings
    // 'get  /settings': 'Settings',
    //---
    // 'post /settings/update': 'Settings.update',

};
