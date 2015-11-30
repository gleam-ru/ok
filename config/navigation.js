module.exports.navigation = [
    {
        name     : "Админка",
        href     : "/admin",
        canSee   : ["admin"],
    },

    {
        name     : "Блог",
        href     : "/blog",
    },

    {
        name     : "Закрытый раздел",
        href     : "/paid",
    },

    {
        name     : "О компании",
        href     : "/about",
    },

    {
        name     : "Задать вопрос",
        href     : "/qa",
    },




    {
        name     : "Профиль",
        href     : "/profile",
        canSee   : ["user"],
    },
    // {
    //     name     : "Настройки",
    //     href     : "/settings",
    //     // canSee   : ["user"],
    // },
    {
        name     : "Выход",
        href     : "/logout",
        canSee   : ["user"],
    },

    {
        name     : "Регистрация / Вход",
        href     : "/auth",
        canSee   : ["ghost"],
    },
];
