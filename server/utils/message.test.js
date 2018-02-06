const expect = require('expect');

const { constructMessage } = require('./message');

describe('testConstructMessage', () => {
    it('should generate the correct message object', () => {
        let from = "Jen", text = "Some message";

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