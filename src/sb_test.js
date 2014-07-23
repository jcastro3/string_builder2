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
            it('should pass ', function() {
                storage = sb.cat('The surface of the sun is')
                            .cat(function() { return 15;})
                            .rep(function() {return 0;},3)
                            .rep([0],3)
                            .cat('degrees C');
                expect(storage.buffer).toMatch(['The surface of the sun is','15','0','0','0','0','0','0','degrees C']);
            })
        })
    });

    describe('catIF method', function() {
        var dude = 'm', lady = 'f';
        describe('booleans', function() {
            it('should pass given truth boolean ', function() {
                storage = sb.cat('Hi my name is')
                            .catIf('Tony', dude === 'm')
                            .cat(', and her name is')
                            .catIf('July', lady ==='f');
                expect(storage.buffer).toMatch(['Hi my name is', 'Tony', ', and her name is', 'July']);
            })

            it('array and functions as parameters', function() {
                storage = sb.cat('Hi my', ['name'], function(){ return 'is';})
                            .catIf(function(){ return 'Tony'}, dude === 'm')
                            .cat('and her name is')
                            .catIf(['July'], lady === 'f');
                expect(storage.buffer).toMatch(['Hi my', 'name', 'is', 'Tony','and her name is', 'July'])
            })
            it('should be false', function() {

                storage = sb.catIf('Im an alien', !dude);
                expect(storage.buffer).toMatch([]);
                expect(storage.buffer).not.toMatch(['Im an alien']);
            })
        })
    })


    describe('String method', function() {

        describe('will concatenate buffer into one string', function(){
            it('should return string, using cat()', function() {
                storage = sb.cat('Hello').cat(function(){ return 'World'}).cat(['!']).string();
                expect(typeof storage).toBe('string');
                expect(storage).toBe('Hello World !');
            })

            it('should return string, using rep()', function() {
                storage = sb.rep('hi', 5).string();
                expect(typeof storage).toBe('string');
                expect(storage).toBe('hi hi hi hi hi');
            })

            it('should return string, using catIf()', function() {
                var print = true;
                storage = sb.catIf('Print this because its true', print).string();
                expect(typeof storage).toBe('string');
                expect(storage).toBe('Print this because its true');
            })
        })
    });


});