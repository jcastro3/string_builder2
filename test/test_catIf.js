/**
 * Created by jcastro on 7/29/2014.
 */
describe('catIF method', function() {
    var sb;

    beforeEach(function () {
        sb = new StringBuilder();

    });


    describe('booleans', function() {
        var dude = 'm', lady = 'f';
        it('should pass given truth boolean ', function() {
            storage = sb.cat('Hi my name is')
                .catIf('Tony', dude === 'm')
                .cat(', and her name is')
                .catIf('July', lady ==='f');
            expect(storage.buffer).toMatch(['Hi my name is', 'Tony', ', and her name is', 'July']);
        });

        it('array and functions as parameters', function() {
            storage = sb.cat('Hi my', ['name'], function(){ return 'is';})
                .catIf(function(){ return 'Tony'}, dude === 'm')
                .cat('and her name is')
                .catIf(['July'], lady === 'f');
            expect(storage.buffer).toMatch(['Hi my', 'name', 'is', 'Tony','and her name is', 'July'])
        });
        it('should be false', function() {

            storage = sb.catIf('Im an alien', !dude);
            expect(storage.buffer).toMatch([]);
            expect(storage.buffer).not.toMatch(['Im an alien']);
        })
    })
});