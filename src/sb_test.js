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

        describe('string as parameter', function() {


            it('should store one value in buffer', function(){
                var storage = sb.cat('hello');
                expect(storage.buffer).toMatch(['hello']);
            });
            it('should store multiple values in buffer', function() {
                var storage = sb.cat('Javascript', 'is', 'sexy').cat('!');
                expect(storage.buffer).toMatch(['Javascript','is','sexy','!']);
            });

            it('should be empty', function() {
               var storage = sb.cat(),
                   empty = [];
                expect(storage.buffer).toMatch(empty);
            });

        });

        describe('function as parameter', function() {


            it('should store one function value', function(){
                var storage = sb.cat(function() { return 'hello';});
                expect(storage.buffer).toMatch(['hello']);
            });
            it('should store multiple function values', function() {
                var storage = sb.cat('Javascript', function(){ return 'is';}, 'sexy').cat(function(){return '!';});
                expect(storage.buffer).toMatch(['Javascript','is','sexy','!']);
            });

        });

        describe('array as parameter', function() {


            it('should store one array value in buffer', function(){
                var storage = sb.cat(['hello']);
                expect(storage.buffer).toMatch(['hello']);
            });
            it('should store multiple array values in buffer', function() {
                var storage = sb.cat(['Javascript', 'is', 'sexy']).cat(['!']);
                expect(storage.buffer).toMatch(['Javascript','is','sexy','!']);
            });

        });

        describe('all combined', function() {


            it('should store array, function values in buffer', function(){
                var storage = sb.cat(['im an array'], 'im a string')
                                .cat('im another concat string', function(){ return 'with a function'});
                expect(storage.buffer).toMatch(['im an array','im a string','im another concat string','with a function']);
            });


        });


    });
});