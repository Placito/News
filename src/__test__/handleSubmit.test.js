/**
 * @jest-environment jsdom
 */


const { handleSubmit } = require("../client/js/formHandler")

describe('handleSubmit', ()=> {
    it('returns something', () => {
        expect(handleSubmit).toBeDefined();
    })
})