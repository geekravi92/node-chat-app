const expect = require('expect');

const { constructMessage, constructLocation } = require('./message');

describe('testConstructMessage', () => {
    it('should generate the correct message object', () => {
        const from = "EdWisor", text = "Some message";

        // Store result in a variable
        const message = constructMessage(from, text);

        // Assert "createdOn" is number
        expect(typeof message.createdOn).toBe('number');

        // Assert "from" match
        // Assert "text" match
        expect(message).toMatchObject({
            from,
            text
        });
    });
});

describe('testConstructLocation', () => {
    it('should generate correct location object', () => {
        const from = "EdWisor", lat = 15, lon = 20, url = 'https://www.google.com/maps?q=15,20';

        const message = constructLocation(from, lat, lon);

        expect(typeof message.createdOn).toBe('number');
        // expect.objectContaining({
        //     from: expect(message.from).toBe(from),
        //     url: expect(message.url).toBe(url)
        // })
        expect(message).toMatchObject({
            from,
            url
        });
    });
});

