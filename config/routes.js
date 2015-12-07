module.exports.routes = {

///////////////
// Main page //
///////////////
    'get  /': 'Index',


//////////
// Blog //
//////////
    'get  /blog'            : 'Blog.default_list',
    'get  /blog/get/:id'    : 'Blog.default_single',



//////////
// paid //
//////////
    'get  /paid'                   : 'Paid',
    'get  /paid/analytics'         : 'Blog.analytics_list',
    'get  /paid/analytics/get/:id' : 'Blog.analytics_single',

    'get  /paid/pay'             : 'Paid.pay',
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
    'get  /profile/get/:id'   : 'Profile.get',
    'get  /profile/settings'  : 'Profile.edit',
    // --
    'post /profile/update'    : 'Profile.update',



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
    'get  /admin/users/edit/:id'     : 'Admin.user',
    'post /admin/users'              : 'Admin.updateUserData',
    //---
    'get  /create'     : 'Admin.create',
    'post /create'     : 'Admin.post_POST',
    //---
    'get  /edit'       : 'Admin.edit',
    'post /edit'       : 'Admin.post_POST',
    //---



//////////////
// Settings //
//////////////
    // Settings
    // 'get  /settings': 'Settings',
    //---
    // 'post /settings/update': 'Settings.update',

};
