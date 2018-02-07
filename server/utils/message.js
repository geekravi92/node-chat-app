exports.constructMessage = (from, text) => ({
    from,
    text,
    createdOn: new Date().getTime()
});

exports.constructLocation = (from, lat, lon) => {
    return {
        from: from,
        url: `https://www.google.com/maps?q=${lat},${lon}`,
        createdOn: new Date().getTime()
    }
}

