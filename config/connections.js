/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

    //  ╔╦╗╦ ╦╔═╗╔═╗ ╦
    //  ║║║╚╦╝╚═╗║═╬╗║
    //  ╩ ╩ ╩ ╚═╝╚═╝╚╩═╝
    //
    localhostMysql: {
        adapter: 'sails-mysql',
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ok_db',
    },

    remoteMysql: {
        adapter: 'sails-mysql',
        host: 'localhost',
        user: 'root',
        password: 'BZ06rwHTuvt',
        database: 'ok_db',
    },



    //  ╔╦╗╔═╗╔╗╔╔═╗╔═╗
    //  ║║║║ ║║║║║ ╦║ ║
    //  ╩ ╩╚═╝╝╚╝╚═╝╚═╝
    //
    // mongolab: {
    //     adapter: 'sails-mongo',
    //     host: '',
    //     port: 55802,
    //     user: '',
    //     password: '',
    //     database: ''
    // },



    //  ╔═╗╔═╗╔═╗╔╦╗╔═╗╦═╗╔═╗
    //  ╠═╝║ ║╚═╗ ║ ║ ╦╠╦╝║╣
    //  ╩  ╚═╝╚═╝ ╩ ╚═╝╩╚═╚═╝
    //
    // somePostgresqlServer: {
    //     adapter: 'sails-postgresql',
    //     host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
    //     user: 'YOUR_POSTGRES_USER',
    //     password: 'YOUR_POSTGRES_PASSWORD',
    //     database: 'YOUR_POSTGRES_DB'
    // }



    //
    // More adapters: https://github.com/balderdashy/sails
    //

};
