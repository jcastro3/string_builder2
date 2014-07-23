/**
 * Created by jcastro on 7/21/2014.
 */


describe('___String Builder___', function () {
    'use strict';
        var sb,
            storage;
    beforeEach(function () {
         sb = new StringBuilder();
    });

    afterEach(function () {
       storage = [];
    });

    describe('Cat Method', function(){

        describe('string as parameter', function() {


            it('should store one value in buffer', function(){
                storage = sb.cat('hello');
                expect(storage.buffer).toMatch(['hello']);
            });
            it('should store multiple values in buffer', function() {
                storage = sb.cat('Javascript', 'is', 'sexy').cat('!');
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
                storage = sb.cat(function() { return 'hello';});
                expect(storage.buffer).toMatch(['hello']);
            });
            it('should store multiple function values', function() {
                storage = sb.cat('Javascript', function(){ return 'is';}, 'sexy').cat(function(){return '!';});
                expect(storage.buffer).toMatch(['Javascript','is','sexy','!']);
            });

        });

        describe('array as parameter', function() {


            it('should store one array value in buffer', function(){
                storage = sb.cat(['hello']);
                expect(storage.buffer).toMatch(['hello']);
            });
            it('should store multiple array values in buffer', function() {
                storage = sb.cat(['Javascript', 'is', 'sexy']).cat(['!']);
                expect(storage.buffer).toMatch(['Javascript','is','sexy','!']);
            });

        });

        describe('all combined', function() {


            it('should store array, function values in buffer', function(){
                storage = sb.cat(['im an array'], 'im a string')
                            .cat('im another concat string', function(){ return 'with a function'});
                expect(storage.buffer).toMatch(['im an array','im a string','im another concat string','with a function']);
            });


        });


    });
    //rep(arg1, arg2,..., argN, howManyTimes)
    describe('REP method', function() {
    //concatenates the same string a given number of times
        describe('repeat a string', function () {

            it('should repeat 2 times', function() {
                storage = sb.rep('robot', 2);
                expect(storage.buffer).toMatch(['robot', 'robot']);
            });

            it('should repeat 5 times', function(){
                storage = sb.rep('robot', 5);
                expect(storage.buffer).toMatch(['robot', 'robot','robot', 'robot','robot']);
            });

        });

        describe('combined with cat()', function() {

            it('should store result in buffer ', function(){
                storage = sb.cat('Mom, can you')
                            .rep('please', 4)
                            .cat('buy', ['me'])
                            .cat(function(){ return 'ice cream';});
                expect(storage.buffer).toMatch(['Mom, can you', 'please', 'please', 'please', 'please','buy', 'me', 'ice cream']);
            })
        });

        describe('array and function as parameters', function() {
            it('should ', function() {
                storage = sb.cat('The surface of the sun is')
                            .cat(function() { return 15;})
                            .rep(function() {return 0;},3)
                            .rep([0],3)
                            .cat('degrees C');
                expect(storage.buffer).toMatch(['The surface of the sun is','15','0','0','0','0','0','0','degrees C']);
            })
        })
    });
});