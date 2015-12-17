module.exports.routes = {

///////////////
// Main page //
///////////////
    'get  /': 'Index',


//////////
// Blog //
//////////
    'get  /blog'                   : 'Blog.default_blog',
    'get  /blog/get/:id'           : 'Blog.default_post',
    // //
    'get  /blog/f'                 : 'Blog.free_feed',
    'get  /blog/f/:blog'           : 'Blog.free_blog',
    'get  /blog/f/:blog/get/:id'   : 'Blog.free_post',



//////////
// paid //
//////////
    'get  /paid'                   : 'Paid',
    'get  /paid/pay'               : 'Paid.pay',
    // //
    'get  /paid/f'                 : 'Blog.paid_feed',
    'get  /paid/f/:blog'           : 'Blog.paid_blog',
    'get  /paid/f/:blog/get/:id'   : 'Blog.paid_post',
    // //
    'get  /paid/p'                 : 'Portfolio.feed',
    'get  /paid/p/:name'           : 'Portfolio.single',
    // //
    'get  /paid/ideas/get/:id'     : 'Paid.idea',
    'get  /paid/archive'           : 'Paid.archive',
    'get  /paid/allocation'        : 'Paid.allocation',





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
    'get  /create' : 'Blog.create',
    'get  /edit'   : 'Blog.edit',
    //---



/////////
// API //
/////////
    'post /api/update_post'       : 'API.post_update',
    'post /api/remove_post'       : 'API.post_remove',
    // //
    'post /api/subscribe'         : 'API.subscribe',


////////////
// Static //
////////////
    'get  /landing' : 'Static.landing',
    'get  /landing_old' : 'Static.landing_old',


//////////////
// Settings //
//////////////
    // Settings
    // 'get  /settings': 'Settings',
    //---
    // 'post /settings/update': 'Settings.update',

};
