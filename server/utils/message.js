exports.constructMessage = (from, text) => ({
    from,
    text,
    createdOn: new Date().getTime()
});