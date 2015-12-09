module.exports = function (req, res, cb) {
    if (res.locals.hasRoles(['paid', 'admin'])) {
        return cb();
    }
    else {
        return res.pay();
    }
};
