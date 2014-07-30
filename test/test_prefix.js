/**
 * Created by jcastro on 7/29/2014.
 */
describe('PREFIX method', function() {
    var sb,storage;

    beforeEach(function () {
        sb = new StringBuilder();

    });

    describe('', function() {
        var expected_array = [],
            expected = '/n';

        it('should be empty', function() {
            expect(sb.$prefix).toBeDefined();
            expect(sb.$prefix.length).toBeFalsy();
            expect(sb.$prefix.length).toBe(0);
            expect(sb.$prefix).toMatch(expected_array);
        });

        it('should add strings as parameters', function() {
            expected_array = ['/n'];
            sb.prefix('/n');
            expect(sb.$prefix).toMatch(expected);
            expect(sb.$prefix.length).toBeTruthy();
            expect(sb.$prefix.length).toBe(1);
            expect(sb.$prefix[0]).toBe(expected);
            expect(sb.$prefix).toMatch(expected_array);


            sb.prefix('<div>');
            expect(sb.$prefix.length).toBe(2);
            expect(sb.$prefix[0]).toBe(expected);
            expected = '<div>';
            expect(sb.$prefix[1]).toBe(expected);

            var expected_array = ['/n', '<div>', '<ul>'];
            sb.prefix('<ul>');
            expected = '<ul>';
            expect(sb.$prefix.length).toBe(3);
            expect(sb.$prefix).toMatch(expected_array);
            expect(sb.$prefix[2]).toBe(expected);

        });
        it('should add functions as parameters', function() {
            var item1 = function(){ return '<div><ul>';},
                item2 = function(){ return '<li>';},
                item3 = function() { return function(){ return '<a><b>';}},
                item4 = function() { var count = 0; return function() { return count += 1;}}
            expected_array = [item1, item2];
            sb
                .prefix(item1)
                .prefix(item2);
            expect(sb.$prefix).toEqual(expected_array);
            expect(sb.$prefix.length).toBeTruthy();
            expect(sb.$prefix.length).toBe(2);
            expect(sb.$prefix[0]).toBe(item1);
            expect(sb.$prefix[1]).toBe(item2);
            expect(typeof sb.$prefix[0] === 'function').toBeTruthy();
            expect(typeof sb.$prefix[1] === 'function').toBeTruthy();

            sb.prefix(item3);
            expected_array = [item1, item2, item3];
            expect(sb.$prefix).toEqual(expected_array);
            expect(sb.$prefix.length).toBeTruthy();
            expect(sb.$prefix.length).toBe(3);
            expect(sb.$prefix[2]).toBe(item3);
            expect(sb.$prefix[3]).toBeUndefined();
            expect(typeof sb.$prefix[2] === 'function').toBeTruthy();

            sb.prefix(item4);
            expected_array = [item1, item2, item3, item4];
            expect(sb.$prefix).toEqual(expected_array);
            expect(sb.$prefix.length).toBeTruthy();
            expect(sb.$prefix.length).toBe(4);
            expect(sb.$prefix[3]).toBe(item4);
            expect(sb.$prefix[4]).toBeUndefined();
            expect(typeof sb.$prefix[3] === 'function').toBeTruthy();

            expected = ['<div><ul>','<li>','<a><b>', 1];
            sb.$prefix = [];
            sb
                .prefix(item1())
                .prefix(item2())
                .prefix(item3()())
                .prefix(item4()());
            expected_array = [item1(), item2(), item3()(), item4()()];
            expect(sb.$prefix).toMatch(expected)
            expect(sb.$prefix.length).toBe(4);
            expect(sb.$prefix[4]).toBeUndefined();

            sb.$prefix = [];
            var character = '<<';
            for(var i = 0; i < 100000; i += 1) {
                sb.prefix(character);
            };
            expect(sb.$prefix.length).toBe(100000);
            expect(sb.$prefix).toMatch('<<');
            expect(sb.$prefix).not.toMatch('>>');
        });
    })
});