module.exports = function (req, res, cb) {
    if (res.locals.hasRoles('admin')) {
        return cb();
    }
    else {
        return res.forbidden();
    }
};
