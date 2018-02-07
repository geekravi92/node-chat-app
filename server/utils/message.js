const moment = require('moment');

exports.constructMessage = (from, text) => ({
    from,
    text,
    createdOn: moment().valueOf()
});

exports.constructLocation = (from, lat, lon) => {
    return {
        from: from,
        url: `https://www.google.com/maps?q=${lat},${lon}`,
        createdOn: moment().valueOf()
    }
}

