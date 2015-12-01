var flashes = {};

flashes.push = function(req, name, data) {
    var existing = req.flash(name);
    existing.push(data);
    req.flash(name, existing);
    return existing;
}

flashes.error = function(req, err) {
    var errors = [];
    if (Array.isArray(err)) {
        errors = _.flatten(_.map(err, formatError))
    }
    else {
        errors = formatError(err);
    }
    _.each(errors, function(e) {
        flashes.push(req, 'error', e)
    });
}

flashes.info = function(req, text) {
    flashes.push(req, 'info', text);
}






function formatError(err) {
    var errors = [];
    if (!err) {
        return errors;
    }
    else if (err.invalidAttributes) {
        /*
        err looks like: {
            code: 'E_VALIDATION',
            invalidAttributes: {
                email: [
                    [Object]
                ]
            },
            _e: {
                handle: 17,
                type: 'error',
                className: 'Error',
                constructorFunction: {
                    ref: 33
                },
                protoObject: {
                    ref: 34
                },
                prototypeObject: {
                    ref: 3
                },
                properties: [
                    [Object]
                ],
                text: 'Error'
            },
            rawStack: '    at WLValidationError.WLError (C:\\Users\\demeshenko\\AppData\\Roaming\\nvm\\v0.12.... (length: 1986)',
            reason: '1 attribute is invalid',
            status: 400,
            model: undefined,
            details: 'Invalid attributes sent to undefined:\n • email\n   • A record with that `email` a... (length: 113)',
            isOperational: true
        }
        //*/
        _.each(err.invalidAttributes, function(attr_review, attr_name) {
            var error = '<b>'+attr_name+'</b>: ';
            _.each(attr_review, function(item) {
                errors.push(error.slice()+item.message)
            })
        })
    }
    else if (err.message) {
        errors.push(err.message)
    }
    else {
        console.error('unhandled error');
        console.error(err.stack);
        errors.push('<b>Please, contact Administrator</b>');
    }
    return errors;
}




module.exports = flashes;
