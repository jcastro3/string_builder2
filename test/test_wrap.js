/**
 * Created by jcastro on 7/29/2014.
 */
describe('WRAP method', function() {
    var sb,storage;

    beforeEach(function () {
        sb = new StringBuilder();

    });
    describe('simple strings as suffix an prefix', function () {
        it('should wrap the string then use end', function () {
            var expected = '<div>hello</div><div>world</div>!!!!!!!!!!',
                storage = sb
                    .wrap('<div>', '</div>')
                    .cat('hello')
                    .cat('world')
                    .end()
                    .rep('!', 10)
                    .string();

            expect(storage).toBe(expected);
            expect(typeof storage).toBe('string');
        });


    });
    describe('using arrays', function () {

        it('should wrap given array parameters', function () {
            var expected = '<ul>' +
                '<li><a>item</a></li>' +
                '<li><a>item</a></li>' +
                '<li><a>item</a></li>' +
                '<li><a>item</a></li>' +
                '</ul>';
            storage = sb
                .cat('<ul>')
                .wrap(['<li>', '<a>'], ['</a>', '</li>'])
                .rep('item', 4)
                .end()
                .cat('</ul>')
                .string();
            expect(typeof storage).toBe('string');
            expect(storage).toBe(expected);



            expected = '<p><b>this should be bold</b></p><div>and this should repeat 2 times</div><div>and this should repeat 2 times</div>';
            storage = sb
                .wrap(['<p>', '<b>'], ['</b>', '</p>'])
                .cat('this should be bold')
                .end()
                .wrap(['<div>'], ['</div>'])
                .rep('and this should repeat 2 times', 2)
                .end()
                .string();
            expect(storage).toBe(expected);
        })

    });

});