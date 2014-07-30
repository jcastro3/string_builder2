/**
 * Created by jcastro on 7/29/2014.
 */
describe('Cat Method', function(){
    var sb,
        storage;

    beforeEach(function () {
        sb = new StringBuilder();

    });


    describe('string as parameter', function() {


        it('should store string values in buffer', function(){

            storage = sb.cat('hello').cat('world').cat('!!!');
            expect(storage.buffer).toMatch(['hello', 'world', '!!!']);
            expect(storage.buffer.length).toBe(3);
            storage = sb.cat('im').cat('using').cat('strings as parametersssss');
            expect(storage.buffer.length).toBe(6);
            expect(storage.buffer[3]).toBe('im');
            expect(storage.buffer[6]).toBeUndefined();

        });
        it('should store multiple values in buffer', function() {
            var characters = ['#', '@', '^', '*'],
                i;

//            characters.forEach(function(c){
//                for(i = 0; i < 1000; i += 1 ) {
//                    sb.cat(c);
//                    expect(sb.buffer[i]).toBe(c);
//                }
//            });

//                while(characters.length) {
//                    var count = 0;
//                    for(i = 0; i < 1000; i += 1 ) {
//                        sb.cat(characters[count]);
//                        expect(sb.buffer[i]).toBe(characters[count]);
//                    }
//                    count += 1;
//                    characters.shift();
//                }
//            expect(sb.buffer.length).toBe(4000);



        });

        it('should be empty', function() {
            var storage = sb.cat(),
                empty = [];
            expect(storage.buffer).toMatch(empty);
            expect(storage.buffer.length).toBeFalsy();
            expect(storage.buffer[0]).toBeUndefined();

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