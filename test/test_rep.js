/**
 * Created by jcastro on 7/21/2014.
 */

    //rep(arg1, arg2,..., argN, howManyTimes)
    describe('REP method', function() {
        var sb,storage;

        beforeEach(function () {
            sb = new StringBuilder();

        });
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
                it('should pass ', function () {
                    storage = sb.cat('The surface of the sun is')
                        .cat(function () {
                            return 15;
                        })
                        .rep(function () {
                            return 0;
                        }, 3)
                        .rep([0], 3)
                        .cat('degrees C');
                    expect(storage.buffer).toMatch(['The surface of the sun is', '15', '0', '0', '0', '0', '0', '0', 'degrees C']);
                })

                describe('array un numerous elements', function()
                {
                    it('should wrap numerous array elements', function () {
                        var min_string = '<',
                            max_string = '>',
                            i,
                            min = [],
                            max = [];
                        for (i = 0; i < 100; i += 1) {
                            min.push(min_string);
                            max.push(max_string);
                        }
                        var cool_name = min.concat('Insert Your Name Here').concat(max);

                        storage = sb.rep('<', 100).cat('Insert Your Name Here').rep('>', 100).string();
                        expect(storage).toBe(cool_name.join(''));
                    })

                })

    });
});