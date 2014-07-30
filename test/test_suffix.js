/**
 * Created by jcastro on 7/29/2014.
 */
describe('SUFFIX method', function() {
    var sb,storage;

    beforeEach(function () {
        sb = new StringBuilder();

    });
    describe('', function() {
        var expected_array = [],
            expected = '/n';

        it('should be empty', function() {
            expect(sb.$suffix).toBeDefined();
            expect(sb.$suffix.length).toBeFalsy();
            expect(sb.$suffix.length).toBe(0);
            expect(sb.$suffix).toMatch(expected_array);
        });

        it('should add strings as parameters', function() {
            expected_array = ['/n'];
            sb.suffix('/n');



            expect(sb.$suffix).toMatch(expected);
            expect(sb.$suffix.length).toBeTruthy();
            expect(sb.$suffix.length).toBe(1);
            expect(sb.$suffix).toMatch(expected_array);


            sb.suffix('</div>');
            expect(sb.$suffix.length).toBe(2);

            var expected_array = ['</ul>', '</div>' ,'/n'];
            sb.suffix('</ul>');
            expected = '</ul>';
            expect(sb.$suffix.length).toBe(3);
            expect(sb.$suffix).toMatch(expected_array);


        });
        it('should add functions as parameters', function() {
            var item1 = function() { var count = 0; return function() { return count += 2;}},
                item2 = function() { return function(){ return '</a></b>';}},
                item3 = function(){ return '</li>';},
                item4 = function(){ return '</div></ul>';}
            expected_array = [item2, item1];
            sb
                .suffix(item1)
                .suffix(item2);
            expect(sb.$suffix).toEqual(expected_array);
            expect(sb.$suffix.length).toBeTruthy();
            expect(sb.$suffix.length).toBe(2);
            expect(sb.$suffix[0]).toBe(item2);
            expect(sb.$suffix[1]).toBe(item1);
            expect(typeof sb.$suffix[0] === 'function').toBeTruthy();
            expect(typeof sb.$suffix[1] === 'function').toBeTruthy();

            sb.suffix(item3);
            expected_array = [item3, item2, item1];
            expect(sb.$suffix).toEqual(expected_array);
            expect(sb.$suffix.length).toBeTruthy();
            expect(sb.$suffix.length).toBe(3);
            expect(sb.$suffix[0]).toBe(item3);
            expect(sb.$suffix[3]).toBeUndefined();
            expect(typeof sb.$suffix[2] === 'function').toBeTruthy();

            sb.suffix(item4);
            expected_array = [item4, item3, item2, item1];
            expect(sb.$suffix).toEqual(expected_array);
            expect(sb.$suffix.length).toBeTruthy();
            expect(sb.$suffix.length).toBe(4);
            expect(sb.$suffix[0]).toBe(item4);
            expect(sb.$suffix[4]).toBeUndefined();
            expect(typeof sb.$suffix[3] === 'function').toBeTruthy();

            expected = ['</div></ul>','</li>','</a></b>', 2];
            sb.$suffix = [];
            sb
                .suffix(item1()())
                .suffix(item2()())
                .suffix(item3())
                .suffix(item4());
            expected_array = [item4(), item3(), item2(), item1()()];
            expect(sb.$suffix).toMatch(expected);
            expect(sb.$suffix.length).toBe(4);
            expect(sb.$suffix[4]).toBeUndefined();

            sb.$suffix = [];
            var character = '>>';
            for(var i = 0; i < 100000; i += 1) {
                sb.suffix(character);
            };
            expect(sb.$suffix.length).toBe(100000);
            expect(sb.$suffix).toMatch('>>');
            expect(sb.$suffix).not.toMatch('<<');
        });
    })
});