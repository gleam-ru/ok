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
    'get  /paid/p/edit/:id'        : 'Portfolio.edit',
    // //
    'get  /paid/ideas/get/:id'     : 'Paid.idea',
    'get  /paid/archive'           : 'Paid.archive',





///////////
// About //
///////////
    'get  /about': 'Static.about',



////////
// QA //
////////
    'get  /qa'      : 'QA',



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
    // //
    'post /auth/:action'          : 'Auth.action', // 'login', 'register'



///////////
// Admin //
///////////
    'get  /admin'                    : 'Admin',
    'get  /admin/users'              : 'Admin.users',
    'get  /admin/users/edit/:id'     : 'Admin.user',
    'post /admin/users'              : 'Admin.updateUserData',
    // //
    'get  /admin/qa'                 : 'Admin.qas',
    // //
    'get  /admin/requests'           : 'Admin.pay_requests',
    // //
    'get  /create' : 'Blog.create',
    'get  /edit'   : 'Blog.edit',
    // //



/////////
// API //
/////////
    'post /api/update_post'        : 'API.post_update',
    'post /api/remove_post'        : 'API.post_remove',
    // //
    'post /api/create_portfolio'   : 'API.portfolio_create',
    'post /api/update_portfolio'   : 'API.portfolio_update',
    'post /api/remove_portfolio'   : 'API.portfolio_remove',
    // //
    'post /api/create_pay_request' : 'API.pay_request_create',
    'post /api/remove_pay_request' : 'API.pay_request_remove',
    // //
    'post /api/create_qa'          : 'API.qa_create',
    'post /api/remove_qa'          : 'API.qa_remove',
    // //
    'post /api/subscribe'          : 'API.subscribe',



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
    // //
    // 'post /settings/update': 'Settings.update',


///////////////
// Contracts //
///////////////

    // версии "для печати" с отвязкой от стилей сайта
    'get  /contract/:type'            : 'Contract.create',
    'get  /contract/get/:id'          : 'Contract.printpage',

    // администрирование контрактов
    'get  /admin/contracts/:type'     : 'Contract.all',
    'get  /admin/contracts/get/:id'   : 'Contract.single',

    // //
    'post /api/contract'              : 'Contract.update',


};
