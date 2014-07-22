/**
 * Created by jcastro on 7/21/2014.
 */

describe('___String Builder___', function () {
    'use strict';

    beforeEach(function () {
        var array = [];
        var sb = new Stri();
    });

    describe('Cat Method', function(){
        it('simple cat', function(){
            var string = sb.cat('hello');
            expect(string).toBe('hello');
        });
        it('multiple cat', function() {
            var string = sb.cat('Javascript', 'is', 'sexy').cat('!');
            expect(string).toBe('Javascript is sexy!');
        })

    });
});