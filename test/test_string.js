/**
 * Created by jcastro on 7/29/2014.
 */
describe('String method', function() {
    var sb;

    beforeEach(function () {
        sb = new StringBuilder();

    });
    describe('will concatenate buffer into one string', function(){
        it('should return string, using cat()', function() {
            storage = sb.cat('Hello ').cat(function(){ return 'World'}).cat(['!']).string();
            expect(typeof storage).toBe('string');
            expect(storage).toBe('Hello World!');
        });

        it('should return string, using rep()', function() {
            storage = sb.rep('hi ', 5).string();
            expect(typeof storage).toBe('string');
            expect(storage).toBe('hi hi hi hi hi ');
        });

        it('should return string, using catIf()', function() {
            var print = true;
            storage = sb.catIf('Print this because its true', print).string();
            expect(typeof storage).toBe('string');
            expect(storage).toBe('Print this because its true');
        });

        it('should return string from a chain function that includes multiple parameters', function(){
            var years = 9300,
                expected = 'The risk of being struck by a falling meteorite is once every 9300 years!!!!!';
            storage = sb.cat(function() { return 'The risk of '}, 'being ', ['struck ', 'by '])
                .cat('a falling meteorite ',['is '])
                .catIf('once every 9300 ', years === 9300)
                .catIf('once every 2 ', years === 2)
                .cat(function(){ return 'years'})
                .rep('!', 5)
                .string();
            expect(typeof storage).toBe('string');
            expect(storage).toBe(expected)
        });
    })
});