const { validateURL } = require("../client/js/checkURL")

describe('urlValidity', ()=> {
    test('test if strings are false urls', () => {
        expect(validateURL("read")).toBeFalsy();
    })
    
    test('emails are not considered valid urls', () => {
        expect(validateURL("mailto:mariana.placito@gmail.com")).toBeFalsy();
    })
    
    test('expect urls to be true', () => {
        expect(validateURL("https://www.google.com")).toBeTruthy();
    })

    test('expect empty string to be falsy', () => {
        expect(validateURL("")).toBeFalsy();
    })
})