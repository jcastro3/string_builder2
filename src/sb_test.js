/**
 * Created by jcastro on 7/21/2014.
 */


describe('___String Builder___', function () {
    'use strict';
        var sb,
            array;
    beforeEach(function () {
         array = [];
         sb = new StringBuilder();
    });

    describe('Cat Method', function(){
        it('should store one value in buffer', function(){
            var storage = sb.cat('hello');
            expect(storage.buffer).toMatch(['hello']);
        });
        it('should store multiple cat values in buffer', function() {
            var storage = sb.cat('Javascript', 'is', 'sexy').cat('!');
            expect(storage.buffer).toMatch(['Javascript','is','sexy','!']);
        });

        it('should be empty', function() {
           var storage = sb.cat(),
               empty = [];
            expect(storage.buffer).toMatch(empty);
        });

    });
});